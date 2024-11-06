import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import { WorkZone } from "../../types/WorkZone";

const WorkZoneCard = ({ zone, location }: WorkZone) => {
  return (
    <div className="bg-gray-200 rounded-lg shadow-md p-4 min-w-[200px] flex flex-row items-center font-[family-name:var(--font-jost-regular)]">
      <button className="p-2 bg-white rounded-full">
        <BedOutlinedIcon className="text-primary" />
      </button>
      <div className="flex flex-col pl-4">
        <h2 className="text-lg text-primary font-[family-name:var(--font-jost-medium)]">
          {zone}
        </h2>
        <p className="text-sm text-primary">{location}</p>
      </div>
    </div>
  );
};

export default WorkZoneCard;
