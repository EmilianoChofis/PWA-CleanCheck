import BuildingTable from "../_components/building_table";
import WorkZones from "../_components/work_zones";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] p-8 pb-20 gap-16 w-full font-[family-name:var(--font-jost-regular)]">
      <main className="container-fluid">
        <div className="flex flex-row justify-between items-center mb-3">
          <WorkZones />
        </div>
        <div className="flex flex-row justify-between items-center">
          <BuildingTable />
        </div>
      </main>
    </div>
  );
}
