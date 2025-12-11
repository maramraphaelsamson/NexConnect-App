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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";

// Mock data, can be moved to constants later
const dataPlans = {
  MTN: [
    { name: "1.2GB - 30 days", price: 300 },
    { name: "2.5GB - 30 days", price: 500 },
    { name: "5GB - 30 days", price: 1200 },
  ],
  Airtel: [
    { name: "1.5GB - 30 days", price: 300 },
    { name: "3GB - 30 days", price: 500 },
  ],
  Glo: [
    { name: "1.35GB - 14 days", price: 300 },
    { name: "2.9GB - 30 days", price: 500 },
  ],
  '9mobile': [
    { name: "1GB - 30 days", price: 250 },
    { name: "2.5GB - 30 days", price: 450 },
  ],
};

type Network = keyof typeof dataPlans;

export function BuyDataSheet({ children }: { children: React.ReactNode }) {
  const [selectedNetwork, setSelectedNetwork] = useState<Network>("MTN");
  const [selectedPlan, setSelectedPlan] = useState<typeof dataPlans[Network][0] | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleBuy = () => {
    // Mock purchase logic
    toast({
      title: "Purchase Successful",
      description: `You have successfully added ${selectedPlan?.name} to your locker.`,
    });
    setIsOpen(false);
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-lg max-w-md mx-auto">
        <SheetHeader>
          <SheetTitle className="font-headline flex items-center gap-2"><PlusCircle /> Add Data to Locker</SheetTitle>
          <SheetDescription>
            Buy data in bulk and store it in your non-expiring locker.
          </SheetDescription>
        </SheetHeader>
        <div className="p-4 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="network">Network</Label>
              <Select onValueChange={(v: Network) => {
                  setSelectedNetwork(v);
                  setSelectedPlan(null);
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
              <Select onValueChange={(planName) => {
                const plan = dataPlans[selectedNetwork].find(p => p.name === planName);
                if (plan) setSelectedPlan(plan);
              }}>
                <SelectTrigger id="plan" disabled={!selectedNetwork}>
                  <SelectValue placeholder="Select Plan" />
                </SelectTrigger>
                <SelectContent>
                  {dataPlans[selectedNetwork].map(plan => (
                    <SelectItem key={plan.name} value={plan.name}>
                        {plan.name} - ₦{plan.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {selectedPlan && (
             <Card className="text-center p-4 bg-secondary">
                <CardDescription>You are buying</CardDescription>
                <CardTitle className="text-xl font-bold font-headline">
                    {selectedPlan.name}
                </CardTitle>
                <p className="text-2xl font-bold text-primary mt-1">₦{selectedPlan.price}</p>
            </Card>
          )}
          
          <Button className="w-full" size="lg" disabled={!selectedPlan} onClick={handleBuy}>
            Pay ₦{selectedPlan?.price || 0} from Wallet
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
