import { IncidenceProvider } from "@/app/context/IncidencesContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <IncidenceProvider>{children}</IncidenceProvider>;
}
