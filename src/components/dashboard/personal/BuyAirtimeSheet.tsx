"use client";

import { useState, useEffect, useMemo } from "react";
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
import { Phone, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useApp } from "@/context/AppContext";
import { useFirestore, useDoc, useMemoFirebase, addDocumentNonBlocking, updateDocumentNonBlocking } from "@/firebase";
import { doc, collection, serverTimestamp, runTransaction } from "firebase/firestore";

const networks = ["MTN", "Airtel", "Glo", "9mobile"];

interface Wallet {
  balanceNaira: number;
}

export function BuyAirtimeSheet({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<string>("MTN");
  const [amount, setAmount] = useState(100);
  const [recipient, setRecipient] = useState("");
  const [isBuying, setIsBuying] = useState(false);

  const { user } = useApp();
  const firestore = useFirestore();
  const { toast } = useToast();

  useEffect(() => {
    if (user?.phoneNumber) {
      setRecipient(user.phoneNumber);
    }
  }, [user]);
  
  const walletRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'users', user.uid, 'wallets', 'main');
  }, [firestore, user]);

  const { data: walletData, isLoading: isWalletLoading } = useDoc<Wallet>(walletRef);

  const handleBuy = async () => {
    if (!firestore || !user || !walletData) return;
    
    setIsBuying(true);

    const transactionsRef = collection(firestore, 'users', user.uid, 'transactions');
    const newTransactionRef = doc(transactionsRef);

    try {
        await runTransaction(firestore, async (transaction) => {
            const walletDoc = await transaction.get(walletRef!);

            if (!walletDoc.exists()) {
                throw "Wallet not found.";
            }

            const currentBalance = walletDoc.data().balanceNaira;
            if (currentBalance < amount) {
                throw "Insufficient funds.";
            }

            const newBalance = currentBalance - amount;
            transaction.update(walletRef!, { balanceNaira: newBalance });

            transaction.set(newTransactionRef, {
                id: newTransactionRef.id,
                userId: user.uid,
                type: 'Buy Airtime',
                amount: amount,
                timestamp: serverTimestamp(),
                status: 'Completed',
                details: `${selectedNetwork} Airtime for ${recipient}`
            });
        });

        toast({
            title: "Airtime Purchase Successful",
            description: `₦${amount} airtime sent to ${recipient}.`,
        });
        setIsOpen(false);

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
  
  const canAfford = walletData ? walletData.balanceNaira >= amount : false;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-lg max-w-md mx-auto">
        <SheetHeader>
          <SheetTitle className="font-headline flex items-center gap-2"><Phone /> Buy Airtime</SheetTitle>
          <SheetDescription>
            Top up airtime for yourself or a friend. Wallet balance: ₦{walletData?.balanceNaira.toFixed(2) ?? '0.00'}
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

          <Button className="w-full" size="lg" disabled={isBuying || amount < 50 || !recipient || !canAfford || isWalletLoading} onClick={handleBuy}>
            {isBuying ? <Loader2 className="animate-spin" /> : `Pay ₦${amount} from Wallet`}
          </Button>
           {!canAfford && !isWalletLoading && (
            <p className="text-center text-sm text-destructive">You don't have enough funds in your wallet.</p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
