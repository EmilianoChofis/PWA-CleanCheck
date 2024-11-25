import Title from "@/app/_components/title";
import Breadcrumb from "../../_components/breadcrumb";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";

export default function IncidencesDetails() {
  return (
    <div className="grid grid-cols-3 gap-4 p-8 pb-20 w-full font-[family-name:var(--font-jost-regular)]">
      <div className="col-span-2">
        <Breadcrumb
          items={[
            { label: "Incidencias", link: "/incidences" },
            { label: "Rio tiber" },
            { label: "Piso 3", disabled: true },
          ]}
        />
        <main className="container-fluid">
          <Title
            className="text-2xl text-primary"
            title="Reporte de incidencia"
          />
          <section className="py-4 mb-5">
            <h2 className="text-lg text-primary mb-4 font-[family-name:var(--font-jost-medium)]">
              Descripción del problema
            </h2>
            <div className="bg-gray-100 p-4 rounded-md shadow-sm border">
              <p className="text-gray-700 flex items-center">
                <span className="mr-2">⚠️</span>
                La televisión está rota y el cristal de las ventanas se
                encuentran estrellados.
              </p>
            </div>
          </section>
          <section>
            <h2 className="text-lg text-primary mb-4 font-[family-name:var(--font-jost-medium)]">
              Evidencias adjuntadas
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-300 w-full h-[260px] flex items-center justify-center rounded-md">
                <span className="text-sm text-gray-500">200 x 260</span>
              </div>
              {/* <img
                src="/evidence.jpg"
                alt="Evidencia 1"
                className="w-full h-[260px] object-cover rounded-md"
              /> */}
            </div>
          </section>
        </main>
      </div>
      <div className="col-span-1">
        <Title className="text-primary py-2" title="Número de habitación" />
        <section className="mb-5 bg-gray-100 p-4 rounded-md shadow-sm border">
          <div className="flex items-center gap-4">
            <div className="bg-red-100 p-4 rounded-lg flex items-center justify-center">
              <button className="p-2 bg-danger rounded-full">
                <BedOutlinedIcon className="text-error" />
              </button>
            </div>
            <div>
              <p className="text-lg text-primary font-[family-name:var(--font-jost-medium)]">
                Habitación P2H8
              </p>
              <p className="text-sm text-gray-600 font-[family-name:var(--font-jost-medium)]">
                Deshabilitada | Rio Tiber
              </p>
              <p className="text-sm text-gray-600">
                Fecha de reporte: 10/10/2024
              </p>
              <p className="text-sm text-gray-600">
                Personal: Cristopher Soto Ventura
              </p>
            </div>
          </div>
        </section>
        <section className="mb-8 p-4 rounded-md">
          <p className="text-base text-gray-700">
            El gerente marcó la habitación como{" "}
            <span className="text-primary font-[family-name:var(--font-jost-medium)]">
              deshabilitada
            </span>{" "}
            hasta completar las restauraciones necesarias.
          </p>
        </section>
      </div>
    </div>
  );
}
