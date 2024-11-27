import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar"
import {Button} from "@/components/ui/button";
import {
    BanknoteIcon,
    CandlestickChartIcon,
    ChartSplineIcon,
    DollarSignIcon, SettingsIcon,
} from "lucide-react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="text-2xl font-bold px-6 pt-8 pb-6">
        Menu
      </SidebarHeader>
        <SidebarContent className="px-2.5">
            <div className="flex-1 flex flex-col gap-4">
                <Button variant="ghost" className="justify-start py-6 px-4 gap-4 [&_svg]:size-5">
                    <ChartSplineIcon /> Financial Overview
                </Button>
                <Button variant="ghost" className="justify-start py-6 px-4 gap-4 [&_svg]:size-5">
                    <DollarSignIcon /> Debt Repayment
                </Button>
                <Button variant="ghost" className="justify-start py-6 px-4 gap-4 [&_svg]:size-5">
                    <BanknoteIcon /> Refinancing Options
                </Button>
                <Button variant="ghost" className="justify-start py-6 px-4 gap-4 [&_svg]:size-5">
                    <CandlestickChartIcon /> Grow Your Money
                </Button>
            </div>
            <div className="pb-8 flex flex-col gap-4">
                <Button variant="ghost" className="justify-start py-6 px-4 gap-4 [&_svg]:size-5">
                    <SettingsIcon /> Settings
                </Button>
                <div className="px-3">
                    <Button className="w-full font-semibold border-destructive text-destructive hover:text-destructive bg-destructive/20 hover:bg-destructive/10" size="lg" variant="outline">Delete Account</Button>
                </div>
            </div>
        </SidebarContent>
    </Sidebar>
  )
}
