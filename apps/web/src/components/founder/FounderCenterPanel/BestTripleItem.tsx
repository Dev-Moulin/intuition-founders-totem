/**
 * BestTripleItem - Triple item display for Best Triples section
 *
 * Extracted from FounderCenterPanel.tsx
 * Displays a triple (subject → predicate → object) with percentage of total TRUST
 *
 * @see FounderCenterPanel.tsx
 */

/** Best triple data for display */
export interface BestTripleData {
  id: string;
  tripleTermId: string;
  subjectLabel: string;
  subjectImage?: string;
  subjectEmoji?: string;
  predicateLabel: string;
  predicateImage?: string;
  predicateEmoji?: string;
  objectLabel: string;
  objectImage?: string;
  objectEmoji?: string;
}

export interface BestTripleItemProps {
  /** Triple data to display */
  triple: BestTripleData;
  /** Percentage of total TRUST */
  percentage: number;
  /** Whether this triple is selected */
  isSelected: boolean;
  /** Click handler */
  onClick: () => void;
}

export function BestTripleItem({
  triple,
  percentage,
  isSelected,
  onClick,
}: BestTripleItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-2 rounded-lg transition-all ${
        isSelected
          ? 'bg-slate-500/30 ring-1 ring-slate-500/50'
          : 'bg-white/5 hover:bg-white/10'
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        {/* Triple: Subject → Predicate → Object (Tags/Bulles style with images) */}
        <div className="flex items-center gap-1.5 min-w-0 flex-1 flex-wrap">
          {/* Subject Tag */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/10 rounded-full shrink-0">
            {triple.subjectImage ? (
              <img
                src={triple.subjectImage}
                alt={triple.subjectLabel}
                className="w-5 h-5 rounded object-cover shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              <div className="w-5 h-5 rounded bg-white/10 flex items-center justify-center shrink-0">
                <span className="text-[10px]">
                  {triple.subjectEmoji || triple.subjectLabel.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <span className="text-xs text-white/80 truncate max-w-[60px]">
              {triple.subjectLabel.split(' ')[0]}
            </span>
          </div>

          <span className="text-white/40 text-lg shrink-0">→</span>

          {/* Predicate Tag */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-500/30 rounded-full shrink-0">
            {triple.predicateImage ? (
              <img
                src={triple.predicateImage}
                alt={triple.predicateLabel}
                className="w-5 h-5 rounded object-cover shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              <div className="w-5 h-5 rounded bg-white/10 flex items-center justify-center shrink-0">
                <span className="text-[10px]">
                  {triple.predicateEmoji || triple.predicateLabel.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <span className="text-xs text-slate-300 truncate max-w-[70px]">
              {triple.predicateLabel}
            </span>
          </div>

          <span className="text-white/40 text-lg shrink-0">→</span>

          {/* Object (Totem) Tag */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/10 rounded-full min-w-0">
            {triple.objectImage ? (
              <img
                src={triple.objectImage}
                alt={triple.objectLabel}
                className="w-5 h-5 rounded object-cover shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              <div className="w-5 h-5 rounded bg-white/10 flex items-center justify-center shrink-0">
                <span className="text-[10px]">
                  {triple.objectEmoji || triple.objectLabel.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <span className="text-xs text-white font-medium truncate">
              {triple.objectLabel}
            </span>
          </div>
        </div>

        <span className="text-xs text-slate-400 shrink-0">{percentage}%</span>
      </div>
    </button>
  );
}
