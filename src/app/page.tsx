import {Card, CardContent} from "@/components/ui/card";

export default function Index() {
  return (
      <div className="min-h-screen flex flex-col px-6 py-10 gap-6">
          <div className="text-3xl font-bold">Welcome, <span className="text-blue-700">Ahmad Iskandar</span></div>
          <div className="flex flex-col gap-5">
              <Card className="shadow-none">
                  <CardContent className="px-5 py-4">
                      <div>
                          <div className="font-semibold">Total Asset</div>
                          <div></div>
                      </div>
                  </CardContent>
              </Card>
              <Card className="shadow-none">
                  <CardContent className="px-5 py-4">
                      <div>
                          <div className="font-semibold">Debt Repayment Progress</div>
                          <div></div>
                      </div>
                  </CardContent>
              </Card>
              <Card className="shadow-none">
                  <CardContent className="px-5 py-4">
                      <div>
                          <div className="font-semibold">Debt vs Asset by Month</div>
                          <div></div>
                      </div>
                  </CardContent>
              </Card>
              <Card className="shadow-none">
                  <CardContent className="px-5 py-4">
                      <div>
                          <div className="font-semibold">Debt Ratios</div>
                          <div></div>
                      </div>
                  </CardContent>
              </Card>
          </div>
      </div>
  );
}
