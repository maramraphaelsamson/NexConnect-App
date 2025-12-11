"use client";

import { useState, useEffect } from "react";
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
import { Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useApp } from "@/context/AppContext";

const networks = ["MTN", "Airtel", "Glo", "9mobile"];

export function BuyAirtimeSheet({ children }: { children: React.ReactNode }) {
  const [selectedNetwork, setSelectedNetwork] = useState<string>("MTN");
  const [amount, setAmount] = useState(100);
  const { user } = useApp();
  const [recipient, setRecipient] = useState(""); 
  const { toast } = useToast();

  useEffect(() => {
    if (user && user.phoneNumber) {
        setRecipient(user.phoneNumber);
    }
  }, [user]);

  const handleBuy = () => {
    // Mock purchase logic
    toast({
      title: "Airtime Purchase Successful",
      description: `₦${amount} airtime sent to ${recipient}.`,
    });
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-lg max-w-md mx-auto">
        <SheetHeader>
          <SheetTitle className="font-headline flex items-center gap-2"><Phone /> Buy Airtime</SheetTitle>
          <SheetDescription>
            Top up airtime for yourself or for a friend.
          </SheetDescription>
        </SheetHeader>
        <div className="p-4 space-y-6">
          <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="airtime-network">Network</Label>
                <Select onValueChange={setSelectedNetwork} defaultValue="MTN">
                    <SelectTrigger id="airtime-network">
                        <SelectValue placeholder="Select Network" />
                    </SelectTrigger>
                    <SelectContent>
                        {networks.map(net => (
                            <SelectItem key={net} value={net}>{net}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="airtime-amount">Amount (₦)</Label>
                <Input id="airtime-amount" type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value) || 0)} min={50} step={50} />
              </div>
          </div>
          
          <div>
            <Label htmlFor="airtime-recipient">Recipient Phone Number</Label>
            <Input id="airtime-recipient" value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="e.g., 08012345678" />
          </div>

          <Button className="w-full" size="lg" disabled={amount < 50 || !recipient} onClick={handleBuy}>
            Pay ₦{amount} from Wallet
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
