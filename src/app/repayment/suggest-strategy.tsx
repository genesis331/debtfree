"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
    ChartNoAxesCombinedIcon,
    CrownIcon,
    MailWarningIcon,
    PercentIcon
} from "lucide-react";

// Define the strategy data
const strategies = [
    {
        name: 'minimize-interest',
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
        name: 'free-up-cash',
        label: 'Free Up Cash Flow',
        icon: <ChartNoAxesCombinedIcon className="text-blue-700" />
    }
];

const SuggestedStrategies = () => {

    const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);

    const handleButtonClick = (strategy: string) => {
        setSelectedStrategy(strategy);
    };

    return (
        <div className="flex flex-col gap-6">
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
        </div>
    );
};

export default SuggestedStrategies;
