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
        <button
            onClick={handleClick}
            className={`${styles.room} ${statusClass} ${isSelected ? styles.selected : ""}`}
            disabled={status === "deshabilitada"}
            aria-label={`Seleccionar habitación ${number}`}
        >
            {number}
        </button>
    );
};

export default Room;