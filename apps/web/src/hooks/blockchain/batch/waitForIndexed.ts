/**
 * waitForIndexed - Polling utilities for GraphQL indexation
 *
 * Ces fonctions permettent d'attendre que les données soient indexées
 * dans le graph après une transaction blockchain.
 *
 * IMPORTANT: L'indexation peut prendre quelques secondes après la confirmation
 * de la transaction. Ces fonctions font du polling avec retry jusqu'à ce que
 * les données soient disponibles.
 *
 * @see Documentation: Claude/00_GESTION_PROJET/Projet_02_SDK_V2/Phase_18_Positions_UX/15.9_REFACTORISATION_useBatchVote.md
 */

import type { ApolloClient } from '@apollo/client';
import type { Hex } from 'viem';
import { GET_TRIPLE_BY_ATOMS } from '../../../lib/graphql/queries';

/**
 * Configuration du polling
 */
export interface PollingConfig {
  /** Intervalle entre les tentatives en ms (défaut: 2000) */
  interval?: number;
  /** Nombre maximum de tentatives (défaut: 15) */
  maxAttempts?: number;
  /** Callback appelé à chaque tentative */
  onAttempt?: (attempt: number, maxAttempts: number) => void;
}

/**
 * Résultat de la recherche de triple
 */
export interface TripleIndexedResult {
  /** Triple termId (FOR side) */
  termId: Hex;
  /** Counter triple termId (AGAINST side) */
  counterTermId: Hex;
  /** Subject label */
  subjectLabel: string;
  /** Predicate label */
  predicateLabel: string;
  /** Object label */
  objectLabel: string;
}

/**
 * Attend qu'un triple soit indexé dans le graph
 *
 * @param apolloClient - Client Apollo pour les requêtes GraphQL
 * @param subjectId - ID de l'atom sujet
 * @param predicateId - ID de l'atom prédicat
 * @param objectId - ID de l'atom objet
 * @param config - Configuration du polling
 * @returns Les informations du triple une fois indexé
 * @throws Error si le triple n'est pas trouvé après maxAttempts
 *
 * @example
 * ```typescript
 * const result = await waitForTripleIndexed(
 *   apolloClient,
 *   founderId,
 *   predicateId,
 *   totemId,
 *   {
 *     interval: 2000,
 *     maxAttempts: 15,
 *     onAttempt: (attempt, max) => console.log(`Tentative ${attempt}/${max}...`)
 *   }
 * );
 * console.log('termId:', result.termId);
 * console.log('counterTermId:', result.counterTermId);
 * ```
 */
export async function waitForTripleIndexed(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apolloClient: ApolloClient<any>,
  subjectId: Hex,
  predicateId: Hex,
  objectId: Hex,
  config: PollingConfig = {}
): Promise<TripleIndexedResult> {
  const { interval = 2000, maxAttempts = 15, onAttempt } = config;

  console.log('[waitForTripleIndexed] Starting polling for triple:', {
    subjectId,
    predicateId,
    objectId,
  });

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    onAttempt?.(attempt, maxAttempts);
    console.log(`[waitForTripleIndexed] Attempt ${attempt}/${maxAttempts}...`);

    try {
      const { data } = await apolloClient.query<{
        triples: Array<{
          term_id: string;
          subject: { label: string };
          predicate: { label: string };
          object: { label: string };
          counter_term?: { id: string };
        }>;
      }>({
        query: GET_TRIPLE_BY_ATOMS,
        variables: { subjectId, predicateId, objectId },
        fetchPolicy: 'network-only', // Important: bypass cache
      });

      if (data?.triples && data.triples.length > 0) {
        const triple = data.triples[0];

        // Vérifier qu'on a bien le counterTermId
        if (triple.counter_term?.id) {
          const result: TripleIndexedResult = {
            termId: triple.term_id as Hex,
            counterTermId: triple.counter_term.id as Hex,
            subjectLabel: triple.subject.label,
            predicateLabel: triple.predicate.label,
            objectLabel: triple.object.label,
          };

          console.log('[waitForTripleIndexed] Triple found!', result);
          return result;
        } else {
          console.log('[waitForTripleIndexed] Triple found but counterTermId not yet available');
        }
      }
    } catch (error) {
      console.warn(`[waitForTripleIndexed] Query error on attempt ${attempt}:`, error);
    }

    // Attendre avant la prochaine tentative
    if (attempt < maxAttempts) {
      await sleep(interval);
    }
  }

  throw new Error(
    `Triple not found after ${maxAttempts} attempts. ` +
      `Subject: ${subjectId}, Predicate: ${predicateId}, Object: ${objectId}`
  );
}

