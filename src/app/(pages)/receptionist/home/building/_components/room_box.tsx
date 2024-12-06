import styles from '@/app/styles/components/room.module.css';
import { Room } from '@/app/types/Room';

const RoomBox = ({
	roomSelected,
	isSelected,
	onClickRoomSelected,
}: {
	roomSelected: Room;
	isSelected: boolean;
	onClickRoomSelected: (room: Room) => void;
}) => {
	const statusClass = styles[status];

	return (
		<div
			className={`${styles.room} ${statusClass} ${isSelected ? styles.selected : ""}`}
			onClick={() => onClickRoomSelected(roomSelected)}
		>
			{roomSelected.name}
		</div>
	);
};

export default RoomBox;
