import styles from "@/app/styles/components/leyend.module.css";

const Legend = () => {
  const legendItems = [
    { label: "Limpia", colorClass: styles.limpia },
    { label: "Sin limpiar", colorClass: styles.sinLimpiar },
    { label: "Reportada", colorClass: styles.reportada },
    { label: "Deshabilitada", colorClass: styles.deshabilitada },
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
