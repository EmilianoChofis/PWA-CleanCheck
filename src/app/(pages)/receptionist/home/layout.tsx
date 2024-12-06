import { BuildingProvider } from "./BuildingContext";

export default function ReceptionistLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <BuildingProvider>{children}</BuildingProvider>;
}

