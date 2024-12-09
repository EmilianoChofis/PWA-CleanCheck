"use client";
import { useState, useEffect } from "react";
import Title from "@/app/_components/title";
import Searchbar from "../../_components/searchbar";
import CategoryButton from "../../_components/category_button";
import ButtonCustom from "@/app/_components/button_custom";
import UsersTable from "../../_components/users_table";

import RegisterUserModal from "../home/_components/register_users_modal";
import UsersCardList from "../../_components/users_card_list";

export default function GestionUsers() {
    const [categories, setCategories] = useState([
        { label: "Todos", active: true },
        { label: "Personal de Servicio", active: false },
        { label: "Recepcionistas", active: false },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLargeScreen, setIsLargeScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth > 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const handleCategoryClick = (clickedCategory: string) => {
        setCategories((prevCategories) =>
            prevCategories.map((category) => ({
                ...category,
                active: category.label === clickedCategory,
            }))
        );
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
                        onClick={() => setIsModalOpen(true)}
                        className="px-8 py-3 text-lg"
                    >
                        Registrar usuario
                    </ButtonCustom>
                </div>
                <div className="py-2">
                    <Searchbar label="Buscar" onChange={handleSearchChange} />
                    <div className="px-2 py-2">
                        <CategoryButton
                            categories={categories}
                            onCategoryClick={(category) => handleCategoryClick(category)}
                        />
                    </div>
                    </div>
                    <div className="w-full">
                        {isLargeScreen ? (
                            <UsersTable searchTerm={searchTerm} />
                        ) : (
                            <UsersCardList searchTerm={searchTerm} />
                        )}
                    </div>
            </main>
            <RegisterUserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={() => setIsModalOpen(false)}
            />
        </div>
    );
}
