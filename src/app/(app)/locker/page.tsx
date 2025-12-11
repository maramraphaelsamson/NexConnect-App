"use client";

import { useApp } from "@/context/AppContext";
import { LockerCard } from "@/components/dashboard/LockerCard";
import { WalletCard } from "@/components/dashboard/WalletCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { BusinessDashboard } from "@/components/dashboard/BusinessDashboard";
import { useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";

// Define the shape of your data
interface Locker {
  balanceGB: number;
}

interface Wallet {
  balanceNaira: number;
}

export default function LockerPage() {
  const { mode, user, isUserLoading } = useApp();
  const router = useRouter();
  const firestore = useFirestore();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/signup');
    }
  }, [user, isUserLoading, router]);

  const lockerRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    // Assuming one locker per user, with a known ID like 'main'
    return doc(firestore, 'users', user.uid, 'lockers', 'main');
  }, [firestore, user]);

  const walletRef = useMemoFirebase(() => {
      if (!firestore || !user) return null;
      // Assuming one wallet per user, with a known ID like 'main'
      return doc(firestore, 'users', user.uid, 'wallets', 'main');
  }, [firestore, user]);
  
  const { data: lockerData, isLoading: isLockerLoading, error: lockerError } = useDoc<Locker>(lockerRef);
  const { data: walletData, isLoading: isWalletLoading, error: walletError } = useDoc<Wallet>(walletRef);

  // This effect will create initial documents if they don't exist
    useEffect(() => {
        if (firestore && user && !isLockerLoading && !lockerData && !lockerError) {
            const newLockerRef = doc(firestore, "users", user.uid, "lockers", "main");
            setDocumentNonBlocking(newLockerRef, { userId: user.uid, balanceGB: 0 }, { merge: true });
        }
        if (firestore && user && !isWalletLoading && !walletData && !walletError) {
            const newWalletRef = doc(firestore, "users", user.uid, "wallets", "main");
            setDocumentNonBlocking(newWalletRef, { userId: user.uid, balanceNaira: 0 }, { merge: true });
        }
    }, [firestore, user, isLockerLoading, lockerData, lockerError, isWalletLoading, walletData, walletError]);


  if (isUserLoading) {
      return <div>Loading...</div> // Or a proper skeleton loader
  }

  return (
    <div className="h-full">
      {mode === 'Personal' ? (
        <div className="space-y-4">
          <LockerCard balance={lockerData?.balanceGB ?? null} isLoading={isLockerLoading} />
          <WalletCard balance={walletData?.balanceNaira ?? null} isLoading={isWalletLoading} />
          <QuickActions />
        </div>
      ) : (
        <BusinessDashboard />
      )}
    </div>
  );
}
