"use client"

import * as React from "react"

import {
    Sidebar,
    SidebarContent,
    SidebarHeader, useSidebar,
} from "@/components/ui/sidebar"
import {Button} from "@/components/ui/button";
import {
    BanknoteIcon,
    CandlestickChartIcon,
    ChartSplineIcon,
    DollarSignIcon, SettingsIcon,
} from "lucide-react";
import Link from "next/link";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { toggleSidebar } = useSidebar();

  return (
    <Sidebar {...props}>
      <SidebarHeader className="text-2xl font-bold px-6 pt-8 pb-6">
        Menu
      </SidebarHeader>
        <SidebarContent className="px-2.5">
            <div className="flex-1 flex flex-col gap-4">
                <Link href="/" onClick={toggleSidebar}>
                    <Button variant="ghost" className="justify-start py-6 px-4 gap-4 [&_svg]:size-5">
                        <ChartSplineIcon /> Financial Overview
                    </Button>
                </Link>
                <Link href="/repayment" onClick={toggleSidebar}>
                    <Button variant="ghost" className="justify-start py-6 px-4 gap-4 [&_svg]:size-5">
                        <DollarSignIcon /> Debt Repayment
                    </Button>
                </Link>
                <Link href="/refinancing" onClick={toggleSidebar}>
                    <Button variant="ghost" className="justify-start py-6 px-4 gap-4 [&_svg]:size-5">
                        <BanknoteIcon /> Refinancing Options
                    </Button>
                </Link>
                <Link href="/investment" onClick={toggleSidebar}>
                    <Button variant="ghost" className="justify-start py-6 px-4 gap-4 [&_svg]:size-5">
                        <CandlestickChartIcon /> Grow Your Money
                    </Button>
                </Link>
            </div>
            <div className="pb-8 flex flex-col gap-4">
                <Link href="/settings" onClick={toggleSidebar}>
                    <Button variant="ghost" className="justify-start py-6 px-4 gap-4 [&_svg]:size-5">
                        <SettingsIcon /> Settings
                    </Button>
                </Link>
                <div className="px-3">
                    <Link href="/auth" onClick={toggleSidebar}>
                        <Button className="w-full font-semibold border-destructive text-destructive hover:text-destructive bg-destructive/20 hover:bg-destructive/10" size="lg" variant="outline">Log Out</Button>
                    </Link>
                </div>
            </div>
        </SidebarContent>
    </Sidebar>
  )
}
