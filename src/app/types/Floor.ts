import { Building } from "./Building";
import { Room } from "./Room";

export type Floor = {
  id: string;
  name: string;
  status: boolean;
  building: Building;
  createdAt: string;
  rooms: Room[];
};
