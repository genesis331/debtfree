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
      <div className="min-h-screen flex flex-col">
          <div>
              <div>Debt Repayment</div>
              <div>
                  <Card>
                      <CardContent className="p-0">
                          <div>
                              <div>Financial Forecasting</div>
                              <div></div>
                          </div>
                      </CardContent>
                  </Card>
              </div>
              <div>
                  <div className="flex justify-between">
                      <div>All Debts</div>
                      <div>
                          <Button variant="ghost">
                              <SortDescIcon/> Debt amount
                          </Button>
                      </div>
                  </div>
                  <div className="flex flex-col">
                      <Card>
                          <CardContent className="p-0">
                              <div className="flex justify-between">
                                  <div>Proton Saga</div>
                                  <div>RM1,300/mo</div>
                              </div>
                              <div className="flex justify-between">
                                  <div>Vehicle Loan</div>
                                  <div>3.40% p.a.</div>
                              </div>
                          </CardContent>
                      </Card>
                      <Card>
                          <CardContent className="p-0">
                              <div className="flex justify-between">
                                  <div>Maju Apartment</div>
                                  <div>RM1,100/mo</div>
                              </div>
                              <div className="flex justify-between">
                                  <div>Housing Loan</div>
                                  <div>2.88% p.a.</div>
                              </div>
                          </CardContent>
                      </Card>
                      <Card>
                          <CardContent className="p-0">
                              <div className="flex justify-between">
                                  <div>Kitchen Renovation</div>
                                  <div>RM900/mo</div>
                              </div>
                              <div className="flex justify-between">
                                  <div>Personal Loan</div>
                                  <div>4.40% p.a.</div>
                              </div>
                          </CardContent>
                      </Card>
                      <Card>
                          <CardContent className="p-0">
                              <div className="flex justify-between">
                                  <div>PTPTN Anak 1</div>
                                  <div>RM679/mo</div>
                              </div>
                              <div className="flex justify-between">
                                  <div>Education Loan</div>
                                  <div>1.00%</div>
                              </div>
                          </CardContent>
                      </Card>
                      <Card>
                          <CardContent className="p-0">
                              <div className="flex justify-between">
                                  <div>PTPTN Anak 2</div>
                                  <div>RM549/mo</div>
                              </div>
                              <div className="flex justify-between">
                                  <div>Education Loan</div>
                                  <div>1.00%</div>
                              </div>
                          </CardContent>
                      </Card>
                      <Card>
                          <CardContent className="p-0">
                              <div className="flex justify-between">
                                  <div>LG Puricare</div>
                                  <div>RM160/mo</div>
                              </div>
                              <div className="flex justify-between">
                                  <div>Personal Loan</div>
                                  <div>0.00%</div>
                              </div>
                          </CardContent>
                      </Card>
                  </div>
                  <div>
                      <Button>Suggest Repayment Strategies</Button>
                  </div>
              </div>
          </div>
          <div>
              <div>Suggested Strategies</div>
              <div>
                  <div>Choose 1 strategy</div>
                  <div className="flex flex-col">
                      <Button>
                          <PercentIcon/> Minimize Interest <CrownIcon/>
                      </Button>
                      <Button>
                          <MailWarningIcon/> Avoid Penalties
                      </Button>
                      <Button>
                          <ChartNoAxesCombinedIcon/> Free Up Cash Flow
                      </Button>
                  </div>
              </div>
          </div>
          <div>
              <div>Debt Timeline</div>
              <div>
                  <div>Nov 2024</div>
                  <div>
                      <div className="flex">
                          <div>1</div>
                          <div className="flex-1">
                              <div className="flex justify-between">
                                  <div>Proton Saga</div>
                                  <div>RM1,300/mo</div>
                              </div>
                              <div className="flex justify-between">
                                  <div>Vehicle Loan</div>
                                  <div>3.40% p.a.</div>
                              </div>
                          </div>
                      </div>
                      <div className="flex">
                          <div>2</div>
                          <div className="flex-1">
                              <div className="flex justify-between">
                                  <div>Maju Apartment</div>
                                  <div>RM1,100/mo</div>
                              </div>
                              <div className="flex justify-between">
                                  <div>Housing Loan</div>
                                  <div>2.88% p.a.</div>
                              </div>
                          </div>
                      </div>
                      <div className="flex">
                          <div>3</div>
                          <div className="flex-1">
                              <div className="flex justify-between">
                                  <div>Kitchen Renovation</div>
                                  <div>RM900/mo</div>
                              </div>
                              <div className="flex justify-between">
                                  <div>Personal Loan</div>
                                  <div>4.40% p.a.</div>
                              </div>
                          </div>
                      </div>
                      <div className="flex">
                          <div>4</div>
                          <div className="flex-1">
                              <div className="flex justify-between">
                                  <div>PTPTN Anak 1</div>
                                  <div>RM679/mo</div>
                              </div>
                              <div className="flex justify-between">
                                  <div>Education Loan</div>
                                  <div>1.00%</div>
                              </div>
                          </div>
                      </div>
                      <div className="flex">
                          <div>5</div>
                          <div className="flex-1">
                              <div className="flex justify-between">
                                  <div>PTPTN Anak 2</div>
                                  <div>RM549/mo</div>
                              </div>
                              <div className="flex justify-between">
                                  <div>Education Loan</div>
                                  <div>1.00%</div>
                              </div>
                          </div>
                      </div>
                      <div className="flex">
                          <div>6</div>
                          <div className="flex-1">
                              <div className="flex justify-between">
                                  <div>LG Puricare</div>
                                  <div>RM160/mo</div>
                              </div>
                              <div className="flex justify-between">
                                  <div>Personal Loan</div>
                                  <div>0.00%</div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div>
              <div>Expected Debt Clearance</div>
                  <div>
                      <ul className="list-disc list-inside">
                          <li>LG Puricare debt completes on Jan 2025</li>
                          <li>PTPTN Anak 1, PTPTN Anak 2 and Kitchen Renovation debt completes on March 2025</li>
                          <li>Proton Saga debt completes on November 2025</li>
                          <li>Maju Apartment debt completes on December 2025</li>
                      </ul>
                  </div>
              </div>
              <div>
                  <Button>Complete</Button>
              </div>
          </div>
      </div>
  );
}
