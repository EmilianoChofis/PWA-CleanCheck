import { Incidences } from "@/app/types/Incidences";
import { ApartmentOutlined } from "@mui/icons-material";
import styles from "@/app/styles/components/incidences_table.module.css";

const incidencesData = [
  {
    id: 1,
    room: "101",
    reportedBy: "Juan Pérez",
    raportedAt: "2022-01-01",
    status: "Reportada",
  },
  {
    id: 2,
    room: "102",
    reportedBy: "Pedro Pérez",
    raportedAt: "2022-01-02",
    status: "Deshabilitada",
  },
  {
    id: 3,
    room: "103",
    reportedBy: "María Pérez",
    raportedAt: "2022-01-03",
    status: "Reportada",
  },
  {
    id: 4,
    room: "104",
    reportedBy: "José Pérez",
    raportedAt: "2022-01-04",
    status: "Disponible",
  },
];

const IncidencesTable = () => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case "Disponible":
        return styles.statusDisponible;
      case "Reportada":
        return styles.statusReportada;
      case "Deshabilitada":
        return styles.statusDeshabilitada;
      default:
        return "";
    }
  };

  return (
    <div className="table-container">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left text-sm border-b border-gray-200 font-[family-name:var(--font-jost-bold)]">
            <th className="py-3 px-4">#</th>
            <th className="py-3 px-4 w-[250px] md:w-[200px] lg:w-[300px]">
              Habitación
            </th>
            <th className="py-3 px-4 w-[250px] md:w-[200px] lg:w-[800px]">
              Reportado por
            </th>
            <th className="py-3 px-4">Fecha de reporte</th>
            <th className="py-3 px-4">Estado</th>
          </tr>
        </thead>
        <tbody className="text-primary">
          {incidencesData.map((incidence: Incidences, index) => (
            <tr key={incidence.id} className="border-b border-gray-200">
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4 flex items-center gap-2 text-primary font-[family-name:var(--font-jost-medium)]">
                <button className="p-2 bg-primary rounded-full">
                  <ApartmentOutlined className="text-background" />
                </button>
                {incidence.room}
              </td>
              <td className="py-3 px-4">{incidence.reportedBy}</td>
              <td className="py-3 px-4">{incidence.raportedAt}</td>
              <td className="py-3 px-4">
                <div className={`py-3 ${getStatusClass(incidence.status)}`}>
                  {incidence.status}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncidencesTable;
