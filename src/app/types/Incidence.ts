import { Image } from "./Image";
import { Room } from "./Room";
import { User } from "./User";

export type Incidence = {
  id: string;
  description: string;
  createdAt: string;
  status: "PENDING" | "IN_PROGRESS" | "FINISHED";
  images: Image[];
  user: User;
  room: Room;
};
