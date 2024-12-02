"use client";
import { useState } from "react";
import { useBuildingContext } from "../BuildingContext";
import Title from "@/app/_components/title";
import Breadcrumb from "@/app/(pages)/_components/breadcrumb";
import CategoryButton from "@/app/(pages)/_components/category_button";
import Legend from "./_components/leyend";
import RoomFloor from "./_components/room_floor";
import RegisterCleaningRoom from "./_components/register_cleaning_room";
import ConfirmReportModal from "./_components/confirm_report_modal";
import DetailedReportModal from "./_components/detailed_report_modal";
import { useSession } from "next-auth/react";
import { changeStatusRoom } from "@/app/utils/building-service";

export default function Building() {
  const { data: session } = useSession();
  const { selectedBuilding } = useBuildingContext();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDetailedModalOpen, setDetailedModalOpen] = useState(false);
  const [categories, setCategories] = useState([
    { label: "Todas", active: true },
    { label: "Sin limpiar", active: false },
    { label: "Limpias", active: false },
    { label: "Reportadas", active: false },
    { label: "Deshabilitadas", active: false },
  ]);
  const [roomSelected, setRoomSelected] = useState<any | null>(null);

  const handleCategoryClick = (clickedCategory: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => ({
        ...category,
        active: category.label === clickedCategory,
      }))
    );
  };

  const handleRoomSelect = (room: any) => {
    setRoomSelected(room);
  };

  const handleMarkClean = async (room: any) => {
    const response = await changeStatusRoom(room.id, "CLEAN");
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

  if (!selectedBuilding) {
    return <p>No se seleccionó ningún edificio.</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-4 p-8 pb-20 w-full font-[family-name:var(--font-jost-regular)]">
      <div className="col-span-2">
        <Breadcrumb
          items={[
            { label: "Inicio", link: "/maid/home" },
            { label: selectedBuilding.name },
            { label: "Habitaciones", disabled: true },
          ]}
        />
        <main className="container-fluid">
          <Title className="text-2xl text-primary" title="Habitaciones" />
          <div className="px-2 py-2">
            <CategoryButton
              categories={categories}
              onCategoryClick={(category) => handleCategoryClick(category)}
            />
          </div>
          <Legend />
          <div className="px-2 py-2">
            {selectedBuilding.floors.map((floor, index) => (
              <RoomFloor
                key={index}
                floorSelected={floor}
                onClickRoomSelected={(room) => handleRoomSelect(room)}
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
          data={{
            buildingName: selectedBuilding.name,
            staff: session?.user?.name,
            date: new Date().toLocaleDateString(),
            roomNumber: roomSelected ? roomSelected.name : "Selecciona una habitación",
            onMarkClean: () => handleMarkClean(roomSelected),
            onReportIssue: handleReportIssue,
          }}
          isRoomSelected={!!roomSelected}
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
