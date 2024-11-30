"use client"

import app from "@/components/firebase";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpDown, FilterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuCheckboxItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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

    // State for filtering
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

    // State for sorting options
    const [sortBy, setSortBy] = useState<string>("rate"); // Sorting criteria
    const [sortOrder, setSortOrder] = useState<string>("asc"); // Sorting order

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
            setRefinanceDocs(refinanceList);
        };

        fetchData();
    }, []);

    const uniqueTypes = Array.from(new Set(refinanceDocs.map(doc => doc.type)));

    // Handle checkbox change
    const handleTypeChange = (type: string, checked: boolean) => {
        setSelectedTypes((prev) => {
            if (checked) {
                return [...prev, type];
            } else {
                return prev.filter(t => t !== type);
            }
        });
    };

    // Filter the refinanceDocs based on selected types
    const filteredDocs = refinanceDocs.filter(doc => 
        selectedTypes.length === 0 || selectedTypes.includes(doc.type)
    );

    // Sort the refinanceDocs based on the selected sorting criteria and order
    const sortedRefinanceDocs = filteredDocs.sort((a, b) => {
        let comparison = 0;

        // Compare based on the selected criteria
        if (sortBy === "rate") {
            const rateA = parseFloat(a.rate.replace("%", ""));
            const rateB = parseFloat(b.rate.replace("%", ""));
            comparison = rateA - rateB;
        } else if (sortBy === "monthly") {
            const monthlyA = parseFloat(a.monthly.replace("RM", "").replace(/,/g, ""));
            const monthlyB = parseFloat(b.monthly.replace("RM", "").replace(/,/g, ""));
            comparison = monthlyA - monthlyB;
        } else if (sortBy === "maxTenure") {
            const tenureA = parseInt(a.maxTenure.replace(" years", ""), 10);
            const tenureB = parseInt(b.maxTenure.replace(" years", ""), 10);
            comparison = tenureA - tenureB;
        }

        // Apply sorting order
        return sortOrder === "asc" ? comparison : -comparison;
    });    

    const visibleDocs = showAll ? sortedRefinanceDocs : sortedRefinanceDocs.slice(0, 2);

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
                <div className="flex justify-between items-center">
                    <div>Popular offers</div>
                    <div className="flex flex-row gap-3">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline"><FilterIcon /> All Loan</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-36">
                                {uniqueTypes.map((type) => (
                                    <DropdownMenuCheckboxItem 
                                        key={type} 
                                        checked={selectedTypes.includes(type)} 
                                        onCheckedChange={(checked) => handleTypeChange(type, checked)}
                                    >
                                        {type}
                                    </DropdownMenuCheckboxItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline"><ArrowUpDown /> Sort by</Button>
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
