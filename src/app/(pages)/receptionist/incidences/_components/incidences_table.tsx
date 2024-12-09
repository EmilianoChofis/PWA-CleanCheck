import { Incidence } from "@/app/types/Incidence";
import { ApartmentOutlined } from "@mui/icons-material";
import styles from "@/app/styles/components/incidences_table.module.css";

const IncidencesTable = ({
  reports,
  onClick,
}: {
  reports: Incidence[];
  onClick: (report: Incidence) => void;
}) => {
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-MX", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
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
          {reports.map((incidence: Incidence, index) => (
            <tr
              key={incidence.id}
              className="border-b border-gray-200 hover:bg-gray-200 cursor-pointer transition-colors duration-200 ease-in-out"
              onClick={() => onClick(incidence)}
            >
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4 flex items-center gap-2 text-primary font-[family-name:var(--font-jost-medium)]">
                <button className="p-2 bg-primary rounded-full">
                  <ApartmentOutlined className="text-background" />
                </button>
                <div className="flex flex-col">
                  <span className="font-semibold">{incidence.room.name}</span>
                  <span className="text-sm text-gray-500">
                    {incidence.room.floor.building.name}
                  </span>
                </div>
              </td>
              <td className="py-3 px-4">{incidence.user.name}</td>
              <td className="py-3 px-4">{formatDate(incidence.createdAt)}</td>
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
