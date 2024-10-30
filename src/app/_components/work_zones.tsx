import Title from "./title";
import WorkZoneCard from "./work_zone_card";

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
];

const WorkZones = () => {
  return (
    <div>
      <Title title="Zonas de trabajo" />
      <main className="flex gap-4 overflow-x-auto pt-4 pb-4">
        {work_zones.map((work_zone) => (
          <WorkZoneCard key={work_zone.id} {...work_zone} />
        ))}
      </main>
    </div>
  );
};

export default WorkZones;
