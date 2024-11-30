"use client"

import app from "@/components/firebase";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { useSearchParams } from "next/navigation";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuRadioGroup, 
    DropdownMenuRadioItem, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import {
    ArrowUpDown, 
    ChartNoAxesCombinedIcon,
    CrownIcon,
    MailWarningIcon,
    PercentIcon
} from "lucide-react";

// Define the strategy data
const strategies = [
    {
        name: 'avalancbe',
        label: 'Minimize Interest',
        icon: <PercentIcon className="text-blue-700" />,
        additionalIcon: <CrownIcon />
    },
    {
        name: 'avoid-penalties',
        label: 'Avoid Penalties',
        icon: <MailWarningIcon className="text-blue-700" />
    },
    {
        name: 'snowball',
        label: 'Snowball Method',
        icon: <ChartNoAxesCombinedIcon className="text-blue-700" />
    }
];

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

interface DebtDoc {
    installment: number;
    interest_pct: number;
    name: string;
    principal: number;
    remaining: number;
    term_month: number;
    type: string;
}

export default function Index() {

    const db = getFirestore(app);
    const [debtSummary, setDebtSummary] = useState<DebtDoc[]>([]);
    const [sortBy, setSortBy] = useState<string>("rate");
    const [sortOrder, setSortOrder] = useState<string>("asc");

    const fetchDebtData = async () => {
        const debtCollection = collection(db, "debt");
        const debtSnapshot = await getDocs(debtCollection);
        const debtData: DebtDoc[] = debtSnapshot.docs.map((doc) =>
            doc.data() as DebtDoc
        );

        setDebtSummary(debtData);
    };

    useEffect(() => {
        fetchDebtData();
    }, []);

    const sortedDebtSummary = debtSummary.sort((a, b) => {
        let comparison = 0;

        // Compare based on the selected criteria
        if (sortBy === "rate") {
            comparison = a.interest_pct - b.interest_pct;
        } else if (sortBy === "monthly") {
            comparison = a.installment - b.installment;
        } else if (sortBy === "maxTenure") {
            comparison = a.term_month - b.term_month;
        }

        // Apply sorting order
        return sortOrder === "asc" ? comparison : -comparison;
    });

    const searchParams = useSearchParams()

    const step = searchParams.get('step')

    const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);

    const handleButtonClick = (strategy: string) => {
        setSelectedStrategy(strategy);
    };

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
                                                <CartesianGrid vertical={false} />
                                                <XAxis
                                                    dataKey="month"
                                                    tickLine={false}
                                                    axisLine={false}
                                                    tickMargin={8}
                                                    tickFormatter={(value) => value.slice(0, 3)}
                                                />
                                                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
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
                        <div>
                            <Link href="/repayment?step=2">
                                <Button className="w-full font-semibold bg-blue-700 hover:bg-blue-700/80" size="lg">Suggest
                                    Repayment Strategies</Button>
                            </Link>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="font-semibold">All Debts</div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline"><ArrowUpDown /> Debt amount</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-36">
                                    <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                                        <DropdownMenuRadioItem value="rate">Interest Rate</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="monthly">Installment</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="maxTenure">Max Tenure</DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuRadioGroup value={sortOrder} onValueChange={setSortOrder}>
                                        <DropdownMenuRadioItem value="asc">Ascending</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="desc">Descending</DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className="flex flex-col gap-4">
                            {sortedDebtSummary.map((elem, index) => (
                                <Card key={index} className="shadow-none">
                                    <CardContent className="px-5 py-4">
                                        <div className="flex justify-between">
                                            <div>{elem.name}</div>
                                            <div>RM{elem.installment}/mo</div>
                                        </div>
                                        <div className="flex justify-between text-xs text-zinc-500">
                                            <div>{elem.type}</div>
                                            <div>{elem.interest_pct}% p.a.</div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div> : null
            }
            {
                step === "2" ? <div className="flex flex-col gap-6">
                    <div className="text-3xl font-bold">Suggested Strategies</div>
                    <div className="flex flex-col gap-3.5">
                        <div className="font-semibold">Choose 1 strategy</div>
                        <div className="flex flex-col gap-4">
                            {strategies.map(({ name, label, icon, additionalIcon }) => (
                                <Button
                                    key={name}
                                    variant="outline"
                                    className={`w-full justify-start py-6 px-4 gap-4 [&_svg]:size-5 ${selectedStrategy === name ? 'border border-blue-700' : ''}`}
                                    onClick={() => handleButtonClick(name)}
                                >
                                    {icon} {label} {additionalIcon}
                                </Button>
                            ))}
                        </div>
                    </div>
                    {selectedStrategy && (
                        <>
                            <div className="flex">
                                <div className="flex-1 flex flex-col gap-1.5">
                                    <div className="text-sm">Auto Debt Repayment</div>
                                    <div className="text-xs text-zinc-500">Performs repayment based on a set repayment strategy, allowing for seamless debt repayment with lower loss.
                                    </div>
                                </div>
                                <div>
                                    <Switch className="data-[state=checked]:bg-blue-700" />
                                </div>
                            </div>
                            <Link href="/repayment?step=3">
                                <Button className="w-full font-semibold bg-blue-700 hover:bg-blue-700/80" size="lg">
                                    Continue
                                </Button>
                            </Link>
                        </>
                    )}
                </div> : null
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
