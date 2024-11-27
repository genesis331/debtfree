"use client"

import {Button} from "@/components/ui/button";
import {AlignLeftIcon} from "lucide-react";
import {useSidebar} from "@/components/ui/sidebar";

export default function NavBar() {
    const { toggleSidebar } = useSidebar();

    return (
        <div className="py-5 px-4">
            <Button className="[&_svg]:size-6 px-2" variant="ghost" onClick={toggleSidebar}>
                <AlignLeftIcon/>
            </Button>
        </div>
    )
}