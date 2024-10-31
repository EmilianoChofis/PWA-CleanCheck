import type { Metadata } from "next";
import localFont from "next/font/local";
import "./styles/globals.css";
import Sidebar from "./_components/sidebar";
import Navbar from "./_components/navbar";

const jostBold = localFont({
  src: "./fonts/Jost-Bold.ttf",
  variable: "--font-jost-bold",
  weight: "100 900",
});

const jostMedium = localFont({
  src: "./fonts/Jost-Medium.ttf",
  variable: "--font-jost-medium",
  weight: "100 900",
});

const jostRegular = localFont({
  src: "./fonts/Jost-Regular.ttf",
  variable: "--font-jost-regular",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jostMedium.variable} ${jostBold.variable} ${jostRegular.variable} antialiased`}
      >
        <Navbar />
        <div className="flex min-h-screen h-screen">
          <Sidebar />
          <div className="flex flex-col w-full">
            <main className="flex-grow overflow-auto">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
