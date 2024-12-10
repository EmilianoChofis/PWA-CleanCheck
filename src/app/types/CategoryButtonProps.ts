export type CategoryButtonProps = {
  categories: Array<{
    label: string;
    value: string;
    active: boolean;
  }>;
  onCategoryClick: (label: string) => void;
};
