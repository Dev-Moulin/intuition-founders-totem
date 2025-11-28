import { OFC_PREFIX } from '../config/constants';
import categoriesConfig from '../../../../packages/shared/src/data/categories.json';

interface Category {
  id: string;
  label: string;
  name: string;
  termId: string | null;
}

/**
 * Get category display name from OFC: prefixed label
 */
export function getCategoryName(ofcLabel: string): string {
  const categoryId = ofcLabel.replace(OFC_PREFIX, '');
  const categories = categoriesConfig.categories as Category[];
  const category = categories.find((c) => c.id === categoryId);
  return category ? category.label : categoryId;
}
