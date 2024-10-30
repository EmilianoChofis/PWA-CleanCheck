type WorkZone = {
  zone: string;
  location: string;
};

const WorkZoneCard = ({ zone, location }: WorkZone) => {
  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-4 min-w-[200px] flex flex-row items-center font-[family-name:var(--font-jost-regular)]">
      <span className="text-4xl">🏢</span>
      <div className="flex flex-col pl-4">
        <h2 className="text-lg text-primary font-[family-name:var(--font-jost-medium)]">{zone}</h2>
        <p className="text-sm text-primary">{location}</p>
      </div>
    </div>
  );
};

export default WorkZoneCard;
