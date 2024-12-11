"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Title from "@/app/_components/title";
import Breadcrumb from "@/app/(pages)/_components/breadcrumb";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import { ReportProblemOutlined } from "@mui/icons-material";
import Image from "next/image";
import { useIncidenceContext } from "@/app/context/IncidencesContext";
import ButtonCustom from "@/app/_components/button_custom";
import AcceptReportModal from "./_components/accept_report_modal";
import FinishReportModal from "./_components/finish_report_modal";
import {
  changeStatusFinished,
  changeStatusInProcess,
} from "@/app/utils/incidence-service";
import { Toast } from "@/app/lib/toast";

export default function IncidencesDetails() {
  const router = useRouter();
  const { selectedIncidence } = useIncidenceContext();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isFinishModalOpen, setFinishModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-MX", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  useEffect(() => {
    if (!selectedIncidence) {
      router.push("/manager/incidences");
    }
  }, [selectedIncidence, router]);

  if (!selectedIncidence) {
    return null;
  }

  const handleOpenAcceptModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleOpenFinishModal = () => {
    setFinishModalOpen(!isFinishModalOpen);
  };

  const handleChangeStatusInProcess = async () => {
    try {
      setIsLoading(true);
      const response = await changeStatusInProcess(selectedIncidence.id);
      if (response.statusCode === 200) {
        setIsLoading(false);
        Toast.fire({
          icon: "success",
          title: "Incidencia aceptada correctamente",
        });
        router.push("/manager/incidences");
      }
    } catch (error) {
      setIsLoading(false);
      Toast.fire({
        icon: "error",
        title: "Ocurrió un error al aceptar la incidencia: " + error,
      });
    }
  };

  const handleChangeStatusFinished = async () => {
    try {
      setIsLoading(true);
      const response = await changeStatusFinished(selectedIncidence.id);
      if (response.statusCode === 200) {
        setIsLoading(false);
        Toast.fire({
          icon: "success",
          title: "Incidencia finalizada correctamente",
        });
        router.push("/manager/incidences");
      }
    } catch (error) {
      setIsLoading(false);
      Toast.fire({
        icon: "error",
        title: "Ocurrió un error al finalizar la incidencia: " + error,
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 lg:p-8 pb-20 w-full font-[family-name:var(--font-jost-regular)]">
      <div className="lg:col-span-2">
        <Breadcrumb
          items={[
            { label: "Incidencias", link: "/maid/incidences" },
            { label: `${selectedIncidence.room.floor.building.name}` },
            { label: `${selectedIncidence.room.floor.name}`, disabled: true },
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
                <span className="mr-2">
                  <ReportProblemOutlined className="text-primary" />
                </span>
                {selectedIncidence.description}
              </p>
            </div>
          </section>
          <section>
            <h2 className="text-lg text-primary mb-4 font-[family-name:var(--font-jost-medium)]">
              Evidencias adjuntadas
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {selectedIncidence.images.map((image, index) => (
                <Image
                  key={index}
                  src={image.url}
                  alt={`Evidencia ${index + 1}`}
                  width={220}
                  height={160}
                  className="rounded-md w-full object-cover"
                />
              ))}
            </div>
          </section>
        </main>
      </div>
      <div className="lg:col-span-1">
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
                Habitación {selectedIncidence.room.name}
              </p>
              <p className="text-sm text-gray-600 font-[family-name:var(--font-jost-medium)]">
                {selectedIncidence.status} |{" "}
                {selectedIncidence.room.floor.building.name}
              </p>
              <p className="text-sm text-gray-600">
                Fecha de reporte: {formatDate(selectedIncidence.createdAt)}
              </p>
              <p className="text-sm text-gray-600">
                Personal: {selectedIncidence.user.name}
              </p>
            </div>
          </div>
        </section>
        {selectedIncidence.status === "PENDING" ? (
          <section className="p-4 rounded-md">
            <ButtonCustom
              className="w-full mb-3"
              colorText="background"
              variant="filled"
              onClick={handleOpenAcceptModal}
              backgroundColor="success"
            >
              Aceptar reporte
            </ButtonCustom>
            <ButtonCustom
              className="w-full mb-3"
              variant="outlined"
              colorText="primary"
              borderColor="primary"
            >
              Rechazar reporte
            </ButtonCustom>
          </section>
        ) : selectedIncidence.status === "IN_PROGRESS" ? (
          <section className="p-4 rounded-md">
            <ButtonCustom
              className="w-full mb-3"
              variant="filled"
              colorText="background"
              backgroundColor="primary"
              onClick={handleOpenFinishModal}
            >
              Finalizar reporte
            </ButtonCustom>
          </section>
        ) : (
          <section className="p-4 rounded-md">
            <p className="text-primary">
              La incidencia ha sido
              <span className="font-[family-name:var(--font-jost-bold)]">
                {" "}
                finalizada{" "}
              </span>
              y la habitación está disponible para rentarse nuevamente.
            </p>
          </section>
        )}
      </div>
      <AcceptReportModal
        isOpen={isModalOpen}
        onClose={handleOpenAcceptModal}
        onAccept={() => handleChangeStatusInProcess()}
        room={selectedIncidence.room.name}
        building={selectedIncidence.room.floor.building.name}
        isLoading={isLoading}
      />
      <FinishReportModal
        isOpen={isFinishModalOpen}
        onClose={handleOpenFinishModal}
        onAccept={() => handleChangeStatusFinished()}
        room={selectedIncidence.room.name}
        building={selectedIncidence.room.floor.building.name}
        isLoading={isLoading}
      />
    </div>
  );
}
