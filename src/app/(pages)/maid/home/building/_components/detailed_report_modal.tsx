import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { createReportSchema } from "@/app/lib/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ButtonCustom from "@/app/_components/button_custom";
import TextInput from "@/app/_components/text_input";
import { DetailedReportProps } from "@/app/types/DetailedReportProps";
import { ReportProblemOutlined, AttachFileOutlined } from "@mui/icons-material";
import Image from "next/image";
import FileInput from "@/app/_components/file_input";
import { confirmDialog } from "@/app/lib/confirmDialog";
import { createReport } from "@/app/utils/building-service";
import { Toast } from "@/app/lib/toast";

const DetailedReportModal = ({
  isOpen,
  onClose,
  onCloseConfirm,
  room,
}: DetailedReportProps) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof createReportSchema>>({
    resolver: zodResolver(createReportSchema),
    defaultValues: {
      description: "",
      files: [],
    },
  });

  const handleSubmit = (values: z.infer<typeof createReportSchema>) => {
    confirmDialog(
      "Reportar incidencia",
      "¿Estás seguro de que deseas reportar esta incidencia de la habitación: " +
        room?.name +
        "?",
      "Sí, reportar",
      "Cancelar",
      async () => {
        try {
          setIsLoading(true);
          const response = await createReport(
            values.description,
            session?.user?.id ? session.user.id : "",
            room?.id ? room.id : "",
            values.files
          );
          if (response.statusCode === 200) {
            setIsLoading(false);
            form.reset();
            onCloseConfirm && onCloseConfirm();
            onClose();
            Toast.fire({
              icon: "success",
              title: "Incidencia reportada con éxito",
            });
          }
        } catch (error) {
          setIsLoading(false);
          Toast.fire({
            icon: "error",
            title: "Error al reportar la incidencia",
          });
        }
      }
    );
  };

  const handleCloseModal = () => {
    onCloseConfirm && onCloseConfirm();
    onClose();
    form.reset();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-lg">
        <h2 className="text-xl text-primary font-[family-name:var(--font-jost-bold)] mb-4">
          Reportar incidencia
        </h2>
        <p className="text-gray-600 mb-2">
          Describe y adjunta fotos de evidencia que ayuden a detallar el
          problema de la habitación{" "}
          <span className="font-[family-name:var(--font-jost-medium)]">
            {room?.name}
          </span>
          .
        </p>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <TextInput
            label="Descripción del problema"
            iconLeft={<ReportProblemOutlined />}
            placeholder="Proporciona información detallada, incluyendo cualquier daño o situación que deba atenderse."
            type="area"
            {...form.register("description")}
            error={form.formState.errors.description?.message}
          />
          <FileInput
            label="Adjuntar fotos"
            placeholder="Selecciona las fotos..."
            icon={<AttachFileOutlined />}
            onChange={(newFiles: File[]) => {
              const currentFiles = form.getValues("files") || [];
              if (currentFiles.length + newFiles.length > 5) {
                return form.setError("files", {
                  type: "max",
                  message: "No puedes subir más de 5 archivos.",
                });
              }
              form.setValue("files", [...currentFiles, ...newFiles]);
            }}
            error={form.formState.errors.files?.message}
          />

          <div className="flex flex-wrap gap-2 mt-4">
            {form.watch("files")?.map((file, index) => (
              <div
                key={index}
                className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center overflow-hidden"
              >
                <Image
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  width={100}
                  height={100}
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
              onClick={handleCloseModal}
            >
              Cancelar
            </ButtonCustom>
            <ButtonCustom
              className="w-full"
              variant="filled"
              colorText="background"
              backgroundColor="primary"
              type="submit"
              isLoading={isLoading}
            >
              Generar reporte
            </ButtonCustom>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DetailedReportModal;
