import { RoomProps } from "./RoomProps";

export type RoomSelectedProps = {
    floorNumber: number;
    rooms: RoomProps[];
    onRoomSelect: (roomNumber: string) => void;
    selectedRoom?: string | null; 
};