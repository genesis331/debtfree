"use client"

import "./globals.css";
import {SidebarProvider} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/app-sidebar";
import NavBar from "@/components/nav-bar";
import React from "react";
import ActionButton from "@/components/action-btn";
import {usePathname} from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const pathname = usePathname()

  return (
      <html lang="en">
          <body
              className="font-Inter antialiased"
          >
              <SidebarProvider>
                  <AppSidebar />
                  <div className="flex-1">
                      {pathname === "/auth" ? null : <NavBar />}
                      {pathname === "/chat" ? null : <ActionButton />}
                      {children}
                  </div>
              </SidebarProvider>
          </body>
      </html>
  );
}
