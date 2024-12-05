import { BuildingProvider } from "./BuildingContext";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BuildingProvider>{children}</BuildingProvider>;
}