/**
 * Attend qu'un atom soit indexé dans le graph
 *
 * @param apolloClient - Client Apollo
 * @param label - Label de l'atom à chercher
 * @param config - Configuration du polling
 * @returns L'ID de l'atom une fois indexé
 */
export async function waitForAtomIndexed(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apolloClient: ApolloClient<any>,
  label: string,
  config: PollingConfig = {}
): Promise<Hex> {
  const { interval = 2000, maxAttempts = 10, onAttempt } = config;

  console.log('[waitForAtomIndexed] Starting polling for atom:', label);

  // Import dynamique pour éviter les dépendances circulaires
  const { GET_ATOMS_BY_LABELS } = await import('../../../lib/graphql/queries');

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    onAttempt?.(attempt, maxAttempts);
    console.log(`[waitForAtomIndexed] Attempt ${attempt}/${maxAttempts}...`);

    try {
      const { data } = await apolloClient.query<{
        atoms: Array<{ term_id: string; label: string }>;
      }>({
        query: GET_ATOMS_BY_LABELS,
        variables: { labels: [label] },
        fetchPolicy: 'network-only',
      });

      if (data?.atoms && data.atoms.length > 0) {
        const atomId = data.atoms[0].term_id as Hex;
        console.log('[waitForAtomIndexed] Atom found!', { label, atomId });
        return atomId;
      }
    } catch (error) {
      console.warn(`[waitForAtomIndexed] Query error on attempt ${attempt}:`, error);
    }

    if (attempt < maxAttempts) {
      await sleep(interval);
    }
  }

  throw new Error(`Atom "${label}" not found after ${maxAttempts} attempts`);
}

/**
 * Attend plusieurs triples en parallèle
 *
 * @param apolloClient - Client Apollo
 * @param triples - Liste des triples à attendre
 * @param config - Configuration du polling
 * @returns Map des résultats par objectId
 */
export async function waitForMultipleTriplesIndexed(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apolloClient: ApolloClient<any>,
  triples: Array<{
    subjectId: Hex;
    predicateId: Hex;
    objectId: Hex;
  }>,
  config: PollingConfig = {}
): Promise<Map<Hex, TripleIndexedResult>> {
  console.log('[waitForMultipleTriplesIndexed] Waiting for', triples.length, 'triples...');

  const results = new Map<Hex, TripleIndexedResult>();

  // Attendre tous les triples en parallèle
  const promises = triples.map(async (triple) => {
    try {
      const result = await waitForTripleIndexed(
        apolloClient,
        triple.subjectId,
        triple.predicateId,
        triple.objectId,
        config
      );
      return { objectId: triple.objectId, result };
    } catch (error) {
      console.error('[waitForMultipleTriplesIndexed] Failed for triple:', triple, error);
      return { objectId: triple.objectId, result: null };
    }
  });

  const settled = await Promise.all(promises);

  for (const { objectId, result } of settled) {
    if (result) {
      results.set(objectId, result);
    }
  }

  console.log('[waitForMultipleTriplesIndexed] Found', results.size, '/', triples.length, 'triples');

  return results;
}

/**
 * Helper: sleep for a given duration
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
