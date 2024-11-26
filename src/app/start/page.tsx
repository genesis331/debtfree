import {Button} from "@/components/ui/button";
import {
    CandlestickChartIcon,
    CircleDollarSignIcon,
    DockIcon,
    LandmarkIcon,
    Trash2Icon,
    WalletCardsIcon
} from "lucide-react";
import {Card, CardContent} from "@/components/ui/card";

export default function Index() {
  return (
      <div className="min-h-screen flex flex-col px-6 py-10 gap-6">
          <div className="text-3xl font-bold">Link your accounts</div>
          <div className="flex flex-col gap-3.5">
              <div className="font-semibold">Linked accounts</div>
              <div className="flex flex-col gap-4">
                  <Card className="shadow-none">
                      <CardContent className="px-5 py-4">
                          <div className="flex items-center">
                              <div className="flex-1">
                                  <div>Maybank</div>
                                  <div className="text-xs text-gray-500">xxxxxxxx13</div>
                              </div>
                              <div>
                                  <Button className="[&_svg]:size-6 px-2 text-gray-500" variant="ghost"><Trash2Icon /></Button>
                              </div>
                          </div>
                      </CardContent>
                  </Card>
                  <Card className="shadow-none">
                      <CardContent className="px-5 py-4">
                          <div className="flex items-center">
                              <div className="flex-1">
                                  <div>Touch n’ Go E-Wallet</div>
                                  <div className="text-xs text-gray-500">601xxxxxxxx27</div>
                              </div>
                              <div>
                                  <Button className="[&_svg]:size-6 px-2 text-gray-500" variant="ghost"><Trash2Icon /></Button>
                              </div>
                          </div>
                      </CardContent>
                  </Card>
              </div>
          </div>
          <div className="flex flex-col gap-3.5">
              <div className="font-semibold">Add accounts</div>
              <div className="flex flex-col gap-4">
                  <Button variant="outline" className="justify-start py-6 px-4 gap-4 [&_svg]:size-5">
                      <LandmarkIcon className="text-blue-700"/> Bank Account
                  </Button>
                  <Button variant="outline" className="justify-start py-6 px-4 gap-4 [&_svg]:size-5">
                      <WalletCardsIcon className="text-blue-700"/> E-Wallet Account
                  </Button>
                  <Button variant="outline" className="justify-start py-6 px-4 gap-4 [&_svg]:size-5">
                      <DockIcon className="text-blue-700"/> Credit Cards
                  </Button>
                  <Button variant="outline" className="justify-start py-6 px-4 gap-4 [&_svg]:size-5">
                      <CandlestickChartIcon className="text-blue-700"/> Stock Wallets
                  </Button>
                  <Button variant="outline" className="justify-start py-6 px-4 gap-4 [&_svg]:size-5">
                      <CircleDollarSignIcon className="text-blue-700"/> Other Sources
                  </Button>
              </div>
          </div>
          <div>
              <Button className="w-full font-semibold bg-blue-700 hover:bg-blue-700/80" size="lg">Continue</Button>
          </div>
      </div>
  );
}
