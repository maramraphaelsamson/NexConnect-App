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
  const todayProfit = 42;
  const totalSales = 125000;
  const vendorLink = "nexconnect.ng/pay/tunde-data";

  return (
    <div className="p-4 space-y-6">
        <header className="flex justify-between items-start">
            <div>
                <h1 className="text-2xl font-headline font-bold text-foreground">Profit Monitor</h1>
            </div>
            <Badge variant="outline" className="border-green-400 text-green-400 flex items-center gap-2">
                <Briefcase className="w-4 h-4" /> RESELLER ACTIVE
            </Badge>
        </header>

        {/* Profit Monitor */}
        <Card className="bg-card shadow-lg border-primary/20">
            <CardHeader>
                <CardDescription>Wallet Balance</CardDescription>
                <CardTitle className="text-4xl font-bold font-headline text-primary">
                ₦{walletBalance.toLocaleString()}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-around text-sm text-center">
                    <div>
                        <p className="text-muted-foreground">Today's Profit</p>
                        <p className="font-semibold text-lg text-green-400 flex items-center gap-1"><ArrowUp className="w-4 h-4" /> +{todayProfit} Orders</p>
                    </div>
                     <div>
                        <p className="text-muted-foreground">Total Sales</p>
                        <p className="font-semibold text-lg flex items-center gap-1"><ArrowUp className="w-4 h-4" /> ₦{totalSales.toLocaleString()}</p>
                    </div>
                </div>
                <Button className="w-full mt-2 bg-accent text-accent-foreground font-semibold hover:bg-accent/90">
                    <Wallet className="mr-2 h-4 w-4" /> Fund Business Wallet
                </Button>
            </CardContent>
        </Card>

        {/* Quick Sell Grid */}
        <Card>
            <CardHeader><CardTitle className="font-headline">Quick Sell (POS)</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-4 gap-2">
                <SellDataSheet>
                    <Button variant="ghost" className="h-20 flex-col gap-1"><Smartphone className="w-6 h-6" /> <span className="text-xs">Sell Data</span></Button>
                </SellDataSheet>
                 <Button variant="ghost" className="h-20 flex-col gap-1"><Phone className="w-6 h-6" /> <span className="text-xs">Buy Airtime</span></Button>
                 <Button variant="ghost" className="h-20 flex-col gap-1"><Users className="w-6 h-6" /> <span className="text-xs">Bulk Sender</span></Button>
                <ReceiptGenerator>
                     <Button variant="ghost" className="h-20 flex-col gap-1"><Receipt className="w-6 h-6" /> <span className="text-xs">Print Receipt</span></Button>
                </ReceiptGenerator>
            </CardContent>
        </Card>
        
        {/* Vendor Payment Link */}
        <Card>
            <CardHeader><CardTitle className="font-headline">Vendor Payment Link</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Tharntiour orsineite tuik inotiting s cott jjuacidiinera toj dhe an the to wtectet prottus.</p>
                <div className="flex gap-2">
                    <Button variant="secondary" className="w-full">Copy Link</Button>
                    <Button variant="secondary" className="w-full">Share to WhatsApp Status</Button>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
