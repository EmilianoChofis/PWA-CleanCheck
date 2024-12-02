export type RegisterCleaningRoomProps = {
  buildingName: string;
  staff: any;
  date: string;
  roomNumber: string;
  onMarkClean: () => void;
  onReportIssue: () => void;
};
