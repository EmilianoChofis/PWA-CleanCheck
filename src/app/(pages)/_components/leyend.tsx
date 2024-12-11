import styles from "@/app/styles/components/leyend.module.css";

const Legend = () => {
  const legendItems = [
    { label: "En uso", colorClass: styles.ocupada },
    { label: "Disponible", colorClass: styles.revisadas },
    { label: "Desocupada", colorClass: styles.desocupada },
    { label: "Reportada", colorClass: styles.enMantenimiento },
    { label: "Limpia", colorClass: styles.limpia },
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
