"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Wallet, BarChart, Users, Repeat, Share2, Copy, Smartphone, Phone, Receipt, ArrowUp, Briefcase } from "lucide-react";
import { SellDataSheet } from "./business/SellDataSheet";
import { ReceiptGenerator } from "./business/ReceiptGenerator";
import { Badge } from "../ui/badge";

const savedCustomers = [
    { id: '1', name: 'Mummy Lagos', phone: '08012345678', usual: '2GB MTN' },
    { id: '2', name: 'Customer John', phone: '08087654321', usual: '5GB Airtel' },
    { id: '3', name: 'Mr. Bayo Office', phone: '09011223344', usual: '1GB Glo' },
];

export function BusinessDashboard() {
  const walletBalance = 50000;
  const todayProfit = 1250;
  const totalSales = 125000;
  const vendorLink = "nexconnect.ng/pay/tunde-data";

  return (
    <div className="p-4 space-y-6">
        <header className="flex justify-between items-start">
            <div>
                <h1 className="text-2xl font-headline font-bold text-foreground">Business Dashboard</h1>
                <p className="text-muted-foreground">Your reseller command center.</p>
            </div>
             <Badge variant="outline" className="border-green-500 text-green-500 flex items-center gap-2 bg-green-500/10">
                <Briefcase className="w-4 h-4" /> RESELLER
            </Badge>
        </header>

        {/* Profit Monitor */}
        <Card className="bg-gradient-to-br from-primary to-blue-800 text-primary-foreground shadow-lg">
            <CardHeader>
                <CardDescription className="text-blue-200">Wallet Balance</CardDescription>
                <CardTitle className="text-4xl font-bold font-headline">
                ₦{walletBalance.toLocaleString()}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between text-sm text-center bg-black/20 p-3 rounded-lg">
                    <div>
                        <p className="text-blue-200">Today's Profit</p>
                        <p className="font-semibold text-lg text-green-300 flex items-center justify-center gap-1"><ArrowUp className="w-4 h-4" /> ₦{todayProfit.toLocaleString()}</p>
                    </div>
                     <Separator orientation="vertical" className="bg-white/20 h-auto" />
                     <div>
                        <p className="text-blue-200">Total Sales</p>
                        <p className="font-semibold text-lg flex items-center justify-center gap-1">₦{totalSales.toLocaleString()}</p>
                    </div>
                </div>
                <Button variant="secondary" className="w-full mt-2 bg-white hover:bg-gray-200 text-primary font-semibold">
                    <Wallet className="mr-2 h-4 w-4" /> Fund Business Wallet
                </Button>
            </CardContent>
        </Card>

        {/* Quick Sell Grid */}
        <div className="space-y-2">
            <h2 className="text-lg font-bold text-foreground px-1 font-headline">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
                 <SellDataSheet>
                    <ActionCard icon={Smartphone} label="Sell Data" description="Send data to a customer" />
                </SellDataSheet>
                <ActionCard icon={Phone} label="Sell Airtime" description="Send airtime to a customer" />
                <ActionCard icon={Users} label="Bulk Send" description="Send to multiple numbers" />
                <ReceiptGenerator>
                     <ActionCard icon={Receipt} label="Print Receipt" description="Generate customer receipt" />
                </ReceiptGenerator>
            </div>
        </div>
        
        {/* Vendor Payment Link */}
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Vendor Payment Link</CardTitle>
                <CardDescription>Automate sales with your unique link. Customers can buy directly.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                 <div className="bg-muted p-3 rounded-lg text-center font-mono text-sm text-muted-foreground">
                    {vendorLink}
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="w-full"><Copy className="mr-2 h-4 w-4" /> Copy Link</Button>
                    <Button variant="outline" className="w-full bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20">
                       <Share2 className="mr-2 h-4 w-4" /> Share
                    </Button>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}


function ActionCard({ icon: Icon, label, description }: { icon: React.ElementType, label: string, description: string }) {
    return (
        <Card className="hover:bg-secondary transition-colors hover:shadow-md cursor-pointer p-4 flex flex-col items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
                <Icon className="h-6 w-6 text-primary" />
            </div>
            <div>
                <p className="text-sm font-semibold font-headline">{label}</p>
                <p className="text-xs text-muted-foreground">{description}</p>
            </div>
        </Card>
    )
}
