import { Floor } from "./Floor";

export type Building = {
  id: number;
  name: string;
  number: number;
  status: boolean;
  createdAt: string;
  floors: Floor[];
  cleanRooms: number;
  dirtyRooms: number;
  reportedRooms: number;
  disabledRooms: number;
  totalRooms: number;
};
