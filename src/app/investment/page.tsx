import { Card, CardContent } from "@/components/ui/card";

export default function Index() {
    return (
        <div className="min-h-screen flex flex-col px-6 pb-10 gap-6">
            <div className="text-3xl font-bold">Grow Your Money</div>
            <div className="flex flex-col gap-3.5">
                <div className="font-semibold">Low-Risk Investments</div>
                <div className="flex flex-col gap-4">
                    <a 
                        href="https://www.maybank2u.com.my/maybank2u/malaysia/en/personal/accounts/fixed_deposits/efixed_deposit.page"
                        target="_blank"
                    >
                        <Card className="shadow-none">
                            <CardContent className="px-5 py-4">
                                <div>Maybank Fixed Deposit</div>
                                <div className="text-xs text-zinc-500">up to 3.80% p.a.</div>
                            </CardContent>
                        </Card>
                    </a>
                    <a 
                        href="https://financialmarkets.bnm.gov.my/types-of-securities"
                        target="_blank"
                    >
                        <Card className="shadow-none">
                            <CardContent className="px-5 py-4">
                                <div>Malaysian Government Securities</div>
                                <div className="text-xs text-zinc-500">up to 3.81% p.a.</div>
                            </CardContent>
                        </Card>
                    </a>
                </div>
            </div>
            <div className="flex flex-col gap-3.5">
                <div className="font-semibold">Learn Investment</div>
                <div className="flex flex-col gap-4">
                    <a
                        href="https://www.moomoo.com/my/learn/detail-introduction-to-earnings-report-58661-220562077"
                        target="_blank"
                    >
                        <Card className="shadow-none">
                            <CardContent className="px-5 py-4">
                                <div>Decoding Financial Earning Reports</div>
                                <div className="text-xs text-zinc-500">Financial Reports</div>
                            </CardContent>
                        </Card>
                    </a>
                    <a
                        href="https://www.moomoo.com/my/learn/detail-dividend-stocks-a-haven-amid-market-volatility-55842-220412022"
                        target="_blank"
                    >
                        <Card className="shadow-none">
                            <CardContent className="px-5 py-4">
                                <div>Investing in Dividend Stocks</div>
                                <div className="text-xs text-zinc-500">Diversify Your Portfolio</div>
                            </CardContent>
                        </Card>
                    </a>
                    <a
                        href="https://www.moomoo.com/my/learn/detail-what-is-an-etf-117240-240629222"
                        target="_blank"
                    >
                        <Card className="shadow-none">
                            <CardContent className="px-5 py-4">
                                <div>Beginner’s Guide to ETFs</div>
                                <div className="text-xs text-zinc-500">ETF Investing</div>
                            </CardContent>
                        </Card>
                    </a>
                    <a
                        href="https://www.moomoo.com/my/learn/detail-01-what-is-investment-risk-116333-230961027"
                        target="_blank"
                    >
                        <Card className="shadow-none">
                            <CardContent className="px-5 py-4">
                                <div>How to Reduce Investment Risk</div>
                                <div className="text-xs text-zinc-500">Risk Management</div>
                            </CardContent>
                        </Card>
                    </a>
                </div>
            </div>
        </div>
    );
}
