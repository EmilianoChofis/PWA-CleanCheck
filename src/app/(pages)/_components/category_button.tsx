import { CategoryButtonProps } from "@/app/types/CategoryButtonProps";
import { CheckOutlined } from "@mui/icons-material";
import styles from "@/app/styles/components/category_button.module.css";

const CategoryButton = ({
  categories,
  onCategoryClick,
}: CategoryButtonProps) => {
  return (
    <div className={styles.categoryButtons}>
      {categories.map((category) => (
        <button
          key={category.label}
          className={`${styles.categoryButton} ${
            category.active ? styles.active : ""
          }`}
          onClick={() => onCategoryClick(category.value)}
        >
          {category.label}
          {category.active && (
            <span className="icon px-2 text-xxs">
              <CheckOutlined className="text-primary" />
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default CategoryButton;
