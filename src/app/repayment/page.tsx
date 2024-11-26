import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {
    ChartNoAxesCombinedIcon, CrownIcon,
    MailWarningIcon,
    PercentIcon,
    SortDescIcon
} from "lucide-react";

export default function Index() {
  return (
      <div className="min-h-screen flex flex-col px-6 py-10 gap-6">
          <div className="flex flex-col gap-6">
              <div className="text-3xl font-bold">Debt Repayment</div>
              <div>
                  <Card className="shadow-none">
                      <CardContent className="px-5 py-4">
                          <div>
                              <div className="font-semibold">Financial Forecasting</div>
                              <div></div>
                          </div>
                      </CardContent>
                  </Card>
              </div>
              <div className="flex flex-col gap-3.5">
                  <div className="flex justify-between items-center">
                      <div className="font-semibold">All Debts</div>
                      <Button variant="ghost" className="px-0 py-0 h-min text-gray-500">
                          <SortDescIcon/> Debt amount
                      </Button>
                  </div>
                  <div className="flex flex-col gap-4">
                      <Card className="shadow-none">
                          <CardContent className="px-5 py-4">
                              <div className="flex justify-between">
                                  <div>Proton Saga</div>
                                  <div>RM1,300/mo</div>
                              </div>
                              <div className="flex justify-between text-xs text-gray-500">
                                  <div>Vehicle Loan</div>
                                  <div>3.40% p.a.</div>
                              </div>
                          </CardContent>
                      </Card>
                      <Card className="shadow-none">
                          <CardContent className="px-5 py-4">
                              <div className="flex justify-between">
                                  <div>Maju Apartment</div>
                                  <div>RM1,100/mo</div>
                              </div>
                              <div className="flex justify-between text-xs text-gray-500">
                                  <div>Housing Loan</div>
                                  <div>2.88% p.a.</div>
                              </div>
                          </CardContent>
                      </Card>
                      <Card className="shadow-none">
                          <CardContent className="px-5 py-4">
                              <div className="flex justify-between">
                                  <div>Kitchen Renovation</div>
                                  <div>RM900/mo</div>
                              </div>
                              <div className="flex justify-between text-xs text-gray-500">
                                  <div>Personal Loan</div>
                                  <div>4.40% p.a.</div>
                              </div>
                          </CardContent>
                      </Card>
                      <Card className="shadow-none">
                          <CardContent className="px-5 py-4">
                              <div className="flex justify-between">
                                  <div>PTPTN Anak 1</div>
                                  <div>RM679/mo</div>
                              </div>
                              <div className="flex justify-between text-xs text-gray-500">
                                  <div>Education Loan</div>
                                  <div>1.00%</div>
                              </div>
                          </CardContent>
                      </Card>
                      <Card className="shadow-none">
                          <CardContent className="px-5 py-4">
                              <div className="flex justify-between">
                                  <div>PTPTN Anak 2</div>
                                  <div>RM549/mo</div>
                              </div>
                              <div className="flex justify-between text-xs text-gray-500">
                                  <div>Education Loan</div>
                                  <div>1.00%</div>
                              </div>
                          </CardContent>
                      </Card>
                      <Card className="shadow-none">
                          <CardContent className="px-5 py-4">
                              <div className="flex justify-between">
                                  <div>LG Puricare</div>
                                  <div>RM160/mo</div>
                              </div>
                              <div className="flex justify-between text-xs text-gray-500">
                                  <div>Personal Loan</div>
                                  <div>0.00%</div>
                              </div>
                          </CardContent>
                      </Card>
                  </div>
                  <div>
                      <Button className="w-full font-semibold bg-blue-700 hover:bg-blue-700/80" size="lg">Suggest Repayment Strategies</Button>
                  </div>
              </div>
          </div>
          <div className="flex flex-col gap-6">
              <div className="text-3xl font-bold">Suggested Strategies</div>
              <div className="flex flex-col gap-3.5">
                  <div className="font-semibold">Choose 1 strategy</div>
                  <div className="flex flex-col gap-4">
                      <Button variant="outline" className="justify-start py-6 px-4 gap-4 [&_svg]:size-5">
                          <PercentIcon className="text-blue-700"/> Minimize Interest <CrownIcon/>
                      </Button>
                      <Button variant="outline" className="justify-start py-6 px-4 gap-4 [&_svg]:size-5">
                          <MailWarningIcon className="text-blue-700"/> Avoid Penalties
                      </Button>
                      <Button variant="outline" className="justify-start py-6 px-4 gap-4 [&_svg]:size-5">
                          <ChartNoAxesCombinedIcon className="text-blue-700"/> Free Up Cash Flow
                      </Button>
                  </div>
              </div>
          </div>
          <div className="flex flex-col gap-6">
              <div className="text-3xl font-bold">Debt Timeline</div>
              <div className="flex flex-col gap-2">
                  <div className="font-semibold text-gray-500">Nov 2024</div>
                  <div className="flex flex-col gap-2">
                      <div className="flex gap-4">
                          <div className="font-medium text-lg">1</div>
                          <div className="flex-1">
                              <div className="flex justify-between font-medium text-lg">
                                  <div>Proton Saga</div>
                                  <div>1,300.00</div>
                              </div>
                              <div className="flex justify-between text-xs text-gray-500">
                                  <div>3.40% p.a.</div>
                                  <div>3.68</div>
                              </div>
                          </div>
                      </div>
                      <div className="flex gap-2.5">
                          <div className="font-medium text-lg">2</div>
                          <div className="flex-1">
                              <div className="flex justify-between font-medium">
                                  <div>Kitchen Renovation</div>
                                  <div>900.00</div>
                              </div>
                              <div className="flex justify-between text-xs text-gray-500">
                                  <div>4.40% p.a.</div>
                                  <div>3.30</div>
                              </div>
                          </div>
                      </div>
                      <div className="flex gap-2.5">
                          <div className="font-medium text-lg">3</div>
                          <div className="flex-1">
                              <div className="flex justify-between font-medium">
                                  <div>Maju Apartment</div>
                                  <div>1,100.00</div>
                              </div>
                              <div className="flex justify-between text-xs text-gray-500">
                                  <div>2.88% p.a.</div>
                                  <div>2.64</div>
                              </div>
                          </div>
                      </div>
                      <div className="flex gap-2.5">
                          <div className="font-medium text-lg">4</div>
                          <div className="flex-1">
                              <div className="flex justify-between font-medium">
                                  <div>PTPTN Anak 1</div>
                                  <div>679.00</div>
                              </div>
                              <div className="flex justify-between text-xs text-gray-500">
                                  <div>1.00% p.a.</div>
                                  <div>0.57</div>
                              </div>
                          </div>
                      </div>
                      <div className="flex gap-2.5">
                          <div className="font-medium text-lg">5</div>
                          <div className="flex-1">
                              <div className="flex justify-between font-medium">
                                  <div>PTPTN Anak 2</div>
                                  <div>549.00</div>
                              </div>
                              <div className="flex justify-between text-xs text-gray-500">
                                  <div>1.00% p.a.</div>
                                  <div>0.46</div>
                              </div>
                          </div>
                      </div>
                      <div className="flex gap-2.5">
                          <div className="font-medium text-lg">6</div>
                          <div className="flex-1">
                              <div className="flex justify-between font-medium">
                                  <div>LG Puricare</div>
                                  <div>160.00</div>
                              </div>
                              <div className="flex justify-between text-xs text-gray-500">
                                  <div>0.00% p.a.</div>
                                  <div>0.00</div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="flex flex-col gap-3.5">
                  <div className="font-semibold">Expected Debt Clearance</div>
                  <div className="mx-4">
                      <ul className="list-disc list-outside text-gray-500">
                          <li>LG Puricare debt completes on Jan 2025</li>
                          <li>PTPTN Anak 1, PTPTN Anak 2 and Kitchen Renovation debt completes on March 2025</li>
                          <li>Proton Saga debt completes on November 2025</li>
                          <li>Maju Apartment debt completes on December 2025</li>
                      </ul>
                  </div>
              </div>
              <div>
                  <Button className="w-full font-semibold bg-blue-700 hover:bg-blue-700/80" size="lg">Complete</Button>
              </div>
          </div>
      </div>
  );
}
