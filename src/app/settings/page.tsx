"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import app from "@/components/firebase";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

interface Settings {
    id: string;
    amt_kept: number;
    debt_ratio_pct: number;
    alert_notification: boolean;
    general_notification: boolean;
}

export default function Index() {

    const db = getFirestore(app);
    const userId = 'BtkO3rgqkPOVre2K4l4T';
    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [nameChange, setNameChange] = useState<string>();
    const [emailChange, setEmailChange] = useState<string>();
    const [alertNoti, setAlertNoti] = useState<boolean>();
    const [generalNoti, setGeneralNoti] = useState<boolean>();
    const [amtKept, setAmtKept] = useState<number>();
    const [amtKeptChange, setAmtKeptChange] = useState<number>();
    const [debtRatioPct, setDebtRatioPct] = useState<number>();
    const [debtRatioPctChange, setDebtRatioPctChange] = useState<number>();

    const fetchUserData = async () => {
        
        const userSnapshot = await getDoc(doc(db, 'user', userId));
        setName(userSnapshot.data()?.name);
        setEmail(userSnapshot.data()?.email);
        setAlertNoti(userSnapshot.data()?.toggles.alert_notification);
        setGeneralNoti(userSnapshot.data()?.toggles.general_notification);
        setAmtKept(userSnapshot.data()?.threshold.amt_kept);
        setDebtRatioPct(userSnapshot.data()?.threshold.debt_ratio_pct);
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleUpdateName = async () => {
        setName(nameChange);
        await updateDoc(doc(db, 'user', userId), {
            name: nameChange
        });
    }

    const handleUpdateEmail = async () => {
        setEmail(emailChange);
        await updateDoc(doc(db, 'user', userId), {
            email: emailChange
        });
    }

    const handleUpdateAlertNoti = async () => {
        setAlertNoti(!alertNoti);
    }

    const handleUpdateGeneralNoti = () => {
        setGeneralNoti(!generalNoti);
    }

    const handleUpdateAmtKept = () => {
        setAmtKept(amtKeptChange);
    }

    const handleUpdateRatio = () => {
        setDebtRatioPct(debtRatioPctChange);
    }

    return (
        <div className="min-h-screen flex flex-col px-6 pb-10 gap-6">
            <div className="text-3xl font-bold">Settings</div>
            <div className="flex flex-col gap-3.5">
                <div className="font-semibold">Edit Your Info</div>
                <div className="flex flex-col gap-4">
                    <Card className="shadow-none">
                        <CardContent className="px-5 py-4">
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <div>{name}</div>
                                    <div className="text-xs text-zinc-500">Full Name</div>
                                </div>
                                <div>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button className="[&_svg]:size-6 px-2 text-zinc-500" variant="ghost"><PencilIcon /></Button>
                                        </DialogTrigger>
                                        <DialogContent className="rounded-lg w-11/12">
                                            <DialogHeader>
                                                <DialogTitle>Edit name</DialogTitle>
                                                <DialogDescription>
                                                    Make changes to your name here. Click save when you're done.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="flex flex-col w-full gap-1.5">
                                                <Label htmlFor="name">Full Name</Label>
                                                <Input type="text" id="name" className="h-10" onChange={(e) => setNameChange(e.target.value)}/>
                                            </div>
                                            <DialogFooter>
                                                <Button className="font-semibold bg-blue-700 hover:bg-blue-700/80" size="lg" onClick={handleUpdateName}>
                                                    Save
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="shadow-none">
                        <CardContent className="px-5 py-4">
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <div>{email}</div>
                                    <div className="text-xs text-zinc-500">Email Address</div>
                                </div>
                                <div>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button className="[&_svg]:size-6 px-2 text-zinc-500" variant="ghost"><PencilIcon /></Button>
                                        </DialogTrigger>
                                        <DialogContent className="rounded-lg w-11/12">
                                            <DialogHeader>
                                                <DialogTitle>Edit email address</DialogTitle>
                                                <DialogDescription>
                                                    Make changes to your email address here. Click save when you're done.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="flex flex-col w-full gap-1.5">
                                                <Label htmlFor="email">Email Address</Label>
                                                <Input type="email" id="email" className="h-10" onChange={(e) => setEmailChange(e.target.value)}/>
                                            </div>
                                            <DialogFooter>
                                                <Button className="font-semibold bg-blue-700 hover:bg-blue-700/80" size="lg" onClick={handleUpdateEmail}>
                                                    Save
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <Button className="w-full font-semibold bg-blue-700 hover:bg-blue-700/80" size="lg">Change Password</Button>
                </div>
            </div>
            <div className="flex flex-col gap-3.5">
                <div className="font-semibold">Manage Linked Accounts</div>
                <div className="flex flex-col gap-4">
                    <Card className="shadow-none">
                        <CardContent className="px-5 py-4">
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <div>Maybank</div>
                                    <div className="text-xs text-zinc-500">xxxxxxxx13</div>
                                </div>
                                <div>
                                    <Button className="[&_svg]:size-6 px-2 text-zinc-500" variant="ghost"><PencilIcon /></Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="shadow-none">
                        <CardContent className="px-5 py-4">
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <div>Touch n’ Go E-Wallet</div>
                                    <div className="text-xs text-zinc-500">601xxxxxxxx27</div>
                                </div>
                                <div>
                                    <Button className="[&_svg]:size-6 px-2 text-zinc-500" variant="ghost"><PencilIcon /></Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <Button className="w-full font-semibold bg-blue-700 hover:bg-blue-700/80" size="lg">Add Accounts</Button>
                </div>
            </div>
            <div className="flex flex-col gap-3.5">
                <div className="font-semibold">Alerts & Notification</div>
                <div className="flex flex-col gap-4">
                    <div className="flex">
                        <div className="flex-1 flex flex-col gap-1.5">
                            <div className="text-sm">Alert</div>
                            <div className="text-xs text-zinc-500">Notifications for prepayment penalties or approaching grace period
                                expirations.
                            </div>
                        </div>
                        <div>
                            <Switch className="data-[state=checked]:bg-blue-700" checked={alertNoti} onCheckedChange={handleUpdateAlertNoti} />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex-1 flex flex-col gap-1.5">
                            <div className="text-sm">Offers & Discount Notification</div>
                            <div className="text-xs text-zinc-500">Notifications for prepayment penalties or approaching grace period
                                expirations.
                            </div>
                        </div>
                        <div>
                            <Switch className="data-[state=checked]:bg-blue-700" checked={generalNoti} onCheckedChange={handleUpdateGeneralNoti} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-3.5">
                <div className="font-semibold">Thresholds</div>
                <div className="flex flex-col gap-4">
                    <Card className="shadow-none">
                        <CardContent className="px-5 py-4">
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <div>{debtRatioPct}% of Current Assets</div>
                                    <div className="text-xs text-zinc-500">Debt-to-Asset Ratio Alert</div>
                                </div>
                                <div>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button className="[&_svg]:size-6 px-2 text-zinc-500" variant="ghost"><PencilIcon /></Button>
                                        </DialogTrigger>
                                        <DialogContent className="rounded-lg w-11/12">
                                            <DialogHeader>
                                                <DialogTitle>Edit Debt-to-Asset Ratio Alert</DialogTitle>
                                                <DialogDescription>
                                                    Make changes to your ratio here. Click save when you're done.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="flex flex-col w-full gap-1.5">
                                                <Label htmlFor="name">Debt-to-Asset Ratio</Label>
                                                <Input type="number" id="name" className="h-10" onChange={(e) => setDebtRatioPctChange(+e.target.value)}/>
                                            </div>
                                            <DialogFooter>
                                                <Button className="font-semibold bg-blue-700 hover:bg-blue-700/80" size="lg" onClick={handleUpdateRatio}>
                                                    Save
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="shadow-none">
                        <CardContent className="px-5 py-4">
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <div>RM{amtKept}</div>
                                    <div className="text-xs text-zinc-500">Amount Kept from Debt Repayment</div>
                                </div>
                                <div>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button className="[&_svg]:size-6 px-2 text-zinc-500" variant="ghost"><PencilIcon /></Button>
                                        </DialogTrigger>
                                        <DialogContent className="rounded-lg w-11/12">
                                            <DialogHeader>
                                                <DialogTitle>Edit Amount Kept from Repayment</DialogTitle>
                                                <DialogDescription>
                                                    Make changes to your ratio here. Click save when you're done.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="flex flex-col w-full gap-1.5">
                                                <Label htmlFor="name">Amount</Label>
                                                <Input type="number" id="name" className="h-10" onChange={(e) => setAmtKeptChange(+e.target.value)}/>
                                            </div>
                                            <DialogFooter>
                                                <Button className="font-semibold bg-blue-700 hover:bg-blue-700/80" size="lg" onClick={handleUpdateAmtKept}>
                                                    Save
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div>
                <Button className="w-full font-semibold border-destructive text-destructive hover:text-destructive bg-destructive/20 hover:bg-destructive/10" size="lg" variant="outline">Delete Account</Button>
            </div>
        </div>
    );
}
