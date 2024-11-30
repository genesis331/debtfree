"use client"

import app from "@/components/firebase";
import { Card, CardContent } from "@/components/ui/card";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";

interface Document {
    secondary: string;
    name: string;
    type: string;
    url: string;
}

export default function Index() {

    const db = getFirestore(app);

    const [learnDocs, setLearnDocs] = useState<Document[]>([]);
    const [investDocs, setInvestDocs] = useState<Document[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            // Reference to the "investment" collection
            const investmentCollection = collection(db, "investment");
            const investmentSnapshot = await getDocs(investmentCollection);
            const investmentList: Document[] = investmentSnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    secondary: data.secondary,
                    name: data.name,
                    type: data.type,
                    url: data.url,
                };
            });

            // Separate documents based on type
            const learnArray = investmentList.filter(doc => doc.type === "learn");
            const investArray = investmentList.filter(doc => doc.type === "investment");

            // Update the state
            setLearnDocs(learnArray);
            setInvestDocs(investArray);
        };

        fetchData();
    }, []);
    
    return (
        <div className="min-h-screen flex flex-col px-6 pb-10 gap-6">
            <div className="text-3xl font-bold">Grow Your Money</div>
            <div className="flex flex-col gap-3.5">
                <div className="font-semibold">Low-Risk Investments</div>
                <div className="flex flex-col gap-4">
                    {investDocs.map((elem) => (
                        <a
                            key={elem.url}
                            href={elem.url}
                            target="_blank"
                        >
                            <Card className="shadow-none">
                                <CardContent className="px-5 py-4">
                                    <div>{elem.name}</div>
                                    <div className="text-xs text-zinc-500">{elem.secondary}</div>
                                </CardContent>
                            </Card>
                        </a>
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-3.5">
                <div className="font-semibold">Learn Investment</div>
                <div className="flex flex-col gap-4">
                    {learnDocs.map((elem) => (
                        <a
                            key={elem.url}
                            href={elem.url}
                            target="_blank"
                        >
                            <Card className="shadow-none">
                                <CardContent className="px-5 py-4">
                                    <div>{elem.name}</div>
                                    <div className="text-xs text-zinc-500">{elem.secondary}</div>
                                </CardContent>
                            </Card>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
