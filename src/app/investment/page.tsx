import {Card, CardContent} from "@/components/ui/card";

export default function Index() {
  return (
      <div className="min-h-screen flex flex-col">
          <div>Grow Your Money</div>
          <div>
          <div>Low-Risk Investments</div>
              <div className="flex flex-col">
                  <Card>
                      <CardContent className="p-0">
                          <div>Maybank Fixed Deposit</div>
                          <div>up to 3.80% p.a.</div>
                      </CardContent>
                  </Card>
                  <Card>
                      <CardContent className="p-0">
                          <div>Malaysian Government Securities</div>
                          <div>up to 3.81% p.a.</div>
                      </CardContent>
                  </Card>
              </div>
          </div>
          <div>
              <div>Learn Investment</div>
              <div className="flex flex-col">
                  <Card>
                      <CardContent className="p-0">
                          <div>Decoding Financial Earning Reports</div>
                          <div>Financial Reports</div>
                      </CardContent>
                  </Card>
                  <Card>
                      <CardContent className="p-0">
                          <div>Investing in Dividend Stocks</div>
                          <div>Diversify Your Portfolio</div>
                      </CardContent>
                  </Card>
                  <Card>
                      <CardContent className="p-0">
                          <div>Beginner’s Guide to ETFs</div>
                          <div>ETF Investing</div>
                      </CardContent>
                  </Card>
                  <Card>
                      <CardContent className="p-0">
                          <div>How to Reduce Investment Risk</div>
                          <div>Risk Management</div>
                      </CardContent>
                  </Card>
              </div>
          </div>
      </div>
  );
}
