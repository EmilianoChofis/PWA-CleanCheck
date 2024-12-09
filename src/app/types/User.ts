export type Role = {
    id: string;
    name: string;
    description: string;
};

export type User = {
    id: string;
    name: string;
    email: string;
    password?: string;
    role: Role;
    status: boolean;
    blocked: boolean;
    createdAt: string;
};
