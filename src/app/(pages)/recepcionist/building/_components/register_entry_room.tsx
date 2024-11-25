import ButtonCustom from "@/app/_components/button_custom";
import { RegisterEntryRoomProps } from "@/app/types/RegisterEntryRoomProps";
import { Business, KeyboardTabOutlined  } from "@mui/icons-material";

const RegisterEntryRoom = ({
  buildingName,
  status,
  roomNumber,
  onMarkEntry,
}: RegisterEntryRoomProps) => {
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
            Habitación:
            <span className="text-primary font-[family-name:var(--font-jost-bold)]">
              {" "}
              {roomNumber}
            </span>
          </p>
          <p className="text-sm">
            Estado:
            <span className="text-primary"> {status}</span>
          </p>
          
        </div>
      </div>
      <div className="py-3">
        <ButtonCustom
          className="w-full mb-3"
          colorText="background"
          variant="filled"
          onClick={onMarkEntry}
        >
          Marcar Entrada
          <KeyboardTabOutlined className="ml-2" />
        </ButtonCustom>
      </div>
    </>
  );
};

export default RegisterEntryRoom;
