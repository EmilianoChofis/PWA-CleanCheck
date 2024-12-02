"use client";
import { useState } from "react";
import Title from "@/app/_components/title";
import Searchbar from "../../_components/searchbar";
import CategoryButton from "../../_components/category_button";
import ButtonCustom from "@/app/_components/button_custom";
import UsersTable from "../../_components/users_table";
import RegisterUserModal from "../_components/register_users_modal";

export default function GestionUsers() {
    const [categories, setCategories] = useState([
        { label: "Todos", active: true },
        { label: "Personal de Servicio", active: false },
        { label: "Recepcionistas", active: false },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
    };

    const handleCategoryClick = (clickedCategory: string) => {
        setCategories((prevCategories) =>
            prevCategories.map((category) => ({
                ...category,
                active: category.label === clickedCategory,
            }))
        );
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleConfirm = () => {
        console.log("Usuario registrado");
        closeModal();
    };

    return (
        <div className="grid grid-rows-[auto_1fr_auto] p-8 pb-20 gap-16 w-full">
            <main className="w-full">
                <div className="flex justify-between items-center mb-4">
                    <Title className="text-2xl text-primary" title="Lista de usuarios" />
                    <ButtonCustom
                        variant="filled"
                        colorText="background"
                        backgroundColor="primary"
                        onClick={openModal}
                        className="px-8 py-3 text-lg"
                    >
                        Registrar usuario
                    </ButtonCustom>
                </div>
                <div className="py-2">
                    <Searchbar label="Buscar" onChange={handleSearchChange} />
                    <CategoryButton
                        categories={categories}
                        onCategoryClick={(category) => handleCategoryClick(category)}
                    />
                </div>
                <div className="w-full">
                    <UsersTable />
                </div>
            </main>
            <RegisterUserModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handleConfirm}
            />
        </div>
    );
}