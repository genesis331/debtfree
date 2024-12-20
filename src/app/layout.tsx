import "./globals.css";
import {SidebarProvider} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/app-sidebar";
import NavBar from "@/components/nav-bar";
import React, {Suspense} from "react";
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
                  <div className="flex-1 flex flex-col">
                      <NavBar />
                      <Suspense>
                          {children}
                      </Suspense>
                  </div>
              </SidebarProvider>
          </body>
      </html>
  );
}
