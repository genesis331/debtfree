import {Card, CardContent} from "@/components/ui/card";
import {FilterIcon} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function Index() {
  return (
      <div className="min-h-screen flex flex-col px-6 py-10 gap-6">
          <div className="text-3xl font-bold">Refinancing Options</div>
          <div className="flex flex-col gap-3.5">
              <div>Recommended for you</div>
              <div className="flex flex-col gap-4">
                  <Card className="shadow-none">
                      <CardContent className="px-5 py-4">
                          <div className="flex flex-col gap-4">
                              <div className="flex flex-col gap-1">
                                  <div className="text-xs text-zinc-500">Housing Loan</div>
                                  <div>CIMB Malaysia My Second Home</div>
                              </div>
                              <div className="text-3xl font-medium pb-1">RM1,700/mo</div>
                              <div className="flex justify-between text-xs text-zinc-500">
                                  <div>Max 35 years</div>
                                  <div>from 2.15% p.a.</div>
                              </div>
                          </div>
                      </CardContent>
                  </Card>
              </div>
          </div>
          <div className="flex flex-col gap-3.5">
              <div className="flex justify-between">
                  <div>Popular offers</div>
                  <Button variant="ghost" className="px-0 py-0 h-min text-zinc-500">
                      <FilterIcon/> All Loans
                  </Button>
              </div>
              <div className="flex flex-col gap-4">
                  <Card className="shadow-none">
                      <CardContent className="px-5 py-4">
                          <div className="flex flex-col gap-4">
                              <div className="flex flex-col gap-1">
                                  <div className="text-xs text-zinc-500">Housing Loan</div>
                                  <div>Alliance Bank Personal Loan</div>
                              </div>
                              <div className="text-3xl font-medium pb-1">RM466.58/mo</div>
                              <div className="flex justify-between text-xs text-zinc-500">
                                  <div>Max 7 years</div>
                                  <div>from 4.99% p.a.</div>
                              </div>
                          </div>
                      </CardContent>
                  </Card>
                  <Card className="shadow-none">
                      <CardContent className="px-5 py-4">
                          <div className="flex flex-col gap-4">
                              <div className="flex flex-col gap-1">
                                  <div className="text-xs text-zinc-500">Vehicle Loan</div>
                                  <div>HLB Auto Loan Fixed Rate</div>
                              </div>
                              <div className="text-3xl font-medium pb-1">RM512.57/mo</div>
                              <div className="flex justify-between text-xs text-zinc-500">
                                  <div>Max 9 years</div>
                                  <div>2.80% p.a.</div>
                              </div>
                          </div>
                      </CardContent>
                  </Card>
              </div>
              <div className="text-center font-medium text-zinc-500">View more offers</div>
          </div>
      </div>
  );
}
