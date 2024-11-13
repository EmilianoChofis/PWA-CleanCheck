"use client";
import Title from "@/app/_components/title";
import Breadcrumb from "../../_components/breadcrumb";
import CategoryButton from "../../_components/category_button";
import Legend from "./_components/leyend";
import { RoomFloorProps } from "@/app/types/RoomFloorProps";
import RoomFloor from "./_components/room_floor";
import RegisterCleaningRoom from "./_components/register_cleaning_room";
import { useState } from "react";
import ConfirmReportModal from "./_components/confirm_report_modal";
import DetailedReportModal from "./_components/detailed_report_modal";

const roomsData: RoomFloorProps[] = [
  {
    floorNumber: 1,
    rooms: [
      { number: "P1H1", status: "sinLimpiar" },
      { number: "P1H2", status: "limpia" },
      { number: "P1H3", status: "reportada" },
      { number: "P1H4", status: "deshabilitada" },
    ],
  },
  {
    floorNumber: 2,
    rooms: [
      { number: "P2H1", status: "reportada" },
      { number: "P2H2", status: "sinLimpiar" },
      { number: "P2H3", status: "limpia" },
    ],
  },
  {
    floorNumber: 3,
    rooms: [
      { number: "P3H1", status: "limpia" },
      { number: "P3H2", status: "deshabilitada" },
      { number: "P3H3", status: "reportada" },
      { number: "P3H4", status: "sinLimpiar" },
      { number: "P3H5", status: "limpia" },
      { number: "P3H6", status: "sinLimpiar" },
      { number: "P3H7", status: "reportada" },
      { number: "P3H8", status: "deshabilitada" },
      { number: "P3H9", status: "limpia" },
      { number: "P3H10", status: "sinLimpiar" },
      { number: "P3H11", status: "limpia" },
      { number: "P3H12", status: "reportada" },
      { number: "P3H13", status: "deshabilitada" },
    ],
  },
];

export default function Building() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDetailedModalOpen, setDetailedModalOpen] = useState(false);

  const handleCategoryClick = (category: string) => {
    console.log(`Clicked on ${category || "all"}`);
  };

  const handleMarkClean = () => {
    console.log("Marcar como limpia");
  };

  const handleReportIssue = () => {
    console.log("Reportar problema");
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleGenerateReport = () => {
    console.log("Generar reporte");
    setDetailedModalOpen(true);
  };

  const handleCloseDetailedModal = () => {
    setDetailedModalOpen(false);
  };

  const handleSubmitReport = (description: string, files: File[]) => {
    console.log("Descripción:", description);
    console.log("Archivos:", files);
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-8 pb-20 w-full font-[family-name:var(--font-jost-regular)]">
      <div className="col-span-2">
        <Breadcrumb
          items={[
            { label: "Inicio", link: "/home" },
            { label: "Edificio" },
            { label: "Habitaciones", disabled: true },
          ]}
        />
        <main className="container-fluid">
          <Title className="text-2xl text-primary" title="Habitaciones" />
          <div className="px-2 py-2">
            <CategoryButton
              categories={[
                { label: "Todas", active: true },
                { label: "Sin limpiar", active: false },
                { label: "Limpias", active: false },
                { label: "Reportadas", active: false },
                { label: "Deshabilitadas", active: false },
              ]}
              onCategoryClick={(category) => handleCategoryClick(category)}
            />
          </div>
          <Legend />
          <div className="px-2 py-2">
            {roomsData.map((floor, index) => (
              <RoomFloor
                key={index}
                floorNumber={floor.floorNumber}
                rooms={floor.rooms}
              />
            ))}
          </div>
        </main>
      </div>
      <div className="col-span-1">
        <Title
          className="text-2xl text-primary py-2"
          title="Registrar limpieza"
        />
        <RegisterCleaningRoom
          buildingName="Edificio Altapalmira"
          staff="Cristopher Soto Ventura"
          date="10/10/2024"
          roomNumber="P1H8"
          onMarkClean={handleMarkClean}
          onReportIssue={handleReportIssue}
        />
      </div>
      <ConfirmReportModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onReport={handleGenerateReport}
      />
      <DetailedReportModal
        isOpen={isDetailedModalOpen}
        onClose={handleCloseDetailedModal}
        onSubmitReport={handleSubmitReport}
        roomNumber={"P1H8"}
      />
    </div>
  );
}
