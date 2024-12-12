"use client";
import "./styles/globals.css";
import localFont from "next/font/local";
import { useEffect, useState } from "react";

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
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => console.log('Service Worker registered:', registration))
        .catch((error) => console.log('Service Worker registration failed:', error));
    }
  }, []);

  const fontClasses = isClient
    ? `${jostMedium.variable} ${jostBold.variable} ${jostRegular.variable}`
    : ""; // vacío en el servidor

  return (
    <html lang="en">
      <body className={`${fontClasses} antialiased`}>{children}</body>
    </html>
  );
}
