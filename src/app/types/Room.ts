import { Floor } from "./Floor";

export type Room = {
  id: string;
  identifier: string;
  name: string;
  status: "OCCUPIED" | "UNOCCUPIED" | "CLEAN" | "CHECKED" | "IN_MAINTENANCE";
  floor: Floor;
  roomStatus: boolean;
  createdAt: string;
};
