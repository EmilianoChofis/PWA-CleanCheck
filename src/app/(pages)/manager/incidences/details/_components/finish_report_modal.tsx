import ButtonCustom from "@/app/_components/button_custom";
import { AcceptAndFinishReportProps } from "@/app/types/AcceptAndFinishReportProps";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";

const FinishReportModal = ({
  isOpen,
  onClose,
  onAccept,
  room,
  building,
  isLoading,
}: AcceptAndFinishReportProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
        <h2 className="text-xl text-primary font-[family-name:var(--font-jost-bold)] mb-3">
          Aceptar reporte
        </h2>
        <section className="mb-5 bg-gray-100 p-4 rounded-md shadow-sm border">
          <div className="flex items-center gap-4">
            <div className="bg-red-100 p-4 rounded-lg flex items-center justify-center">
              <button className="p-2 bg-danger rounded-full">
                <BedOutlinedIcon className="text-error" />
              </button>
            </div>
            <div>
              <p className="text-lg text-primary font-[family-name:var(--font-jost-medium)]">
                Habitación {room}
              </p>
              <p className="text-sm text-gray-600 font-[family-name:var(--font-jost-medium)]">
                {building}
              </p>
            </div>
          </div>
        </section>
        <p className="text-primary mb-4 px-1">
          El reporte será finalizado y la habitación
          <span className="font-[family-name:var(--font-jost-bold)]">
            {" "}
            {room}{" "}
          </span>
          estará
          <span className="font-[family-name:var(--font-jost-bold)]">
            {" "}
            disponible
          </span>{" "}
          para rentarse nuevamente.
        </p>
        <div className="flex justify-end gap-4 px-5">
          <ButtonCustom
            colorText="complementary"
            variant="outlined"
            borderColor="disabled"
            onClick={onClose}
          >
            Cancelar
          </ButtonCustom>
          <ButtonCustom
            className="w-full"
            variant="filled"
            colorText="background"
            backgroundColor="primary"
            onClick={onAccept}
            isLoading={isLoading}
          >
            Aceptar reporte
          </ButtonCustom>
        </div>
      </div>
    </div>
  );
};

export default FinishReportModal;
