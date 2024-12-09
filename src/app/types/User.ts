export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  status: boolean;
  blocked: boolean;
  role: "Maid" | "Receptionist" | "Manager";
  records: any[];
  reports: any[];
}