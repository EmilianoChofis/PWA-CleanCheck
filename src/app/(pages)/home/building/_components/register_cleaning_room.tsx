import ButtonCustom from "@/app/_components/button_custom";
import { RegisterCleaningRoomProps } from "@/app/types/RegisterCleaningRoomProps";
import { Business } from "@mui/icons-material";

const RegisterCleaningRoom = ({
  buildingName,
  staff,
  date,
  roomNumber,
  onMarkClean,
  onReportIssue,
}: RegisterCleaningRoomProps) => {
  return (
    <>
      <div className="bg-gray-200 p-4 rounded-lg shadow-md flex flex-row items-center">
        <button className="p-4 bg-complementary rounded-full me-4">
          <Business className="text-disabled" style={{ fontSize: 30 }} />
        </button>
        <div>
          <h3 className="text-lg text-primary font-[family-name:var(--font-jost-medium)]">
            {buildingName}
          </h3>
          <p className="text-sm">
            Personal:
            <span className="text-primary"> {staff}</span>
          </p>
          <p className="text-sm">
            Fecha:
            <span className="text-primary"> {date}</span>
          </p>
          <p className="text-sm">
            Habitación:
            <span className="text-primary font-[family-name:var(--font-jost-bold)]">
              {" "}
              {roomNumber}
            </span>
          </p>
        </div>
      </div>
      <div className="py-3">
        <ButtonCustom
          className="w-full mb-3"
          colorText="background"
          variant="filled"
          onClick={onMarkClean}
        >
          Marcar como limpia
        </ButtonCustom>
        <ButtonCustom
          className="w-full mb-3"
          variant="outlined"
          colorText="error"
          borderColor="error"
          onClick={onReportIssue}
        >
          Reportar
        </ButtonCustom>
      </div>
    </>
  );
};

export default RegisterCleaningRoom;
