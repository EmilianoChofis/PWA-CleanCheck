import { BuildingProvider } from "@/app/context/BuildingContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <BuildingProvider>{children}</BuildingProvider>;
}
