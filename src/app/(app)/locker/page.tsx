
"use client";

import { useApp } from "@/context/AppContext";
import { LockerCard } from "@/components/dashboard/LockerCard";
import { WalletCard } from "@/components/dashboard/WalletCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { BusinessDashboard } from "@/components/dashboard/BusinessDashboard";
import { useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";

// Define the shape of your data
interface UserProfile {
    id: string;
    name: string;
    email: string | null;
    personalMode: boolean;
    businessName?: string;
}

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
  
  const userRef = useMemoFirebase(() => {
      if (!firestore || !user) return null;
      return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const lockerRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'users', user.uid, 'lockers', 'main');
  }, [firestore, user]);

  const walletRef = useMemoFirebase(() => {
      if (!firestore || !user) return null;
      return doc(firestore, 'users', user.uid, 'wallets', 'main');
  }, [firestore, user]);
  
  const { data: userProfileData, isLoading: isUserProfileLoading, error: userProfileError } = useDoc<UserProfile>(userRef);
  const { data: lockerData, isLoading: isLockerLoading, error: lockerError } = useDoc<Locker>(lockerRef);
  const { data: walletData, isLoading: isWalletLoading, error: walletError } = useDoc<Wallet>(walletRef);

  // This effect will create initial documents if they don't exist for a new user
    useEffect(() => {
        const setupNewUser = async () => {
            if (firestore && user && !isUserProfileLoading && !userProfileData && !userProfileError) {
                try {
                    const userDoc = await getDoc(userRef!);
                    if (!userDoc.exists()) {
                        // 1. Create UserProfile first and wait for it to complete
                        await setDoc(userRef!, { 
                            id: user.uid,
                            name: user.displayName || "New User",
                            email: user.email,
                            personalMode: true,
                            phoneNumber: user.phoneNumber,
                            businessName: "",
                            profilePicture: user.photoURL || ""
                        });
                        
                        // 2. Now that the user profile exists, create the sub-collection documents
                        const newLockerRef = doc(firestore, "users", user.uid, "lockers", "main");
                        setDocumentNonBlocking(newLockerRef, { userId: user.uid, balanceGB: 0 }, { merge: true });
                        
                        const newWalletRef = doc(firestore, "users", user.uid, "wallets", "main");
                        setDocumentNonBlocking(newWalletRef, { userId: user.uid, balanceNaira: 500 }, { merge: true });
                    }
                } catch (error) {
                    console.error("Error setting up new user:", error);
                    // Handle error appropriately, maybe show a toast to the user
                }
            }
        };

        setupNewUser();
    }, [firestore, user, isUserProfileLoading, userProfileData, userProfileError, userRef]);


  if (isUserLoading || isUserProfileLoading) {
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
