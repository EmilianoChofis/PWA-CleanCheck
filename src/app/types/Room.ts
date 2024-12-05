export type Room = {
  id: string;
  identifier: string;
  name: string;
  status: "OCCUPIED" | "UNOCCUPIED" | "CLEAN" | "CHECKED" | "IN_MAINTENANCE";
  roomStatus: boolean;
  createdAt: string;
};
