import Title from "./title";
import WorkZoneCard from "./work_zone_card";
import styles from "../styles/components/work_zones.module.css";

const work_zones = [
  {
    id: 1,
    zone: "Zona 1",
    location: "Descripción de la zona 1",
  },
  {
    id: 2,
    zone: "Zona 2",
    location: "Descripción de la zona 2",
  },
  {
    id: 3,
    zone: "Zona 3",
    location: "Descripción de la zona 3",
  },
  {
    id: 4,
    zone: "Zona 1",
    location: "Descripción de la zona 1",
  },
];

const WorkZones = () => {
  return (
    <div>
      <Title title="Zonas de trabajo" />
      <div className={styles.container}>
        {work_zones.map((work_zone) => (
          <WorkZoneCard key={work_zone.id} {...work_zone} />
        ))}
      </div>
    </div>
  );
};

export default WorkZones;
