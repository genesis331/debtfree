"use client"

import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import SuggestedStrategies from "./suggest-strategy";
import {SortDescIcon} from "lucide-react";
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";
import {CartesianGrid, Line, LineChart, XAxis} from "recharts";
import {useSearchParams} from "next/navigation";
import Link from "next/link";

const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
]
const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

export default function Index() {
    const searchParams = useSearchParams()

    const step = searchParams.get('step')

  return (
      <div className="min-h-screen flex flex-col px-6 pb-10 gap-6">
          {
              !step || step === "1" ? <div className="flex flex-col gap-6">
                  <div className="text-3xl font-bold">Debt Repayment</div>
                  <div>
                      <Card className="shadow-none">
                          <CardContent className="px-5 py-4">
                              <div className="flex flex-col gap-6">
                                  <div className="font-semibold">Financial Forecasting</div>
                                  <div>
                                      <ChartContainer config={chartConfig}>
                                          <LineChart
                                              accessibilityLayer
                                              data={chartData}
                                              margin={{
                                                  left: 12,
                                                  right: 12,
                                              }}
                                          >
                                              <CartesianGrid vertical={false}/>
                                              <XAxis
                                                  dataKey="month"
                                                  tickLine={false}
                                                  axisLine={false}
                                                  tickMargin={8}
                                                  tickFormatter={(value) => value.slice(0, 3)}
                                              />
                                              <ChartTooltip cursor={false} content={<ChartTooltipContent/>}/>
                                              <Line
                                                  dataKey="desktop"
                                                  type="monotone"
                                                  stroke="var(--color-desktop)"
                                                  strokeWidth={2}
                                                  dot={false}
                                              />
                                              <Line
                                                  dataKey="mobile"
                                                  type="monotone"
                                                  stroke="var(--color-mobile)"
                                                  strokeWidth={2}
                                                  dot={false}
                                              />
                                          </LineChart>
                                      </ChartContainer>
                                  </div>
                                  <div className="flex flex-wrap items-center text-xs gap-x-5 gap-y-2">
                                      <div className="flex items-center gap-2">
                                          <div className="h-2 w-2 rounded-full bg-chart-2"></div>
                                          <div className="text-zinc-500">Income</div>
                                      </div>
                                      <div className="flex items-center gap-2">
                                          <div className="h-2 w-2 rounded-full bg-chart-1"></div>
                                          <div className="text-zinc-500">Expenses</div>
                                      </div>
                                  </div>
                              </div>
                          </CardContent>
                      </Card>
                  </div>
                  <div className="flex flex-col gap-3.5">
                      <div className="flex justify-between items-center">
                          <div className="font-semibold">All Debts</div>
                          <Button variant="ghost" className="px-0 py-0 h-min text-zinc-500">
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
                                  <div className="flex justify-between text-xs text-zinc-500">
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
                                  <div className="flex justify-between text-xs text-zinc-500">
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
                                  <div className="flex justify-between text-xs text-zinc-500">
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
                                  <div className="flex justify-between text-xs text-zinc-500">
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
                                  <div className="flex justify-between text-xs text-zinc-500">
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
                                  <div className="flex justify-between text-xs text-zinc-500">
                                      <div>Personal Loan</div>
                                      <div>0.00%</div>
                                  </div>
                              </CardContent>
                          </Card>
                      </div>
                      <div>
                          <Link href="/repayment?step=2">
                              <Button className="w-full font-semibold bg-blue-700 hover:bg-blue-700/80" size="lg">Suggest
                                  Repayment Strategies</Button>
                          </Link>
                      </div>
                  </div>
              </div> : null
          }
          {
              step === "2" ? <SuggestedStrategies /> : null
          }
          {
              step === "3" ? <div className="flex flex-col gap-6">
                  <div className="text-3xl font-bold">Debt Timeline</div>
                  <div className="flex flex-col gap-2">
                      <div className="font-semibold text-zinc-500">Nov 2024</div>
                      <div className="flex flex-col gap-2">
                          <div className="flex gap-4">
                              <div className="font-medium text-lg">1</div>
                              <div className="flex-1">
                                  <div className="flex justify-between font-medium text-lg">
                                      <div>Proton Saga</div>
                                      <div>1,300.00</div>
                                  </div>
                                  <div className="flex justify-between text-xs text-zinc-500">
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
                                  <div className="flex justify-between text-xs text-zinc-500">
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
                                  <div className="flex justify-between text-xs text-zinc-500">
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
                                  <div className="flex justify-between text-xs text-zinc-500">
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
                                  <div className="flex justify-between text-xs text-zinc-500">
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
                                  <div className="flex justify-between text-xs text-zinc-500">
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
                          <ul className="list-disc list-outside text-zinc-500">
                              <li>LG Puricare debt completes on Jan 2025</li>
                              <li>PTPTN Anak 1, PTPTN Anak 2 and Kitchen Renovation debt completes on March 2025</li>
                              <li>Proton Saga debt completes on November 2025</li>
                              <li>Maju Apartment debt completes on December 2025</li>
                          </ul>
                      </div>
                  </div>
                  <div>
                      <Link href="/repayment">
                          <Button className="w-full font-semibold bg-blue-700 hover:bg-blue-700/80"
                                  size="lg">Complete</Button>
                      </Link>
                  </div>
              </div> : null
          }
      </div>
  );
}
