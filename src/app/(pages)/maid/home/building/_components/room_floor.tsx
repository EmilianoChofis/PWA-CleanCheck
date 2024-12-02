import { RoomFloorProps } from "@/app/types/RoomFloorProps";
import styles from "@/app/styles/components/room.module.css";
import RoomBox from "./room_box";
import { Divider } from "@mui/material";
import { Floor } from "@/app/types/Floor";

const RoomFloor = ({
  floorSelected,
  onClickRoomSelected,
}: {
  floorSelected: Floor;
  onClickRoomSelected: (room: any) => void;
}) => {
  return (
    <div className={styles.floor}>
      <div className={styles.floorTitle}>{floorSelected.name}</div>
      <div className={styles.roomGrid}>
        {floorSelected.rooms.map((room, index) => (
          <RoomBox
            key={index}
            roomSelected={room}
            onClickRoomSelected={(room) => onClickRoomSelected(room)}
          />
        ))}
      </div>
      <Divider />
    </div>
  );
};

export default RoomFloor;
