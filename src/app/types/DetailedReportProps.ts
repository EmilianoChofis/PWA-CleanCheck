export type DetailedReportProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReport: (description: string, files: File[]) => void;
  roomNumber: string;
};
