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
import { Wallet, Loader2, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useApp } from "@/context/AppContext";
import { useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { doc, runTransaction, collection, serverTimestamp } from "firebase/firestore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


interface Wallet {
  balanceNaira: number;
}

export function FundWalletSheet({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState(1000);
  const [isFunding, setIsFunding] = useState(false);

  const { user } = useApp();
  const firestore = useFirestore();
  const { toast } = useToast();

  const walletRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'users', user.uid, 'wallets', 'main');
  }, [firestore, user]);

  const { data: walletData } = useDoc<Wallet>(walletRef);

  const handleFund = async () => {
    if (!firestore || !user || !walletRef) return;
    
    setIsFunding(true);

    const transactionsRef = collection(firestore, 'users', user.uid, 'transactions');
    const newTransactionRef = doc(transactionsRef);

    try {
        await runTransaction(firestore, async (transaction) => {
            const walletDoc = await transaction.get(walletRef);
            if (!walletDoc.exists()) {
                throw "Wallet not found.";
            }

            const currentBalance = walletDoc.data().balanceNaira;
            const newBalance = currentBalance + amount;
            
            transaction.update(walletRef, { balanceNaira: newBalance });

            transaction.set(newTransactionRef, {
                id: newTransactionRef.id,
                userId: user.uid,
                type: 'Fund Wallet',
                amount: amount,
                timestamp: serverTimestamp(),
                status: 'Completed',
                details: `Wallet funded with ₦${amount}`
            });
        });

        toast({
            title: "Wallet Funded",
            description: `₦${amount} has been added to your wallet.`,
        });
        setIsOpen(false);

    } catch (e: any) {
        toast({
            variant: "destructive",
            title: "Funding Failed",
            description: e.toString(),
        });
    } finally {
        setIsFunding(false);
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-lg max-w-md mx-auto">
        <SheetHeader>
          <SheetTitle className="font-headline flex items-center gap-2"><Wallet /> Fund Wallet</SheetTitle>
          <SheetDescription>
            Add money to your NexConnect wallet securely. Current balance: ₦{walletData?.balanceNaira.toFixed(2) ?? '0.00'}
          </SheetDescription>
        </SheetHeader>
        <div className="p-4 space-y-6">
          <div>
            <Label htmlFor="fund-amount">Amount (₦)</Label>
            <Input id="fund-amount" type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value) || 0)} min={100} step={100} />
          </div>

           <div>
              <Label htmlFor="payment-method">Payment Method</Label>
              <Select defaultValue="card">
                <SelectTrigger id="payment-method">
                  <SelectValue placeholder="Select Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      <span>Card (Paystack)</span>
                    </div>
                  </SelectItem>
                   <SelectItem value="transfer" disabled>Bank Transfer (Coming Soon)</SelectItem>
                </SelectContent>
              </Select>
            </div>

          <Button className="w-full" size="lg" disabled={isFunding || amount < 100} onClick={handleFund}>
            {isFunding ? <Loader2 className="animate-spin" /> : `Pay ₦${amount}`}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
