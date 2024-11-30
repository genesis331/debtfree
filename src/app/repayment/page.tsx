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

// import ARIMA from 'arima';

// Define the strategy data
const strategies = [
    {
        name: 'avalanche',
        label: 'Debt Avalanche',
        desc: 'Pay highest interest debt first',
        icon: <PercentIcon className="text-blue-700" />,
        additionalIcon: <CrownIcon />
    },
    {
        name: 'snowball',
        label: 'Snowball Method',
        desc: 'Pay smallest remaining first',
        icon: <ChartNoAxesCombinedIcon className="text-blue-700" />
    },
    {
        name: 'penalties',
        label: 'Avoid Penalties',
        desc: '',
        icon: <MailWarningIcon className="text-blue-700" />
    },
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
        color: "hsl(var(--chart-8))",
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

export default function Index() {

    const db = getFirestore(app);
    const [debtSummary, setDebtSummary] = useState<DebtDoc[]>([]);
    const [incExpSummary, setIncExpSymmary] = useState<{ month: string, inc: number, exp: number }[]>([]);
    const [sortBy, setSortBy] = useState<string>("rate");
    const [sortOrder, setSortOrder] = useState<string>("asc");
    const searchParams = useSearchParams()
    const step = searchParams.get('step')

    const fetchDebtData = async () => {
        const debtCollection = collection(db, "debt");
        const debtSnapshot = await getDocs(debtCollection);
        const debtData: DebtDoc[] = debtSnapshot.docs.map((doc) =>
            doc.data() as DebtDoc
        );

        setDebtSummary(debtData);
    };

    const fetchFinanceData = async () => {

        const financeCollection = collection(db, "finance");
        const financeSnapshot = await getDocs(financeCollection);
        const financeData: FinanceDoc[] = financeSnapshot.docs.map((doc) =>
            doc.data() as FinanceDoc
        );

        const monthSummaryArray: { month: string; inc: number; exp: number }[] = [];

        financeData.forEach((doc) => {

            // Convert Firestore Timestamp to a JavaScript Date
            const oldDate = new Date(doc.month.seconds * 1000);
            const date = new Date(oldDate.getTime() + 8 * 60 * 60 * 1000);

            // Preserve the original date as a string for ordering (e.g., 2024-08)
            const originalMonthOrder = date.toISOString().slice(0, 7); // YYYY-MM

            const totalInc = doc.sources.reduce((sum, source) => {
                return sum + source.data.income;
            }, 0);

            const totalExp = doc.sources.reduce((sum, source) => {
                return sum + source.data.expense;
            }, 0);

            // Push data with original order preserved
            monthSummaryArray.push({ month: originalMonthOrder, inc: totalInc, exp: totalExp });
        });

        const sortedArr = [...monthSummaryArray].sort((a, b) => a.month.localeCompare(b.month))
        setIncExpSymmary(sortedArr);
    };

    useEffect(() => {
        fetchDebtData();
        fetchFinanceData()
    }, []);

    useEffect(() => {
        if (step !== "3") {
            fetchDebtData();
            fetchFinanceData()
        }
    }, [step]);

    const incArray = incExpSummary.map(item => item.inc);
    const expArray = incExpSummary.map(item => item.exp);

    // const sarima = new ARIMA({ p: 2, d: 1, q: 2, P: 1, D: 0, Q: 1, s: 6, verbose: false }).train(incArray)

    // const [pred, errors] = sarima.predict(6)

    // console.log('pred', pred);

    const sortedDebtSummary = [...debtSummary].sort((a, b) => {
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

    const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);
    const [debtAfterSort, setDebtAfterSort] = useState<DebtDoc[]>();
    const [repaymentResult, setRepaymentResult] = useState<{ name: string; month: string; }[]>();

    const handleButtonClick = (strategy: string) => {
        setSelectedStrategy(strategy);
        simulateDeptRepayment(strategy);
    };

    const now = new Date();
    let currentMonth = now.getMonth();
    let currentYear = now.getFullYear();

    // // // Helper function to sort loans based on strategy
    // // const sortLoans = () => {
    // //     // const strategies = {
    // //     //     'avalanche': (a: DebtDoc, b: DebtDoc) => b.interest_pct - a.interest_pct,
    // //     //     'snowball': (a: DebtDoc, b: DebtDoc) => a.remaining - b.remaining,
    // //     //     // penalty: (a, b) => a.penalty_pct - b.penalty_pct
    // //     // };
    // //     debtSummary.sort((a, b) => {
    // //         if (selectedStrategy === 'avalanche') {
    // //             return a.interest_pct - b.interest_pct;
    // //         } else {
    // //             return a.remaining - b.remaining;
    // //         }
    // //     });
    // //     setDebtSummary(debtSummary);
    // //     console.log(debtSummary);
    // // };

    // Helper function to handle loan repayment and update remaining amount
    const makeLoanPayment = (loan: DebtDoc) => {
        loan.remaining -= (loan.installment > loan.remaining) 
            ? loan.remaining 
            : (loan.installment - (loan.remaining * (loan.interest_pct / 1200)));

        if (loan.remaining === 0) {
            return { name: loan.name, month: `${currentMonth + 1}/${currentYear}` };
        }
        return null;
    };

    // Simulate debt repayment
    const simulateDeptRepayment = (strategy: string) => {
        const debtAfterStrategySort = [...debtSummary].sort((a, b) => {
            if (strategy === 'avalanche') {
                return b.interest_pct - a.interest_pct;
            } else {
                return a.remaining - b.remaining;
            }
        });
        console.log('debtsummary', debtAfterStrategySort);
        setDebtAfterSort(debtAfterStrategySort);
    };

    const rlySimulate = () => {
        
        const avg_cash_balance_per_month = 5000;
        let result = [];

        if (debtAfterSort) {
            let temp = [];
            for (let item of debtAfterSort) temp.push(item);
            while (temp.some(loan => loan.remaining > 0)) {
                let total_cash_balance = avg_cash_balance_per_month;
                for (let loan of temp) {
                    if (loan.remaining > 0 && total_cash_balance > 0) {
                        let payment = Math.min(loan.installment, loan.remaining);
                        total_cash_balance -= payment;
                        let paidResult = makeLoanPayment(loan);
                        if (paidResult) result.push(paidResult);
                    }
                }
                currentMonth = (currentMonth + 1) % 12;
                if (currentMonth === 0) {
                    currentYear += 1;
                }
            }
            console.log('result', result)
            setRepaymentResult(result);
        }
    }

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
                                            <div className="h-2 w-2 rounded-full bg-chart-8"></div>
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
                            {strategies.map(({ name, label, desc, icon, additionalIcon }) => (
                                <Button
                                    key={name}
                                    variant="outline"
                                    className={`w-full justify-between py-8 px-4 [&_svg]:size-5 ${selectedStrategy === name ? 'border border-blue-700' : ''}`}
                                    onClick={() => handleButtonClick(name)}
                                >
                                    <div className="items-center flex flex-row gap-4">
                                        {icon} 
                                        <div className="flex flex-col text-start">
                                            <div>{label}</div>
                                            <div className="text-xs text-zinc-600">{desc}</div> 
                                        </div> 
                                    </div>
                                   
                                    {additionalIcon}
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
                                <Button className="w-full font-semibold bg-blue-700 hover:bg-blue-700/80" size="lg" onClick={rlySimulate}>
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
                        <div className="flex justify-between">
                            <div className="font-semibold text-zinc-500">Nov 2024</div>
                            <div className="font-semibold text-zinc-500">RM</div>
                        </div>
                        <div className="flex flex-col gap-2">
                            {debtAfterSort?.map((elem, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className="font-medium text-lg">{index + 1}</div>
                                    <div className="flex-1">
                                        <div className="flex justify-between font-medium text-lg">
                                            <div>{elem.name}</div>
                                            <div>{elem.installment}</div>
                                        </div>
                                        <div className="flex justify-between text-xs text-zinc-500">
                                            <div>{elem.interest_pct}% p.a.</div>
                                            {/* <div>{elem.remaining}</div> */}
                                            <div>Clear on: {repaymentResult ? repaymentResult[index] ? repaymentResult[index].month : null : null}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
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
