"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, Label, Pie, PieChart, Sector, XAxis } from "recharts";
import { Progress } from "@/components/ui/progress";
import { BanknoteIcon, CandlestickChartIcon, DollarSignIcon, PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import app from "@/components/firebase";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

interface FinanceDoc {
    month: { seconds: number };
    sources: Array<{
        data: {
            expense: number;
            income: number;
        };
        source: string;
    }>;
}

interface Source {
    source: string;
    amt: number;
}

interface DebtDoc {
    installment: number;
    interest_pct: number;
    name: string;
    principal: number;
    remaining: number;
    term_month: number;
    type: string;
}

interface PieChartData {
    type: string;
    amount: number;
    fill: string;
}

export default function Index() {

    const db = getFirestore(app);
    const [assetSummary, setAssetSummary] = useState<{ [key: string]: number }>({});
    const [sourceSummary, setSourceSummary] = useState<Source[]>([]);
    const [debtSummary, setDebtSummary] = useState<DebtDoc[]>([]);

    const fetchFinanceData = async () => {
        const financeCollection = collection(db, "finance");
        const financeSnapshot = await getDocs(financeCollection);
        const financeData: FinanceDoc[] = financeSnapshot.docs.map((doc) =>
            doc.data() as FinanceDoc
        );

        const monthSummaryArray: { month: string; value: number }[] = [];

        financeData.forEach((doc) => {

            // Convert Firestore Timestamp to a JavaScript Date
            const oldDate = new Date(doc.month.seconds * 1000);
            const date = new Date(oldDate.getTime() + 8 * 60 * 60 * 1000);

            // Preserve the original date as a string for ordering (e.g., 2024-08)
            const originalMonthOrder = date.toISOString().slice(0, 7); // YYYY-MM

            // Calculate total net income (income - expense) for the month
            const netResult = doc.sources.reduce((sum, source) => {
                return sum + (source.data.income - source.data.expense);
            }, 0);

            // Push data with original order preserved
            monthSummaryArray.push({ month: originalMonthOrder, value: netResult });

            if (originalMonthOrder === '2024-11' ) {// new Date().toISOString().slice(0, 7)) {
                const sourceSummary = doc.sources.map((src) => ({
                    source: src.source,
                    amt: src.data.income - src.data.expense
                }));
                setSourceSummary(sourceSummary);
            }
        });

        setAssetSummary(
            monthSummaryArray.reduce((acc, { month, value }) => {
                acc[month] = value;
                return acc;
            }, {} as { [key: string]: number })
        );
    };

    const fetchDebtData = async () => {
        const debtCollection = collection(db, "debt");
        const debtSnapshot = await getDocs(debtCollection);
        const debtData: DebtDoc[] = debtSnapshot.docs.map((doc) =>
            doc.data() as DebtDoc
        );

        setDebtSummary(debtData);
    };

    useEffect(() => {
        fetchFinanceData();
        fetchDebtData();
    }, []);

    // Total Asset
    const totalAsset = sourceSummary.reduce((sum, asset) => sum + asset.amt, 0);

    // Debt Payment Progress
    const debtProgress = debtSummary.map((debt) => ({
        name: debt.name,
        progress: (1 - (debt.remaining / debt.principal)) * 100
    }))

    const totalPrincipal = debtSummary.reduce((sum, debt) => sum + debt.principal, 0);
    const totalRemaining = debtSummary.reduce((sum, debt) => sum + debt.remaining, 0);
    const totalDebtProgress = ((totalRemaining / totalPrincipal) * 100).toFixed(2);
    const totalDebt = debtSummary.reduce((sum, debt) => sum + debt.installment, 0);

    // // Debt vs Asset by Month
    // const debtAssetChartData = Object.entries(assetSummary)
    //     .sort(([a], [b]) => (a < b ? -1 : 1)) // Sort by the original month order
    //     .map(([month, value]) => ({
    //         month: new Date(month + "-01").toLocaleString("default", { month: "short" }), // Convert back to month name
    //         asset: value,
    //         debt: totalDebt,
    //     }));
    // const debtAssetChartConfig = {
    //     debt: {
    //         label: "Debt",
    //         color: "hsl(var(--chart-1))",
    //     },
    //     asset: {
    //         label: "Asset",
    //         color: "hsl(var(--chart-2))",
    //     },
    // } satisfies ChartConfig

    // Debt Ratio
    const pieChartData = debtSummary.reduce<PieChartData[]>((acc, debt) => {

        // Check if the type already exists in the accumulator
        const existingDebt = acc.find(item => item.type.split(' ').join('_') === debt.type.split(' ').join('_'));

        if (existingDebt) {
            existingDebt.amount += debt.remaining;
        } else {
            acc.push({
                type: debt.type.split(' ').join('_'),
                amount: debt.remaining,
                fill: `var(--color-${debt.type.split(' ').join('_')})`
            });
        }

        return acc;
    }, []);

    let pieChartConfig: { [key: string]: { label: string; color?: string } } = {} satisfies ChartConfig;

    for (let index = 0; index < pieChartData.length; index++) {
        const { type } = pieChartData[index];
        pieChartConfig[type] = {
            label: type.split('_').join(' '),  // Convert underscores to spaces in the label
            color: `hsl(var(--chart-${index + 1}))`,  // Assign a color based on index
        };
    }

    // Add the "Remaining Amount" to the config
    pieChartConfig["amount"] = {
        label: "Remaining Amount"
    };

    // Calculate the remaining amount after paying debts
    const remainingAmount = Math.max(totalAsset - totalDebt, 0)

    // // Chart data now includes remaining amount
    // const chartData = [
    //     ...debtSummary.map((debt) => ({
    //         category: debt.type,
    //         value: debt.installment,
    //         fill: "var(--color-" + debt.type.replace(/\s+/g, "").toLowerCase() + ")", // Dynamic color based on category
    //     })),
    //     {
    //         category: "Remaining",
    //         value: remainingAmount,
    //         fill: "var(--color-remaining)", // Color for remaining amount
    //     },
    // ]

    // Step 1: Aggregate values by category (debt.type)
    const aggregatedData = debtSummary.reduce((acc, debt) => {
        // Clean the category name to match the dynamic color convention
        const category = debt.type.replace(/\s+/g, "").toLowerCase();

        // Sum the values for each category
        if (!acc[category]) {
            acc[category] = 0;
        }
        acc[category] += debt.installment;

        return acc;
    }, {} as { [key: string]: number }); // Accumulator with category as key and sum of installments as value

    // Step 2: Prepare chart data by mapping the aggregated values to chart format
    const chartData = [
        ...Object.entries(aggregatedData).map(([category, value]) => ({
            category: category,
            value: value,
            fill: `var(--color-${category})`, // Dynamic color based on category
        })),
        // Step 3: Append the "Remaining" category
        {
            category: "Remaining",
            value: remainingAmount,
            fill: "var(--color-remaining)", // Color for remaining amount
        },
    ];

    const chartConfig = {
        homeloan: {
            label: "Home Loan",
            color: "hsl(var(--chart-1))",
        },
        vehicleloan: {
            label: "Vehicle Loan",
            color: "hsl(var(--chart-2))",
        },
        personalloan: {
            label: "Personal Loan",
            color: "hsl(var(--chart-3))",
        },
        educationloan: {
            label: "Education Loan",
            color: "hsl(var(--chart-4))",
        },
        creditcard: {
            label: "Credit Card",
            color: "hsl(var(--chart-5))",
        },
        remaining: {
            label: "Remaining",
            color: "hsl(var(--chart-8))",
        },
        housingloan: {
            label: "Housing Loan",
            color: "hsl(var(--chart-7))",
        },
        creditcardbills: {
            label: "Credit Card Bills",
            color: "hsl(var(--chart-6))",
        },
    } satisfies ChartConfig

    return (
        <div className="min-h-screen flex flex-col px-6 pb-10 gap-6">
            {/* <div className="text-3xl font-bold">Welcome, <span className="text-blue-700">Ahmad Iskandar</span></div> */}
            <div className="flex flex-col gap-5">
                <Card className="flex flex-col shadow-none">
                    <CardHeader className="items-center pb-0">
                        <CardTitle>Debt and Remaining Amount</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-chart-8"></div>
                                <div className="text-zinc-500">Remaining RM{remainingAmount.toFixed(2)}</div>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0">
                        <ChartContainer
                            config={chartConfig}
                            className="mx-auto aspect-square max-h-[250px]"
                        >
                            <PieChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie
                                    data={chartData}
                                    dataKey="value"
                                    nameKey="category"
                                    innerRadius={70}
                                    strokeWidth={5}
                                    activeIndex={chartData.length - 1}
                                    activeShape={({
                                        outerRadius = 0,
                                        ...props
                                    }: PieSectorDataItem) => (
                                        <g>
                                            <Sector {...props} outerRadius={outerRadius + 10} />
                                            <Sector
                                                {...props}
                                                outerRadius={outerRadius + 25}
                                                innerRadius={outerRadius + 12}
                                            />
                                        </g>
                                    )}
                                >
                                    <Label
                                        content={({ viewBox }) => {
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
                                                            className="fill-foreground text-3xl font-bold"
                                                        >
                                                            {totalAsset.toLocaleString()}
                                                        </tspan>
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={(viewBox.cy || 0) + 24}
                                                            className="fill-muted-foreground"
                                                        >
                                                            Income (RM)
                                                        </tspan>
                                                    </text>
                                                )
                                            }
                                        }}
                                    />
                                </Pie>
                            </PieChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="justify-center">
                        <Link href="/settings">
                            <Button className="px-2 flex items-center text-red-600" variant="ghost">
                                <div className="flex-1">RM800 kept from debt repayment</div>
                                <PencilIcon/>
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
                <div className="flex gap-3">
                    <div className="flex-1">
                        <Link href="/repayment">
                            <Button className="[&_svg]:size-9 h-24 px-0 py-0 w-full flex-col font-semibold gap-1" variant="outline">
                                <DollarSignIcon/>
                                Repayment
                            </Button>
                        </Link>
                    </div>
                    <div className="flex-1">
                        <Link href="/refinancing">
                            <Button className="[&_svg]:size-9 h-24 px-0 py-0 w-full flex-col font-semibold gap-1" variant="outline">
                                <BanknoteIcon/>
                                Refinancing
                            </Button>
                        </Link>
                    </div>
                    <div className="flex-1">
                        <Link href="/investment">
                            <Button className="[&_svg]:size-9 h-24 px-0 py-0 w-full flex-col font-semibold gap-1" variant="outline">
                                <CandlestickChartIcon/>
                                Investment
                            </Button>
                        </Link>
                    </div>
                </div>
                {/* <Card className="shadow-none">
                    <CardContent className="px-5 py-4">
                        <div className="flex flex-col gap-3">
                            <div className="font-semibold">Total Asset</div>
                            <div className="flex flex-col gap-1">
                                <div className="font-semibold text-4xl">RM{totalAsset.toFixed(2)}</div>
                                <div className="flex items-center text-red-600">
                                    <div className="flex-1">RM800 kept from debt repayment</div>
                                    <div>
                                        <Link href="/settings">
                                            <Button className="px-2" variant="ghost">
                                                <PencilIcon />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="flex overflow-hidden rounded-full h-3">
                                    {sourceSummary.length > 0 ? <>
                                        <div className="bg-blue-700"
                                            style={{ width: `${sourceSummary[0].amt / totalAsset * 100}%` }}></div>
                                        <div className="bg-blue-300"
                                            style={{ width: `${sourceSummary[1].amt / totalAsset * 100}%` }}></div>
                                    </> : null}
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
                </Card> */}
                <Card className="shadow-none">
                    <CardContent className="px-5 py-4">
                        <div className="flex flex-col gap-3">
                            <div className="font-semibold">Debt Repayment Progress</div>
                            <div className="flex flex-col gap-3">
                                <div className="font-semibold text-4xl">
                                    <span className="text-blue-700">{totalDebtProgress}%</span> left
                                </div>
                                <div className="flex flex-col text-zinc-500 gap-2">
                                    {debtProgress.map((debt, index) => (
                                        <div key={index} className="flex items-center gap-5">
                                            <div className="w-1/2">{debt.name}</div>
                                            <div className="flex-1"><Progress value={debt.progress}
                                                className="bg-blue-700/20 *:bg-blue-700" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                {/* <Card className="shadow-none">
                    <CardContent className="px-5 py-4">
                        <div className="flex flex-col gap-6">
                            <div className="font-semibold">Debt vs Asset by Month</div>
                            <div>
                                <ChartContainer config={debtAssetChartConfig}>
                                    <AreaChart
                                        accessibilityLayer
                                        data={debtAssetChartData}
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
                                        <defs>
                                            <linearGradient id="fillDebt" x1="0" y1="0" x2="0" y2="1">
                                                <stop
                                                    offset="5%"
                                                    stopColor="var(--color-debt)"
                                                    stopOpacity={0.8}
                                                />
                                                <stop
                                                    offset="95%"
                                                    stopColor="var(--color-debt)"
                                                    stopOpacity={0.1}
                                                />
                                            </linearGradient>
                                            <linearGradient id="fillAsset" x1="0" y1="0" x2="0" y2="1">
                                                <stop
                                                    offset="5%"
                                                    stopColor="var(--color-asset)"
                                                    stopOpacity={0.8}
                                                />
                                                <stop
                                                    offset="95%"
                                                    stopColor="var(--color-asset)"
                                                    stopOpacity={0.1}
                                                />
                                            </linearGradient>
                                        </defs>
                                        <Area
                                            dataKey="debt"
                                            type="natural"
                                            fill="var(--color-debt)"
                                            fillOpacity={0.4}
                                            stroke="var(--color-debt)"
                                        />
                                        <Area
                                            dataKey="asset"
                                            type="natural"
                                            fill="var(--color-asset)"
                                            fillOpacity={0.4}
                                            stroke="var(--color-asset)"
                                        />
                                    </AreaChart>
                                </ChartContainer>
                            </div>
                        </div>
                    </CardContent>
                </Card> */}
                <Card className="shadow-none">
                    <CardContent className="px-5 py-4">
                        <div>
                            <div className="font-semibold">Remaining Debt Ratios</div>
                            <div>
                                <ChartContainer
                                    config={pieChartConfig}
                                    className="mx-auto aspect-square max-h-[250px]"
                                >
                                    <PieChart>
                                        <ChartTooltip
                                            cursor={false}
                                            content={<ChartTooltipContent hideLabel />}
                                        />
                                        <Pie
                                            data={pieChartData}
                                            dataKey={"amount"}
                                            nameKey={"type"}
                                            innerRadius={70}
                                            strokeWidth={5}
                                        >
                                            <Label
                                                content={({ viewBox }) => {
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
                                                                    RM{totalRemaining.toFixed(2)}
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
