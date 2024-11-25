import BuildingTable from "../_components/building_table";
import Shortcuts from "../_components/shortcuts";

export default function RecepcionistHome() {
    return (
        <div className="grid grid-rows-[auto_1fr_auto] p-8 pb-20 gap-16 w-full">
            <main className="w-full">
                <div className="w-full mb-8">
                    <Shortcuts />
                </div>
                <div className="w-full">
                    <BuildingTable />
                </div>
            </main>
        </div>
    );
}
