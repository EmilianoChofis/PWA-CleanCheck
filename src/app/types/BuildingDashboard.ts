import { Building } from "./Building";

export type BuildingDashboard = {
  building: Building;
  cleanedRooms: number;
  dirtyRooms: number;
  reportedRooms: number;
  disabledRooms: number;
  occupiedRooms: number;
  checkedRooms: number;
  inMaintenanceRooms: number;
  totalRooms: number;
};
