import {Card, CardContent} from "@/components/ui/card";

export default function Index() {
  return (
      <div className="min-h-screen flex flex-col px-6 py-10 gap-6">
          <div className="text-3xl font-bold">Grow Your Money</div>
          <div className="flex flex-col gap-3.5">
              <div className="font-semibold">Low-Risk Investments</div>
              <div className="flex flex-col gap-4">
                  <Card className="shadow-none">
                      <CardContent className="px-5 py-4">
                          <div>Maybank Fixed Deposit</div>
                          <div className="text-xs text-zinc-500">up to 3.80% p.a.</div>
                      </CardContent>
                  </Card>
                  <Card className="shadow-none">
                      <CardContent className="px-5 py-4">
                          <div>Malaysian Government Securities</div>
                          <div className="text-xs text-zinc-500">up to 3.81% p.a.</div>
                      </CardContent>
                  </Card>
              </div>
          </div>
          <div className="flex flex-col gap-3.5">
              <div className="font-semibold">Learn Investment</div>
              <div className="flex flex-col gap-4">
                  <Card className="shadow-none">
                      <CardContent className="px-5 py-4">
                          <div>Decoding Financial Earning Reports</div>
                          <div className="text-xs text-zinc-500">Financial Reports</div>
                      </CardContent>
                  </Card>
                  <Card className="shadow-none">
                      <CardContent className="px-5 py-4">
                          <div>Investing in Dividend Stocks</div>
                          <div className="text-xs text-zinc-500">Diversify Your Portfolio</div>
                      </CardContent>
                  </Card>
                  <Card className="shadow-none">
                      <CardContent className="px-5 py-4">
                          <div>Beginner’s Guide to ETFs</div>
                          <div className="text-xs text-zinc-500">ETF Investing</div>
                      </CardContent>
                  </Card>
                  <Card className="shadow-none">
                      <CardContent className="px-5 py-4">
                          <div>How to Reduce Investment Risk</div>
                          <div className="text-xs text-zinc-500">Risk Management</div>
                      </CardContent>
                  </Card>
              </div>
          </div>
      </div>
  );
}
