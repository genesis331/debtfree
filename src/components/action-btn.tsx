import {Button} from "@/components/ui/button";
import {BotMessageSquareIcon} from "lucide-react";
import Link from "next/link";

export default function ActionButton() {
    return (
        <div className="fixed bottom-6 right-6 z-10">
            <Link href="/chat">
                <Button className="[&_svg]:size-7 text-white h-16 w-16 bg-blue-700 hover:bg-blue-700/80 rounded-full">
                    <BotMessageSquareIcon/>
                </Button>
            </Link>
        </div>
    )
}