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
      <div className="min-h-screen flex flex-col">
          <div>Link your accounts</div>
          <div>
              <div>Linked accounts</div>
              <div className="flex flex-col">
                  <Card>
                      <CardContent className="p-0">
                          <div className="flex items-center">
                              <div className="flex-1">
                                  <div>Maybank</div>
                                  <div>xxxxxxxx13</div>
                              </div>
                              <div>
                                  <Button variant="ghost"><Trash2Icon /></Button>
                              </div>
                          </div>
                      </CardContent>
                  </Card>
                  <Card>
                      <CardContent className="p-0">
                          <div className="flex items-center">
                              <div className="flex-1">
                                  <div>Touch n’ Go E-Wallet</div>
                                  <div>601xxxxxxxx27</div>
                              </div>
                              <div>
                                  <Button variant="ghost"><Trash2Icon /></Button>
                              </div>
                          </div>
                      </CardContent>
                  </Card>
              </div>
          </div>
          <div>
              <div>Add accounts</div>
              <div className="flex flex-col">
                  <Button>
                      <LandmarkIcon /> Bank Account
                  </Button>
                  <Button>
                      <WalletCardsIcon /> E-Wallet Account
                  </Button>
                  <Button>
                      <DockIcon /> Credit Cards
                  </Button>
                  <Button>
                      <CandlestickChartIcon /> Stock Wallets
                  </Button>
                  <Button>
                      <CircleDollarSignIcon /> Other Sources
                  </Button>
              </div>
          </div>
          <div>
              <Button>Continue</Button>
          </div>
      </div>
  );
}
