import ButtonCustom from "@/app/_components/button_custom";
import { ConfirmReportProps } from "@/app/types/ConfirmReportProps";
import React from "react";

const ConfirmReportModal = ({
  isOpen,
  onClose,
  onReport,
}: ConfirmReportProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
        <h2 className="text-xl text-primary font-[family-name:var(--font-jost-bold)] mb-4">
          Reportar incidencia
        </h2>
        <p className="text-primary mb-4">
          Puedes reportar la habitación si presenta daños o no está en
          condiciones para ser rentada nuevamente.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Los detalles de la habitación se enviarán al gerente, y estará como{" "}
          <span className="font-[family-name:var(--font-jost-bold)]">
            reportada
          </span>{" "}
          hasta que el gerente brinde una solución.
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
            onClick={onReport}
          >
            Generar reporte
          </ButtonCustom>
        </div>
      </div>
    </div>
  );
};

export default ConfirmReportModal;
