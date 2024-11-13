import { Building } from "@/app/types/Building";
import Title from "@/app/_components/title";
import { ApartmentOutlined } from "@mui/icons-material";

const buildingData = [
  {
    id: 1,
    name: "Edificio Altapalmira",
    cleanRooms: 10,
    dirtyRooms: 5,
    reportedRooms: 2,
    disabledRooms: 1,
    totalRooms: 18,
  },
  {
    id: 2,
    name: "Edificio Paseos del río",
    cleanRooms: 7,
    dirtyRooms: 7,
    reportedRooms: 3,
    disabledRooms: 2,
    totalRooms: 19,
  },
  {
    id: 3,
    name: "Edificio Calle de los doctores",
    cleanRooms: 12,
    dirtyRooms: 3,
    reportedRooms: 1,
    disabledRooms: 0,
    totalRooms: 16,
  },
  {
    id: 4,
    name: "Edificio La panochera",
    cleanRooms: 15,
    dirtyRooms: 0,
    reportedRooms: 0,
    disabledRooms: 0,
    totalRooms: 15,
  },
];

const BuildingTable = () => {
  return (
    <div className="table-container">
      <Title className="text-2xl text-primary" title="Lista de edificios" />
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700 border-b border-gray-200 font-[family-name:var(--font-jost-bold)]">
            <th className="py-3 px-4">#</th>
            <th className="py-3 px-4 w-[250px] md:w-[200px] lg:w-[300px]">
              Edificio
            </th>
            <th className="py-3 px-4">Habitaciones limpias</th>
            <th className="py-3 px-4">Habitaciones sin limpiar</th>
            <th className="py-3 px-4">Habitaciones reportadas</th>
            <th className="py-3 px-4">Habitaciones deshabilitadas</th>
            <th className="py-3 px-4">Total de habitaciones</th>
          </tr>
        </thead>
        <tbody className="text-primary">
          {buildingData.map((building: Building, index) => (
            <tr key={building.id} className="border-b border-gray-200">
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4 flex items-center gap-2 text-primary font-[family-name:var(--font-jost-medium)]">
                <button className="p-2 bg-primary rounded-full">
                  <ApartmentOutlined className="text-background" />
                </button>
                {building.name}
              </td>
              <td className="py-3 px-4">{building.cleanRooms}</td>
              <td className="py-3 px-4">{building.dirtyRooms}</td>
              <td className="py-3 px-4 text-warning">
                {building.reportedRooms}
              </td>
              <td className="py-3 px-4 text-error">{building.disabledRooms}</td>
              <td className="py-3 px-4 font-[family-name:var(--font-jost-medium)]">
                {building.totalRooms}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BuildingTable;
