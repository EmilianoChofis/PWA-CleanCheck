import { Incidence } from "./Incidence";
import { Record } from "./Record";

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  status: boolean;
  blocked: boolean;
  role: "Maid" | "Receptionist" | "Manager";
  records: Record[];
  reports: Incidence[];
}