import "./globals.css";
import {SidebarProvider} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/app-sidebar";
import NavBar from "@/components/nav-bar";
import React from "react";
import {Metadata} from "next";

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
              className="font-Inter antialiased"
          >
              <SidebarProvider>
                  <AppSidebar />
                  <div className="flex-1">
                      <NavBar />
                      {children}
                  </div>
              </SidebarProvider>
          </body>
      </html>
  );
}
