import { Room } from "./Room";

export type Floor = {
  id: number;
  name: string;
  status: boolean;
  createdAt: string;
  rooms: Room[];
};
