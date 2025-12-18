"use client";

import { useState, useMemo } from "react";
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
import { PlusCircle, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { doc, runTransaction, collection, serverTimestamp } from "firebase/firestore";

const dataPlans = {
  MTN: [
    { name: "1.2GB - 30 days", price: 300, gb: 1.2 },
    { name: "2.5GB - 30 days", price: 500, gb: 2.5 },
    { name: "5GB - 30 days", price: 1200, gb: 5.0 },
  ],
  Airtel: [
    { name: "1.5GB - 30 days", price: 300, gb: 1.5 },
    { name: "3GB - 30 days", price: 500, gb: 3.0 },
  ],
  Glo: [
    { name: "1.35GB - 14 days", price: 300, gb: 1.35 },
    { name: "2.9GB - 30 days", price: 500, gb: 2.9 },
  ],
  '9mobile': [
    { name: "1GB - 30 days", price: 250, gb: 1.0 },
    { name: "2.5GB - 30 days", price: 450, gb: 2.5 },
  ],
};

type Network = keyof typeof dataPlans;
interface DataPlan {
    name: string;
    price: number;
    gb: number;
}
interface Wallet {
  balanceNaira: number;
}
interface Locker {
  balanceGB: number;
}

export function BuyDataSheet({ children }: { children: React.ReactNode }) {
  const [selectedNetwork, setSelectedNetwork] = useState<Network>("MTN");
  const [selectedPlan, setSelectedPlan] = useState<DataPlan | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  
  const { toast } = useToast();
  const { user } = useApp();
  const firestore = useFirestore();

  const walletRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'users', user.uid, 'wallets', 'main');
  }, [firestore, user]);
  
  const lockerRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'users', user.uid, 'lockers', 'main');
  }, [firestore, user]);

  const { data: walletData, isLoading: isWalletLoading } = useDoc<Wallet>(walletRef);

  const handleBuy = async () => {
    if (!firestore || !user || !walletData || !selectedPlan || !lockerRef) return;
    
    setIsBuying(true);
    
    const transactionsRef = collection(firestore, 'users', user.uid, 'transactions');
    const newTransactionRef = doc(transactionsRef);

    try {
        await runTransaction(firestore, async (transaction) => {
            const walletDoc = await transaction.get(walletRef!);
            const lockerDoc = await transaction.get(lockerRef);

            if (!walletDoc.exists()) throw "Wallet not found.";
            if (!lockerDoc.exists()) throw "Data Locker not found.";

            const currentWalletBalance = walletDoc.data().balanceNaira;
            const currentLockerBalance = lockerDoc.data().balanceGB;

            if (currentWalletBalance < selectedPlan.price) {
                throw "Insufficient wallet funds.";
            }

            const newWalletBalance = currentWalletBalance - selectedPlan.price;
            const newLockerBalance = currentLockerBalance + selectedPlan.gb;

            transaction.update(walletRef!, { balanceNaira: newWalletBalance });
            transaction.update(lockerRef, { balanceGB: newLockerBalance });

            transaction.set(newTransactionRef, {
                id: newTransactionRef.id,
                userId: user.uid,
                type: 'Buy Data',
                amount: selectedPlan.price,
                timestamp: serverTimestamp(),
                status: 'Completed',
                details: `${selectedPlan.name} added to locker`
            });
        });

        toast({
            title: "Purchase Successful",
            description: `You have successfully added ${selectedPlan.name} to your locker.`,
        });
        setIsOpen(false);
        setSelectedPlan(null);

    } catch (e: any) {
         toast({
            variant: "destructive",
            title: "Purchase Failed",
            description: e.toString(),
        });
    } finally {
        setIsBuying(false);
    }
  }

  const canAfford = walletData && selectedPlan ? walletData.balanceNaira >= selectedPlan.price : false;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-lg max-w-md mx-auto">
        <SheetHeader>
          <SheetTitle className="font-headline flex items-center gap-2"><PlusCircle /> Add Data to Locker</SheetTitle>
          <SheetDescription>
            Buy data and store it in your non-expiring locker. Wallet: ₦{walletData?.balanceNaira.toFixed(2) ?? '0.00'}
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
              }}
              value={selectedPlan?.name || ""}
              >
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
                    {selectedPlan.name} ({selectedPlan.gb}GB)
                </CardTitle>
                <p className="text-2xl font-bold text-primary mt-1">₦{selectedPlan.price}</p>
            </Card>
          )}
          
          <Button className="w-full" size="lg" disabled={isBuying || !selectedPlan || !canAfford || isWalletLoading} onClick={handleBuy}>
            {isBuying ? <Loader2 className="animate-spin"/> : `Pay ₦${selectedPlan?.price || 0} from Wallet`}
          </Button>

          {selectedPlan && !canAfford && !isWalletLoading && (
            <p className="text-center text-sm text-destructive">You don't have enough funds in your wallet.</p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
