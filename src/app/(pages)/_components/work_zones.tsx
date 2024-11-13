import Title from "@/app/_components/title";
import WorkZoneCard from "./work_zone_card";
import styles from "@/app/styles/components/work_zones.module.css";

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
      <Title className="text-2xl text-primary" title="Zonas de trabajo" />
      <div className={styles.container}>
        {work_zones.map((work_zone, index) => (
          <WorkZoneCard key={index} {...work_zone} />
        ))}
      </div>
    </div>
  );
};

export default WorkZones;
