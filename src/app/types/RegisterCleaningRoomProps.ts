export type RegisterCleaningRoomProps = {
	buildingName: string;
	staff: string;
	date: string;
	roomNumber: string;
	roomStatus: string;
	onMarkClean: () => void;
	onReportIssue: () => void;
	isLoading?: boolean;
};
