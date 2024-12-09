import { Room } from "./Room";
import { User } from "./User";

export type Record = {
  id: string;
  createdAt: string;
  previousState:
    | "OCCUPIED"
    | "UNOCCUPIED"
    | "CLEAN"
    | "CHECKED"
    | "IN_MAINTENANCE";
  newState: "OCCUPIED" | "UNOCCUPIED" | "CLEAN" | "CHECKED" | "IN_MAINTENANCE";
  user: User;
  room: Room;
};
