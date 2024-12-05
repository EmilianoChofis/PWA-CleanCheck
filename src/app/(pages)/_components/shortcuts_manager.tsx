import Title from "@/app/_components/title";
import styles from "@/app/styles/components/shortcuts.module.css";
import ShortcutsCardManager from "./shortcuts_card_manager";
import { BedOutlined, DomainAdd, PersonAddOutlined } from "@mui/icons-material";

const shortcuts = [
    {
        id: 1,
        action: "Registrar Edificio",
        icon: DomainAdd,
    },
    {
        id: 2,
        action: "Registrar habitaciones",
        icon: BedOutlined,
    },
    {
        id: 3,
        action: "Registrar usuarios",
        icon: PersonAddOutlined,
    }
];

const shortcutsManager = () => {
    return (
        <div>
            <Title className="text-2xl text-primary mb-4" title="Accesos directos" />
            <div className={styles.container}>
                {shortcuts.map((shortcut) => (
                    <ShortcutsCardManager key={shortcut.id} {...shortcut} />
                ))}
            </div>
        </div>
    );
};

export default shortcutsManager;