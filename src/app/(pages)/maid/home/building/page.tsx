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
import {
  changeStatusRoom,
  getBuildingsByStatus,
} from "@/app/utils/building-service";
import { Room } from "@/app/types/Room";
import { Toast } from "@/app/lib/toast";

export default function Building() {
  const { data: session } = useSession();
  const { selectedBuilding, setSelectedBuilding } = useBuildingContext();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDetailedModalOpen, setDetailedModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([
    { label: "Todas", value: null, active: true },
    { label: "Ocupadas", value: "OCCUPIED", active: false },
    { label: "Desocupadas", value: "UNOCCUPIED", active: false },
    { label: "Limpias", value: "CLEAN", active: false },
    { label: "Revisadas", value: "CHECKED", active: false },
    { label: "En mantenimiento", value: "IN_MAINTENANCE", active: false },
  ]);
  const [roomSelected, setRoomSelected] = useState<Room>();

  const handleCategoryClick = async (clickedCategory: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => ({
        ...category,
        active: category.value === clickedCategory,
      }))
    );

    if (selectedBuilding?.id) {
      const response = await getBuildingsByStatus(
        selectedBuilding.id,
        clickedCategory
      );
      setSelectedBuilding(response.data);
    } else {
      throw new Error("No se seleccionó ningún edificio.");
    }
  };

  const handleRoomSelect = (room: Room) => {
    setRoomSelected(room);
  };

  const handleMarkClean = async (room: Room) => {
    setIsLoading(true);
    const response = await changeStatusRoom(room.id, "CLEAN");

    if (response.statusCode === 200) {
      Toast.fire({
        icon: "success",
        title: "Habitación marcada como limpia",
      });
      setIsLoading(false);
    } else {
      Toast.fire({
        icon: "error",
        title: "Error al marcar la habitación como limpia",
      });
      setIsLoading(false);
    }
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
            {
              selectedBuilding.floors.length > 0 ? selectedBuilding.floors.map((floor, index) => (
                <RoomFloor
                  key={index}
                  floorSelected={floor}
                  onClickRoomSelected={(room) => handleRoomSelect(room)}
                />
              )) : (
                <div className="text-center mt-5">
                  <p>No hay habitaciones disponibles</p>
                </div>
              )
            }
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
            staff: session?.user?.name
              ? session.user.name
              : "Nombre del personal",
            date: new Date().toLocaleDateString(),
            roomNumber: roomSelected
              ? roomSelected.name
              : "Selecciona una habitación",
            roomStatus: roomSelected ? roomSelected.status : "",
            onMarkClean: () => roomSelected && handleMarkClean(roomSelected),
            onReportIssue: handleReportIssue,
            isLoading: isLoading,
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
