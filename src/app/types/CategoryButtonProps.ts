export type CategoryButtonProps = {
  categories: Array<{
    label: string;
    value: any;
    active: boolean;
  }>;
  onCategoryClick: (label: string) => void;
};
