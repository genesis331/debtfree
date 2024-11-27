"use client"

import {Button} from "@/components/ui/button";
import {AlignLeftIcon} from "lucide-react";
import {useSidebar} from "@/components/ui/sidebar";
import ActionButton from "@/components/action-btn";
import React from "react";
import {usePathname} from "next/navigation";

export default function NavBar() {
    const { toggleSidebar } = useSidebar();
    const pathname = usePathname();

    return (
        <>
            {
                pathname !== "/auth" ? <div className="py-5 px-4">
                    <Button className="[&_svg]:size-6 px-2" variant="ghost" onClick={toggleSidebar}>
                        <AlignLeftIcon/>
                    </Button>
                </div> : null
            }
            {
                pathname !== "/chat" ? <ActionButton/> : null
            }
        </>
    )
}