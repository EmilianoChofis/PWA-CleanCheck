import Title from "@/app/_components/title";
import styles from "@/app/styles/components/shortcuts.module.css";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import RoomServiceOutlinedIcon from "@mui/icons-material/RoomServiceOutlined";
import LuggageIcon from "@mui/icons-material/Luggage";
import ShortcutsCard from "./shortcuts_card";

const shortcuts = [
    {
        id: 1,
        action: "Habitaciones",
        icon: BedOutlinedIcon,
    },
    {
        id: 2,
        action: "Marcar Entrada",
        icon: RoomServiceOutlinedIcon,
    },
    {
        id: 3,
        action: "Marcar Salida",
        icon: LuggageIcon,
    }
];

const Shortcuts = () => {
    return (
        <div>
            <Title className="text-2xl text-primary mb-4" title="Accesos directos" />
            <div className={styles.container}>
                {shortcuts.map((shortcut, index) => (
                    <ShortcutsCard key={index} {...shortcut} />
                ))}
            </div>
        </div>
    );
};

export default Shortcuts;
