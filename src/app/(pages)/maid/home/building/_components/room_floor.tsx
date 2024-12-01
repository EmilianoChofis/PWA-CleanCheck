import { RoomFloorProps } from "@/app/types/RoomFloorProps";
import styles from "@/app/styles/components/room.module.css";
import Room from "./room";
import { Divider } from "@mui/material";

const RoomFloor = ({ floorNumber, rooms }: RoomFloorProps) => {
  return (
    <div className={styles.floor}>
      <div className={styles.floorTitle}>Piso {floorNumber}</div>
      <div className={styles.roomGrid}>
        {rooms.map((room) => (
          <Room key={room.number} number={room.number} status={room.status} />
        ))}
      </div>
      <Divider />
    </div>
  );
};

export default RoomFloor;
