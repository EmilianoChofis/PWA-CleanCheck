import { RoomSelectedProps } from "@/app/types/RoomSelectedProps";
import styles from "@/app/styles/components/room.module.css";
import Room from "./room";
import { Divider } from "@mui/material";

const RoomFloor = ({ floorNumber, rooms, onRoomSelect, selectedRoom }: RoomSelectedProps) => {
    return (
        <div className={styles.floor}>
            <div className={styles.floorTitle}>Piso {floorNumber}</div>
            <div className={styles.roomGrid}>
                {rooms.map((room) => (
                    <Room
                        key={room.number}
                        number={room.number}
                        status={room.status}
                        isSelected={selectedRoom === room.number}
                        onSelect={onRoomSelect}
                    />
                ))}
            </div>
            <Divider />
        </div>
    );
};

export default RoomFloor;