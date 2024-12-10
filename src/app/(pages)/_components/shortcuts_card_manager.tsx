"use client";
import { useState } from "react";
import { Shortcuts } from "@/app/types/Shortcuts";
import RegisterBuildingModal from "../manager/home/_components/register_building_modal";
import RegisterRoomsModal from "../manager/home/_components/register_rooms_modal";
import RegisterUserModal from "../manager/home/_components/register_users_modal";


const ShortcutsCardManager = ({ action, icon: Icon }: Shortcuts) => {
    const [registerBuildingModalOpen, setRegisterBuildingModalOpen] = useState(false);
    const [RegisterUserModalOpen, setRegisterUserModalOpen] = useState(false);
    const [registerRoomsModalOpen, setRegisterRoomsModalOpen] = useState(false);

    const handleOpenRegisterBuildingModal = () => {
        setRegisterBuildingModalOpen(true);
    };
    const handleCloseRegisterBuildingModal = () => {
        setRegisterBuildingModalOpen(false);
    };
    const handleOpenRegisterUserModal = () => {
        setRegisterUserModalOpen(true);
    };
    const handleCloseRegisterUserModal = () => {
        setRegisterUserModalOpen(false);
    };
    const handleOpenRegisterRoomsModal = () => {
        setRegisterRoomsModalOpen(true);
    };
    const handleCloseRegisterRoomsModal = () => {
        setRegisterRoomsModalOpen(false);
    };

    const handleAction = () => {
        switch (action) {
            case "Registrar Edificio":
                return (
                    <RegisterBuildingModal
                        isOpen={registerBuildingModalOpen}
                        onClose={handleCloseRegisterBuildingModal}
                        onConfirm={handleCloseRegisterBuildingModal}
                    />
                );
            case "Registrar habitaciones":
                return (
                    <RegisterRoomsModal
                        isOpen={registerRoomsModalOpen}
                        onClose={handleCloseRegisterRoomsModal}
                        onConfirm={handleCloseRegisterRoomsModal}
                    />
                );
            case "Registrar usuarios":
                return (
                    <RegisterUserModal
                        isOpen={RegisterUserModalOpen}
                        onClose={handleCloseRegisterUserModal}
                        onConfirm={handleCloseRegisterUserModal}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <>
            <button
                className="bg-gray-200 rounded-lg shadow-md p-4 min-w-[200px] flex flex-row items-center transition-transform hover:scale-105 focus:outline-none"
                onClick={() => {
                    switch (action) {
                        case "Registrar Edificio":
                            handleOpenRegisterBuildingModal();
                            break;
                            break;
                        case "Registrar habitaciones":
                            handleOpenRegisterRoomsModal();
                            break;
                        case "Registrar usuarios":
                            handleOpenRegisterUserModal();
                            break;
                        default:
                            break;
                    }
                }}
            >
                <div className="p-2 bg-white rounded-full">
                    <Icon className="text-primary" />
                </div>
                <div className="flex flex-col pl-4">
                    <h2 className="text-lg text-primary font-[family-name:var(--font-jost-medium)]">
                        {action}
                    </h2>
                </div>
            </button>
            {handleAction()}
        </>
    );
};

export default ShortcutsCardManager;