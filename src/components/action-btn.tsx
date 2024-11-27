import {Button} from "@/components/ui/button";
import {BotMessageSquareIcon} from "lucide-react";

export default function ActionButton() {
    return (
        <div className="fixed bottom-6 right-6">
            <Button className="[&_svg]:size-7 text-white h-16 w-16 bg-blue-700 hover:bg-blue-700/80 rounded-full"><BotMessageSquareIcon/></Button>
        </div>
    )
}