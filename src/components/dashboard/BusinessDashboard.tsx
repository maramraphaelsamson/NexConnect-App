"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Wallet, BarChart, Users, Repeat, Share2, Copy, Smartphone, Phone, Receipt } from "lucide-react";
import { SellDataSheet } from "./business/SellDataSheet";
import { ReceiptGenerator } from "./business/ReceiptGenerator";
import { Badge } from "../ui/badge";

const savedCustomers = [
    { id: '1', name: 'Mummy Lagos', phone: '08012345678', usual: '2GB MTN' },
    { id: '2', name: 'Customer John', phone: '08087654321', usual: '5GB Airtel' },
    { id: '3', name: 'Mr. Bayo Office', phone: '09011223344', usual: '1GB Glo' },
];

export function BusinessDashboard() {
  const walletBalance = 250000;
  const todayProfit = 4500;
  const totalSales = 125000;
  const vendorLink = "nexconnect.ng/pay/tunde-data";

  return (
    <div className="p-4 space-y-6">
        <header className="flex justify-between items-start">
            <div>
                <h1 className="text-2xl font-headline font-bold text-foreground">Tunde Ventures</h1>
                <p className="text-sm text-muted-foreground">Welcome back, Boss!</p>
            </div>
            <Badge variant="default" className="bg-primary text-primary-foreground flex items-center gap-1">
                <span className="text-lg">💼</span> RESELLER ACTIVE
            </Badge>
        </header>

        {/* Profit Monitor */}
        <Card className="bg-card shadow-lg border-primary/50">
            <CardHeader>
                <CardDescription>Wallet Balance</CardDescription>
                <CardTitle className="text-3xl font-bold font-headline text-primary">
                ₦{walletBalance.toLocaleString()}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Today's Profit</span>
                    <span className="font-semibold text-green-400">+₦{todayProfit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Sales Today</span>
                    <span className="font-semibold text-foreground">₦{totalSales.toLocaleString()}</span>
                </div>
                <Button className="w-full mt-2">
                    <Wallet className="mr-2 h-4 w-4" /> Fund Business Wallet
                </Button>
            </CardContent>
        </Card>

        {/* Quick Sell Grid */}
        <Card>
            <CardHeader><CardTitle className="font-headline">Quick Sell (POS)</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                <SellDataSheet>
                    <Button variant="outline" className="h-24 flex-col gap-2"><Smartphone className="w-6 h-6" /> Sell Data</Button>
                </SellDataSheet>
                 <Button variant="outline" className="h-24 flex-col gap-2"><Phone className="w-6 h-6" /> Sell Airtime</Button>
                 <Button variant="outline" className="h-24 flex-col gap-2"><Users className="w-6 h-6" /> Bulk Sender</Button>
                <ReceiptGenerator>
                     <Button variant="outline" className="h-24 flex-col gap-2"><Receipt className="w-6 h-6" /> Print Receipt</Button>
                </ReceiptGenerator>
            </CardContent>
        </Card>
        
        {/* Marketing Engine */}
        <Card>
            <CardHeader><CardTitle className="font-headline">Marketing Engine</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h3 className="font-semibold">Vendor Link</h3>
                    <p className="text-sm text-muted-foreground mb-2">Share this link for automated sales.</p>
                    <div className="flex gap-2">
                        <input value={vendorLink} readOnly className="w-full px-3 py-2 text-sm border rounded-md bg-muted" />
                        <Button size="icon" onClick={() => navigator.clipboard.writeText(vendorLink)}><Copy className="w-4 h-4" /></Button>
                    </div>
                </div>
                <Separator />
                <div>
                    <h3 className="font-semibold">Promotional Spray</h3>
                    <p className="text-sm text-muted-foreground mb-2">Attract customers with a data giveaway.</p>
                    <Button variant="secondary" className="w-full"><Share2 className="mr-2 w-4 h-4" /> Create Promo Spray</Button>
                </div>
            </CardContent>
        </Card>

        {/* Customer Management */}
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Saved Customers (CRM)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                {savedCustomers.map(customer => (
                    <div key={customer.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                        <div>
                            <p className="font-semibold">{customer.name}</p>
                            <p className="text-sm text-muted-foreground">{customer.usual}</p>
                        </div>
                        <Button size="sm" variant="ghost" className="text-primary hover:text-primary">
                            <Repeat className="mr-2 h-4 w-4"/> Repeat
                        </Button>
                    </div>
                ))}
            </CardContent>
        </Card>
    </div>
  );
}
