import { Floor } from "./Floor";

export type Building = {
  id: string;
  name: string;
  number: number;
  status: boolean;
  createdAt: string;
  floors: Floor[];
};
