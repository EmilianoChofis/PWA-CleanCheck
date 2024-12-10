"use client";
import { User } from "@/app/types/User";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface UserContextProps {
    selectedUser: User | null;
    setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ selectedUser, setSelectedUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = (): UserContextProps => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error(
            "useUserContext debe usarse dentro de UserProvider"
        );
    }
    return context;
};