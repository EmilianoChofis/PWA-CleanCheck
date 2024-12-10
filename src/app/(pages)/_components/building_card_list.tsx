import { Building } from "@/app/types/Building";
import { ApartmentOutlined } from "@mui/icons-material";
import { BuildingDashboard } from "@/app/types/BuildingDashboard";
import Title from "@/app/_components/title";

const BuildingCardList = ({ buildings, onClick }: { buildings: BuildingDashboard[]; onClick: (building: Building) => void }) => {
    return (
        <div className="space-y-4">
            <Title className="text-2xl text-primary mb-4" title="Lista de edificios" />
            {buildings.map((buildingDash: BuildingDashboard) => (
                <div
                    key={buildingDash.building.id}
                    className="bg-gray-100 rounded-lg p-4 shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-200 ease-in-out"
                    onClick={() => onClick(buildingDash.building)}
                >
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary rounded-full text-center">
                        <ApartmentOutlined className="text-background" />
                        </div>
                        <div>
                            <p className="text-lg font-medium">{buildingDash.building.name}</p>
                            <p className="text-gray-600 text-sm">{buildingDash.totalRooms} habitaciones</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BuildingCardList;