export type RegisterEntryRoomProps = {
    buildingName: string;
    roomNumber: string;
    status: string;
    onMarkEntry: () => void;
    onMarkExit: () => void;
};