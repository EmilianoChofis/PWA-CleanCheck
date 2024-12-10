import { Incidence } from "./Incidence";
import { Record } from "./Record";

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  status: boolean;
  blocked: boolean;
  role: {
    id: string;
    name: string;
    description: string;
  };
  records: Record[];
  reports: Incidence[];
}