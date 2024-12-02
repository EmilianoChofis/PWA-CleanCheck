import ButtonCustom from "@/app/_components/button_custom";
import TextInput from "@/app/_components/text_input";
import { DetailedReportProps } from "@/app/types/DetailedReportProps";
import { ReportProblemOutlined, AttachFileOutlined } from "@mui/icons-material";
import React, { useState } from "react";

const DetailedReportModal = ({
  isOpen,
  onClose,
  onSubmitReport,
  roomNumber,
}: DetailedReportProps) => {
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = () => {
    onSubmitReport(description, files);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
        <h2 className="text-xl text-primary font-[family-name:var(--font-jost-bold)] mb-4">
          Reportar incidencia
        </h2>
        <p className="text-gray-600 mb-2">
          Describe y adjunta fotos de evidencia que ayuden a detallar el
          problema de la habitación{" "}
          <span className="font-[family-name:var(--font-jost-medium)]">
            {roomNumber}
          </span>
          .
        </p>

        <TextInput
          label="Descripción del problema"
          iconLeft={<ReportProblemOutlined />}
          placeholder="Proporciona información detallada, incluyendo cualquier daño o situación que deba atenderse."
          type="area"
          onChange={(e) => setDescription(e.target.value)}
        />

        <TextInput
          label="Adjunta evidencias"
          iconLeft={<AttachFileOutlined />}
          placeholder="Selecciona una o varias imágenes"
          type="file"
          onChange={handleFileChange}
        />

        <div className="flex flex-wrap gap-2 mt-4">
          {files.map((file, index) => (
            <div
              key={index}
              className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center overflow-hidden"
            >
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${index + 1}`}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-4 mt-6">
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
            onClick={handleSubmit}
          >
            Generar reporte
          </ButtonCustom>
          {/* <button
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 rounded-md bg-primary text-white"
            onClick={handleSubmit}
          >
            Generar reporte
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default DetailedReportModal;
