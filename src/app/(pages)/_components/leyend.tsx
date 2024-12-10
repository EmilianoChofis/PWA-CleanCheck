import styles from "@/app/styles/components/leyend.module.css";

const Legend = () => {
  const legendItems = [
    { label: "Ocupada", colorClass: styles.ocupada },
    { label: "Desocupada", colorClass: styles.desocupada },
    { label: "Limpia", colorClass: styles.limpia },
    { label: "Revisadas", colorClass: styles.revisadas },
    { label: "En mantenimiento", colorClass: styles.enMantenimiento },
  ];

  return (
    <div className={styles.legends}>
      {legendItems.map((item) => (
        <div key={item.label} className={styles.legendItem}>
          <span
            className={`${styles.colorIndicator} ${item.colorClass}`}
          ></span>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Legend;
