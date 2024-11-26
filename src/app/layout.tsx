import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/navbar";

export const metadata: Metadata = {
  title: "DebtFree",
  description: "DebtFree",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-Inter antialiased`}
      >
        <NavBar />
        {children}
      </body>
    </html>
  );
}
