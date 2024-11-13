import { BreadcrumbProps } from "@/app/types/BreadcrumbProps";
import Link from "next/link";

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className="breadcrumb text-primary">
      {items.map((item, index) => (
        <span key={index} className="breadcrumb-item">
          {index > 0 && " / "}
          {item.link ? (
            <Link href={item.link}>{item.label}</Link>
          ) : (
            <span className={item.disabled ? "text-disabled" : ""}>
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
