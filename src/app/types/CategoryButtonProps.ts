export type CategoryButtonProps = {
  categories: Array<{
    label: string;
    active: boolean;
  }>;
  onCategoryClick: (label: string) => void;
};
