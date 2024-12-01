import { RoomProps } from "@/app/types/RoomProps";
import styles from "@/app/styles/components/room.module.css";

const Room = ({ number, status }: RoomProps) => {
  const statusClass = styles[status];

  return <div className={`${styles.room} ${statusClass}`}>{number}</div>;
};

export default Room;
