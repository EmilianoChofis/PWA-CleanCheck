import styles from "@/app/styles/components/room.module.css";
import RoomBox from "./room_box";
import { Divider } from "@mui/material";
import { Floor } from "@/app/types/Floor";
import { Room } from "@/app/types/Room";

const RoomFloor = ({
  floorSelected,
  onClickRoomSelected,
}: {
  floorSelected: Floor;
  onClickRoomSelected: (room: Room) => void;
}) => {
  return (
    <div className={styles.floor}>
      <div className={styles.floorTitle}>{floorSelected.name}</div>
      <div className={styles.roomGrid}>
        {
          floorSelected.rooms.length > 0 ? floorSelected.rooms.map((room, index) => (
            <RoomBox
              key={index}
              roomSelected={room}
              onClickRoomSelected={(room) => onClickRoomSelected(room)}
            />
          )) : <p>No hay habitaciones disponibles</p>
        }
      </div>
      <Divider />
    </div>
  );
};

export default RoomFloor;
