import Navbar from "../_components/navbar";
import Sidebar from "../_components/sidebar";
import { SessionProvider } from "next-auth/react";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <Navbar />
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex flex-col w-full ml-64 mt-16">{children}</div>
      </div>
    </SessionProvider>
  );
}
