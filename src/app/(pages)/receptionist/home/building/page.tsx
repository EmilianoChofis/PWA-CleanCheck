"use client";
import { useState } from "react";
import { useBuildingContext } from "../BuildingContext";
import Title from "@/app/_components/title";
import Breadcrumb from "@/app/(pages)/_components/breadcrumb";
import CategoryButton from "@/app/(pages)/_components/category_button";
import Legend from "./_components/leyend";
import RoomFloor from "./_components/room_floor";
import RegisterEntryRoom from "./_components/register_entry_room";
import ActionModalRoom from "./_components/action_modal_room";
import { getBuildingsByStatus } from "@/app/utils/building-service";
import { Room } from "@/app/types/Room";

export default function Building() {
  const { selectedBuilding, setSelectedBuilding } = useBuildingContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([
    { label: "Todas", value: "", active: true },
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

  const handleMarkEntry = () => {
    if (roomSelected) {
      console.log(`Entrada marcada para la habitación: ${roomSelected.name}`);
      setIsModalOpen(true);
    }
  };

  const handleMarkExit = () => {
    if (roomSelected) {
      console.log(`Salida marcada para la habitación: ${roomSelected.name}`);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleContinue = () => {
    console.log(`Entrada marcada para la habitación: ${roomSelected}`);
    setIsModalOpen(false);
  };

  if (!selectedBuilding) {
    return <p>No se seleccionó ningún edificio.</p>;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen gap-4 p-8">
      <div className="flex-1 md:max-h-[calc(100vh-200px)] overflow-y-auto">
        <Breadcrumb
          items={[
            { label: "Inicio", link: "/receptionist/home" },
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
            {selectedBuilding?.floors?.length > 0 ? (
              selectedBuilding.floors.map((floor, index) => (
                <RoomFloor
                  key={index}
                  floorSelected={floor}
                  onClickRoomSelected={(room) => handleRoomSelect(room)}
                />
              ))
            ) : (
              <div className="text-center mt-5">
                <p>No hay habitaciones disponibles</p>
              </div>
            )}
          </div>
        </main>
      </div>
      <div className="md:w-64 w-full mt-4 md:mt-0">
        {roomSelected ? (
          <>
            <Title
              className="text-2xl text-primary py-2"
              title={roomSelected?.status === "OCCUPIED" ? "Marcar Salida" : "Marcar Entrada"}
            />
            <RegisterEntryRoom
              buildingName={selectedBuilding.name}
              roomNumber={roomSelected.name}
              status={roomSelected.status}
              onMarkEntry={handleMarkEntry}
              onMarkExit={handleMarkExit}
            />
          </>
        ) : (
          <div className="h-32" />
        )}
      </div>
      <ActionModalRoom
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleContinue}
        buildingName={selectedBuilding.name}
        roomNumber={roomSelected?.name || ""}
        status={roomSelected?.status || ""}
        roomId={roomSelected?.id || ""}
      />
    </div>
  );
}
