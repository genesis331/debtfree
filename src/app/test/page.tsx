import {SendIcon} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function Index() {
  return (
      <div className="min-h-screen flex flex-col px-6 pb-10 gap-3">
          <div className="text-3xl font-bold">Test Menu</div>
          <Button variant="outline" className="justify-start py-6 px-4 gap-4 [&_svg]:size-5">
              <SendIcon className="text-blue-700"/> Send Alert Email
          </Button>
      </div>
  );
}
