export type RegisterCleaningRoomProps = {
	buildingName: string;
	staff: string;
	date: string;
	roomNumber: string;
	onMarkClean: () => void;
	onReportIssue: () => void;
};
