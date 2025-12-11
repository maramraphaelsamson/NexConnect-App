"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Smartphone } from "lucide-react";

const dataPlans = {
  MTN: [
    { name: "1GB - 30 days", cost: 235, defaultSell: 300 },
    { name: "2GB - 30 days", cost: 470, defaultSell: 550 },
    { name: "5GB - 30 days", cost: 1175, defaultSell: 1300 },
  ],
  Airtel: [
    { name: "1.5GB - 30 days", cost: 240, defaultSell: 300 },
    { name: "3GB - 30 days", cost: 480, defaultSell: 550 },
  ],
};

type Network = keyof typeof dataPlans;

export function SellDataSheet({ children }: { children: React.ReactNode }) {
  const [selectedNetwork, setSelectedNetwork] = useState<Network>("MTN");
  const [selectedPlan, setSelectedPlan] = useState<typeof dataPlans[Network][0] | null>(null);
  const [sellingPrice, setSellingPrice] = useState(0);

  const handlePlanChange = (planName: string) => {
    const plan = dataPlans[selectedNetwork].find(p => p.name === planName);
    if (plan) {
      setSelectedPlan(plan);
      setSellingPrice(plan.defaultSell);
    }
  };

  const profit = selectedPlan ? sellingPrice - selectedPlan.cost : 0;

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-lg max-w-md mx-auto">
        <SheetHeader>
          <SheetTitle className="font-headline flex items-center gap-2"><Smartphone /> Sell Data</SheetTitle>
          <SheetDescription>
            Sell data to your customers at a profit.
          </SheetDescription>
        </SheetHeader>
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="network">Network</Label>
              <Select onValueChange={(v: Network) => {
                  setSelectedNetwork(v);
                  setSelectedPlan(null);
                  setSellingPrice(0);
                }} defaultValue="MTN">
                <SelectTrigger id="network">
                  <SelectValue placeholder="Select Network" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(dataPlans).map(net => (
                    <SelectItem key={net} value={net}>{net}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="plan">Data Plan</Label>
              <Select onValueChange={handlePlanChange}>
                <SelectTrigger id="plan">
                  <SelectValue placeholder="Select Plan" />
                </SelectTrigger>
                <SelectContent>
                  {dataPlans[selectedNetwork].map(plan => (
                    <SelectItem key={plan.name} value={plan.name}>{plan.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {selectedPlan && (
            <div className="grid grid-cols-2 gap-4 items-end">
              <div>
                <Label htmlFor="selling-price">Selling Price (₦)</Label>
                <Input id="selling-price" type="number" value={sellingPrice} onChange={(e) => setSellingPrice(Number(e.target.value))} />
                <p className="text-xs text-muted-foreground mt-1">Cost: ₦{selectedPlan.cost}</p>
              </div>
              <div className="pb-2">
                <p className="text-sm font-semibold text-green-400">
                  You make ₦{profit.toFixed(2)} profit.
                </p>
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="recipient">Recipient Phone Number</Label>
            <Input id="recipient" placeholder="e.g., 08012345678" />
          </div>

          <Button className="w-full" size="lg" disabled={!selectedPlan}>
            Sell Now
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
