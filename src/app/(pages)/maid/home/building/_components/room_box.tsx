import styles from '@/app/styles/components/room.module.css';
import { Room } from '@/app/types/Room';

const RoomBox = ({
	roomSelected,
	onClickRoomSelected,
}: {
	roomSelected: Room;
	onClickRoomSelected: (room: Room) => void;
}) => {
	const statusClass = styles[roomSelected.status];

	return (
		<div
			className={`${styles.room} ${statusClass}`}
			onClick={() => onClickRoomSelected(roomSelected)}
		>
			{roomSelected.name}
		</div>
	);
};

export default RoomBox;
