import { Room } from "./Room";

export type DetailedReportProps = {
  isOpen: boolean;
  onClose: () => void;
  onCloseConfirm?: () => void;
  room?: Room;
};
