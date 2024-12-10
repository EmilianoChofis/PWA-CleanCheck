import { IncidenceProvider } from "./IncidencesContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <IncidenceProvider>{children}</IncidenceProvider>;
}
