"use client";
import Title from "@/app/_components/title";
import Legend from "./_components/leyend";
import { RoomSelectedProps } from "@/app/types/RoomSelectedProps";
import RoomFloor from "./_components/room_floor";
import RegisterEntryRoom from "./_components/register_entry_room";
import ActionModalRoom from "./_components/action_modal_room";
import { useState } from "react";
import CategoryButton from "@/app/(pages)/_components/category_button";
import Breadcrumb from "@/app/(pages)/_components/breadcrumb";

const roomsData: RoomSelectedProps[] = [
  {
    floorNumber: 1,
    rooms: [
      { number: "P1H1", status: "sinLimpiar" },
      { number: "P1H2", status: "limpia" },
      { number: "P1H3", status: "reportada" },
      { number: "P1H4", status: "deshabilitada" },
    ],
    onRoomSelect: (roomNumber: string) => console.log(`Habitación seleccionada en piso 1: ${roomNumber}`),
  },
  {
    floorNumber: 2,
    rooms: [
      { number: "P2H1", status: "reportada" },
      { number: "P2H2", status: "sinLimpiar" },
      { number: "P2H3", status: "limpia" },
    ],
    onRoomSelect: (roomNumber: string) => console.log(`Habitación seleccionada en piso 2: ${roomNumber}`),
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
    onRoomSelect: (roomNumber: string) => console.log(`Habitación seleccionada en piso 3: ${roomNumber}`),
  },
];

export default function Building() {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCategoryClick = (category: string) => {
    console.log(`Clicked on ${category || "all"}`);
  };

  const handleRoomSelect = (roomNumber: string) => {
    if (selectedRoom !== roomNumber) {
      setSelectedRoom(roomNumber);
      console.log(`Habitación seleccionada: ${roomNumber}`);
    } else {
      setSelectedRoom(null);
      console.log(`Habitación deseleccionada: ${roomNumber}`);
    }
  };

  const handleMarkEntry = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleContinue = () => {
    console.log(`Entrada marcada para la habitación: ${selectedRoom}`);
    setIsModalOpen(false);
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-8 pb-20 w-full font-[family-name:var(--font-jost-regular)]">
      <div className="col-span-2 overflow-y-auto max-h-[calc(100vh-200px)]">
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
            {roomsData.map((floor) => (
              <RoomFloor
                key={floor.floorNumber}
                floorNumber={floor.floorNumber}
                rooms={floor.rooms}
                onRoomSelect={handleRoomSelect}
                selectedRoom={selectedRoom}
              />
            ))}
          </div>
        </main>
      </div>
      <div className="col-span-1">
        {selectedRoom ? (
          <>
            <Title
              className="text-2xl text-primary py-2"
              title="Marcar Entrada"
            />
            <RegisterEntryRoom
              buildingName="Edificio Altapalmira"
              roomNumber={selectedRoom}
              status="Disponible"
              onMarkEntry={handleMarkEntry}
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
        buildingName="Edificio Altapalmira"
        roomNumber={selectedRoom ?? "N/A"}
      />
    </div>
  );
}