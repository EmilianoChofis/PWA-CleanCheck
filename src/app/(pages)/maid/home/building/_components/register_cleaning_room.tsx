import ButtonCustom from "@/app/_components/button_custom";
import { RegisterCleaningRoomProps } from "@/app/types/RegisterCleaningRoomProps";
import { Business } from "@mui/icons-material";

const RegisterCleaningRoom = ({
  data,
  isRoomSelected,
}: {
  data: RegisterCleaningRoomProps;
  isRoomSelected: boolean;
}) => {
  return (
    <>
      <section className="mb-4 bg-gray-100 p-4 rounded-md shadow-sm border flex flex-row items-center">
        <button className="p-4 bg-complementary rounded-full me-4">
          <Business className="text-disabled" style={{ fontSize: 30 }} />
        </button>
        <div>
          <h3 className="text-lg text-primary font-[family-name:var(--font-jost-medium)]">
            {data.buildingName}
          </h3>
          <p className="text-sm">
            Personal:
            <span className="text-primary"> {data.staff}</span>
          </p>
          <p className="text-sm">
            Fecha:
            <span className="text-primary"> {data.date}</span>
          </p>
          <p className="text-sm">
            Habitación:
            <span className="text-primary font-[family-name:var(--font-jost-bold)]">
              {" "}
              {data.roomNumber}
            </span>
          </p>
        </div>
      </section>
      {isRoomSelected && (
        <div className="py-3">
          <ButtonCustom
            className="w-full mb-3"
            colorText="background"
            variant="filled"
            onClick={data.onMarkClean}
          >
            Marcar como limpia
          </ButtonCustom>
          <ButtonCustom
            className="w-full mb-3"
            variant="outlined"
            colorText="error"
            borderColor="error"
            onClick={data.onReportIssue}
          >
            Reportar
          </ButtonCustom>
        </div>
      )}
    </>
  );
};

export default RegisterCleaningRoom;
