import { KeyboardArrowRight, PersonOutlineOutlined } from "@mui/icons-material";
import ButtonCustom from "@/app/_components/button_custom";

const Navbar = () => {
  return (
    <header className="navbar fixed left-0 top-0 w-full h-16 bg-indigo-900 text-white p-4 flex justify-between items-center font-[family-name:var(--font-jost-medium)] z-20">
      <h1 className="text-xl font-semibold">CleanCheck</h1>
      <ButtonCustom
        variant="filled"
        backgroundColor="white"
        icon={<KeyboardArrowRight className="text-primary" />}
      >
        <PersonOutlineOutlined className="text-primary" />
      </ButtonCustom>
    </header>
  );
};

export default Navbar;
