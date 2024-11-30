"use client"

import app from "@/components/firebase";
import { Card, CardContent } from "@/components/ui/card";
import { FilterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";

interface LoanDoc {
    maxTenure: string;
    monthly: string;
    name: string;
    rate: string;
    type: string;
    url: string;
}

export default function Index() {

    const db = getFirestore(app);
    const [refinanceDocs, setRefinanceDocs] = useState<LoanDoc[]>([]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const fetchData = async () => {

            const refinanceCollection = collection(db, "refinance");
            const refinancneSnapshot = await getDocs(refinanceCollection);
            const refinanceList: LoanDoc[] = refinancneSnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    maxTenure: data.maxTenure,
                    monthly: data.monthly,
                    name: data.name,
                    rate: data.rate,
                    type: data.type,
                    url: data.url,
                };
            });

            // Update the state
            setRefinanceDocs(refinanceList);
        };

        fetchData();
    }, []);

    let by = "s"

    const sortedRefinanceDocs = refinanceDocs.sort((a, b) => {
        return (by === 'rate') 
            ? +a.rate.replace("%", "") - +b.rate.replace("%", "") 
            : +a.monthly.replace("RM", "").replace(/,/g, "") - +b.monthly.replace("RM", "").replace(/,/g, "");
    })

    const visibleDocs = showAll ? sortedRefinanceDocs : sortedRefinanceDocs.slice(0, 3);

    return (
        <div className="min-h-screen flex flex-col px-6 pb-10 gap-6">
            <div className="text-3xl font-bold">Refinancing Options</div>
            <div className="flex flex-col gap-3.5">
                <div>Recommended for you</div>
                <div className="flex flex-col gap-4">
                    <a
                        href="https://www.cimb.com.my/en/personal/day-to-day-banking/financing/property-financing/malaysia-my-second-home.html"
                        target="_blank"
                    >
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
                    </a>
                </div>
            </div>
            <div className="flex flex-col gap-3.5">
                <div className="flex justify-between">
                    <div>Popular offers</div>
                    <Button variant="ghost" className="px-0 py-0 h-min text-zinc-500">
                        <FilterIcon /> All Loans
                    </Button>
                </div>
                <div className="flex flex-col gap-4">
                    {visibleDocs.map((elem) => (
                        <a
                            key={elem.url}
                            href={elem.url}
                            target="_blank"
                        >
                            <Card className="shadow-none">
                                <CardContent className="px-5 py-4">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-col gap-1">
                                            <div className="text-xs text-zinc-500">{elem.type}</div>
                                            <div>{elem.name}</div>
                                        </div>
                                        <div className="text-3xl font-medium pb-1">{elem.monthly}/mo</div>
                                        <div className="flex justify-between text-xs text-zinc-500">
                                            <div>Max {elem.maxTenure}</div>
                                            <div>{elem.rate} p.a.</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </a>
                    ))}
                </div>
                <div className="text-center font-medium text-zinc-500 text-sm">
                    {showAll 
                        ? <Button variant="ghost" onClick={() => setShowAll(false)}>Collapse</Button> 
                        : <Button variant="ghost" onClick={() => setShowAll(true)}>View more offers</Button>
                    }
                </div>
            </div>
        </div>
    );
}
