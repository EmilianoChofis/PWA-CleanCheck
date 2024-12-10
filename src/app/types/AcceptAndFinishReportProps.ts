export type AcceptAndFinishReportProps = {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  room: string;
  building: string;
  isLoading: boolean;
};
