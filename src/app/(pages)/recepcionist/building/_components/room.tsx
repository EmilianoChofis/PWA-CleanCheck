import { RoomProps } from "@/app/types/RoomProps";
import styles from "@/app/styles/components/room2.module.css";

interface RoomPropsExtended extends RoomProps {
    isSelected: boolean;
    onSelect: (roomNumber: string) => void;
}

const Room = ({ number, status, isSelected, onSelect }: RoomPropsExtended) => {
    const statusClass = styles[status];

    const handleClick = () => {
        if (status !== "deshabilitada") {
            onSelect(number);
        }
    };

    return (
        <div
            onClick={handleClick}
            className={`${styles.room} ${statusClass} ${isSelected ? styles.selected : ""}`}
        >
            {number}
        </div>
    );
};

export default Room;