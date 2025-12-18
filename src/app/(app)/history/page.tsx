"use client";

import { useApp } from "@/context/AppContext";
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection } from "firebase/firestore";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Activity, ShoppingCart, ArrowRight, Wallet, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";

interface Transaction {
    id: string;
    type: 'Buy Data' | 'Buy Airtime' | 'Pay Bills' | 'Withdraw' | 'Fund Wallet';
    amount: number;
    timestamp: {
        seconds: number;
        nanoseconds: number;
    };
    status: 'Completed' | 'Pending' | 'Failed';
    details: string;
}

const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
        case 'Buy Data':
            return <ShoppingCart className="w-5 h-5 text-blue-500" />;
        case 'Buy Airtime':
            return <ShoppingCart className="w-5 h-5 text-green-500" />;
        case 'Fund Wallet':
            return <Wallet className="w-5 h-5 text-indigo-500" />;
        case 'Withdraw':
            return <ArrowLeft className="w-5 h-5 text-red-500" />;
        default:
            return <Activity className="w-5 h-5 text-gray-500" />;
    }
}

const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
        case 'Completed':
            return 'bg-green-100 text-green-800';
        case 'Pending':
            return 'bg-yellow-100 text-yellow-800';
        case 'Failed':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
}

export default function HistoryPage() {
    const { user, isUserLoading } = useApp();
    const firestore = useFirestore();
    const router = useRouter();

    useEffect(() => {
        if (!isUserLoading && !user) {
            router.push('/signup');
        }
    }, [user, isUserLoading, router]);

    const transactionsQuery = useMemoFirebase(() => {
        if (!firestore || !user) return null;
        return collection(firestore, 'users', user.uid, 'transactions');
    }, [firestore, user]);

    const { data: transactions, isLoading, error } = useCollection<Transaction>(transactionsQuery);
    
    const sortedTransactions = transactions?.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);

    return (
        <div className="p-4 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Transaction History</CardTitle>
                    <CardDescription>A record of your recent activity.</CardDescription>
                </CardHeader>
            </Card>

            {isLoading && (
                <div className="space-y-4">
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                </div>
            )}

            {error && (
                 <Alert variant="destructive">
                    <Activity className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        Could not load transaction history. Please try again later.
                    </AlertDescription>
                </Alert>
            )}

            {!isLoading && !error && sortedTransactions && sortedTransactions.length === 0 && (
                <Alert>
                    <Activity className="h-4 w-4" />
                    <AlertTitle>No Transactions Yet</AlertTitle>
                    <AlertDescription>
                        When you buy data, airtime, or fund your wallet, your transactions will appear here.
                    </AlertDescription>
                </Alert>
            )}

            {!isLoading && !error && sortedTransactions && sortedTransactions.length > 0 && (
                <Card>
                    <CardContent className="p-0">
                       <ul className="divide-y">
                           {sortedTransactions.map(tx => (
                               <li key={tx.id} className="p-4 flex items-center gap-4">
                                   <div className="p-3 bg-secondary rounded-full">
                                       {getTransactionIcon(tx.type)}
                                   </div>
                                   <div className="flex-1">
                                       <p className="font-semibold">{tx.details}</p>
                                       <p className="text-sm text-muted-foreground">
                                           {format(new Date(tx.timestamp.seconds * 1000), "MMM d, yyyy 'at' h:mm a")}
                                       </p>
                                   </div>
                                   <div className="text-right">
                                       <p className="font-bold text-lg">₦{tx.amount.toLocaleString()}</p>
                                       <Badge className={cn("text-xs", getStatusColor(tx.status))}>{tx.status}</Badge>
                                   </div>
                               </li>
                           ))}
                       </ul>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
