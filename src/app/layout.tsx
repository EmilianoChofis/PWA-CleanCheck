import "./styles/globals.css";
import localFont from "next/font/local";

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
  return (
    <html lang="en">
      <body
        className={`${jostMedium.variable} ${jostBold.variable} ${jostRegular.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
