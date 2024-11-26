"use client"

import {Card, CardContent} from "@/components/ui/card";
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";
import {Area, AreaChart, CartesianGrid, Label, Pie, PieChart, XAxis} from "recharts";
import {Progress} from "@/components/ui/progress";
import {PencilIcon} from "lucide-react";
import {Button} from "@/components/ui/button";

const chart1Data = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
]
const chart1Config = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

const chart2Data = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 190, fill: "var(--color-other)" },
]
const chart2Config = {
    visitors: {
        label: "Visitors",
    },
    chrome: {
        label: "Chrome",
        color: "hsl(var(--chart-1))",
    },
    safari: {
        label: "Safari",
        color: "hsl(var(--chart-2))",
    },
    firefox: {
        label: "Firefox",
        color: "hsl(var(--chart-3))",
    },
    edge: {
        label: "Edge",
        color: "hsl(var(--chart-4))",
    },
    other: {
        label: "Other",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig

export default function Index() {
  return (
      <div className="min-h-screen flex flex-col px-6 py-10 gap-6">
          <div className="text-3xl font-bold">Welcome, <span className="text-blue-700">Ahmad Iskandar</span></div>
          <div className="flex flex-col gap-5">
              <Card className="shadow-none">
                  <CardContent className="px-5 py-4">
                      <div className="flex flex-col gap-3">
                          <div className="font-semibold">Total Asset</div>
                          <div className="flex flex-col gap-1">
                              <div className="font-semibold text-4xl">RM3,356.21</div>
                              <div className="flex items-center text-red-600">
                                  <div className="flex-1">RM800 kept from debt repayment</div>
                                  <div><Button className="px-2" variant="ghost"><PencilIcon /></Button></div>
                              </div>
                              <div className="flex overflow-hidden rounded-full h-3">
                                  <div className="bg-blue-700 w-[60%]"></div>
                                  <div className="bg-blue-300 w-[40%]"></div>
                              </div>
                              <div className="flex flex-wrap items-center text-xs pt-2 gap-x-5 gap-y-2">
                                  <div className="flex items-center gap-2">
                                      <div className="h-2 w-2 rounded-full bg-blue-700"></div>
                                      <div className="text-zinc-500">Maybank</div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                      <div className="h-2 w-2 rounded-full bg-blue-300"></div>
                                      <div className="text-zinc-500">Touch n’ Go e-Wallet</div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </CardContent>
              </Card>
              <Card className="shadow-none">
                  <CardContent className="px-5 py-4">
                      <div className="flex flex-col gap-3">
                          <div className="font-semibold">Debt Repayment Progress</div>
                          <div className="flex flex-col gap-3">
                              <div className="font-semibold text-4xl">
                                  <span className="text-blue-700">34%</span> left
                              </div>
                              <div className="flex flex-col text-zinc-500 gap-2">
                                  <div className="flex items-center gap-5">
                                      <div className="w-1/2">Proton Saga</div>
                                      <div className="flex-1"><Progress value={60} className="bg-blue-700/20 *:bg-blue-700"/></div>
                                  </div>
                                  <div className="flex items-center gap-5">
                                      <div className="w-1/2">Kitchen Renovation</div>
                                      <div className="flex-1"><Progress value={75} className="bg-blue-700/20 *:bg-blue-700"/></div>
                                  </div>
                                  <div className="flex items-center gap-5">
                                      <div className="w-1/2">Maju Apartment</div>
                                      <div className="flex-1"><Progress value={50} className="bg-blue-700/20 *:bg-blue-700"/></div>
                                  </div>
                                  <div className="flex items-center gap-5">
                                      <div className="w-1/2">PTPTN Anak 1</div>
                                      <div className="flex-1"><Progress value={70} className="bg-blue-700/20 *:bg-blue-700"/></div>
                                  </div>
                                  <div className="flex items-center gap-5">
                                      <div className="w-1/2">PTPTN Anak 2</div>
                                      <div className="flex-1"><Progress value={70} className="bg-blue-700/20 *:bg-blue-700"/></div>
                                  </div>
                                  <div className="flex items-center gap-5">
                                      <div className="w-1/2">LG Puricare</div>
                                      <div className="flex-1"><Progress value={80} className="bg-blue-700/20 *:bg-blue-700"/></div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </CardContent>
              </Card>
              <Card className="shadow-none">
                  <CardContent className="px-5 py-4">
                      <div className="flex flex-col gap-6">
                          <div className="font-semibold">Debt vs Asset by Month</div>
                          <div>
                              <ChartContainer config={chart1Config}>
                                  <AreaChart
                                      accessibilityLayer
                                      data={chart1Data}
                                      margin={{
                                          left: 12,
                                          right: 12,
                                      }}
                                  >
                                      <CartesianGrid vertical={false} />
                                      <XAxis
                                          dataKey="month"
                                          tickLine={false}
                                          axisLine={false}
                                          tickMargin={8}
                                          tickFormatter={(value) => value.slice(0, 3)}
                                      />
                                      <ChartTooltip
                                          cursor={false}
                                          content={<ChartTooltipContent indicator="dot" />}
                                      />
                                      <Area
                                          dataKey="mobile"
                                          type="natural"
                                          fill="var(--color-mobile)"
                                          fillOpacity={0.4}
                                          stroke="var(--color-mobile)"
                                          stackId="a"
                                      />
                                      <Area
                                          dataKey="desktop"
                                          type="natural"
                                          fill="var(--color-desktop)"
                                          fillOpacity={0.4}
                                          stroke="var(--color-desktop)"
                                          stackId="a"
                                      />
                                  </AreaChart>
                              </ChartContainer>
                          </div>
                      </div>
                  </CardContent>
              </Card>
              <Card className="shadow-none">
                  <CardContent className="px-5 py-4">
                      <div>
                          <div className="font-semibold">Debt Ratios</div>
                          <div>
                              <ChartContainer
                                  config={chart2Config}
                                  className="mx-auto aspect-square max-h-[250px]"
                              >
                                  <PieChart>
                                      <ChartTooltip
                                          cursor={false}
                                          content={<ChartTooltipContent hideLabel/>}
                                      />
                                      <Pie
                                          data={chart2Data}
                                          dataKey="visitors"
                                          nameKey="browser"
                                          innerRadius={60}
                                          strokeWidth={5}
                                      >
                                          <Label
                                              content={({viewBox}) => {
                                                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                      return (
                                                          <text
                                                              x={viewBox.cx}
                                                              y={viewBox.cy}
                                                              textAnchor="middle"
                                                              dominantBaseline="middle"
                                                          >
                                                              <tspan
                                                                  x={viewBox.cx}
                                                                  y={viewBox.cy}
                                                                  className="fill-foreground text-xl font-medium"
                                                              >
                                                                  RM 3,150
                                                              </tspan>
                                                              <tspan
                                                                  x={viewBox.cx}
                                                                  y={(viewBox.cy || 0) + 20}
                                                                  className="fill-muted-foreground text-xs"
                                                              >
                                                                  Total Debts
                                                              </tspan>
                                                          </text>
                                                      )
                                                  }
                                              }}
                                          />
                                      </Pie>
                                  </PieChart>
                              </ChartContainer>
                          </div>
                          <div className="flex flex-wrap items-center justify-center text-xs pt-2 gap-x-5 gap-y-2">
                              <div className="flex items-center gap-2">
                                  <div className="h-2 w-2 rounded-full bg-chart-1"></div>
                                  <div className="text-zinc-500">Personal Loans</div>
                              </div>
                              <div className="flex items-center gap-2">
                                  <div className="h-2 w-2 rounded-full bg-chart-2"></div>
                                  <div className="text-zinc-500">Education Loans</div>
                              </div>
                              <div className="flex items-center gap-2">
                                  <div className="h-2 w-2 rounded-full bg-chart-3"></div>
                                  <div className="text-zinc-500">Housing Loans</div>
                              </div>
                              <div className="flex items-center gap-2">
                                  <div className="h-2 w-2 rounded-full bg-chart-4"></div>
                                  <div className="text-zinc-500">Vehicle Loans</div>
                              </div>
                              <div className="flex items-center gap-2">
                                  <div className="h-2 w-2 rounded-full bg-chart-5"></div>
                                  <div className="text-zinc-500">Credit Card Bills</div>
                              </div>
                          </div>
                      </div>
                  </CardContent>
              </Card>
          </div>
      </div>
  );
}
