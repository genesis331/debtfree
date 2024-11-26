import {Card, CardContent} from "@/components/ui/card";

export default function Index() {
  return (
      <div className="min-h-screen flex flex-col">
          <div>Welcome, Ahmad Iskandar</div>
          <div>
              <Card>
                  <CardContent className="p-0">
                      <div>
                          <div>Total Asset</div>
                          <div></div>
                      </div>
                  </CardContent>
              </Card>
              <Card>
                  <CardContent className="p-0">
                      <div>
                          <div>Debt Repayment Progress</div>
                          <div></div>
                      </div>
                  </CardContent>
              </Card>
              <Card>
                  <CardContent className="p-0">
                      <div>
                          <div>Debt vs Asset by Month</div>
                          <div></div>
                      </div>
                  </CardContent>
              </Card>
              <Card>
                  <CardContent className="p-0">
                      <div>
                          <div>Debt Ratios</div>
                          <div></div>
                      </div>
                  </CardContent>
              </Card>
          </div>
      </div>
  );
}
