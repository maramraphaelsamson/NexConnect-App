"use client";

import { useApp } from "@/context/AppContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useAuth, useDoc, useFirestore, useMemoFirebase } from "@/firebase";
import { cn } from "@/lib/utils";
import { doc } from "firebase/firestore";
import { Skeleton } from "../ui/skeleton";

interface UserProfile {
    name: string;
    businessName?: string;
}

export function UserHeader() {
  const { user, mode, setMode } = useApp();
  const auth = useAuth();
  const firestore = useFirestore();

  const userRef = useMemoFirebase(() => {
      if (!firestore || !user) return null;
      return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userRef);

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "NN";
    const names = name.split(' ');
    if (names.length > 1) {
      return names[0][0] + names[names.length - 1][0];
    }
    return name.substring(0, 2);
  }
  
  const getDisplayName = () => {
    if (isProfileLoading) return <Skeleton className="h-6 w-32" />;
    if (!userProfile) return user?.displayName || "User";

    if (mode === 'Business') {
        return userProfile.businessName || userProfile.name;
    }
    return userProfile.name;
  }

  return (
    <header className="flex justify-between items-center p-4 bg-transparent">
      <h1 className="text-xl font-headline font-bold text-foreground">
          {getDisplayName()}
      </h1>
      <div className="flex items-center gap-3">
         <div className="flex items-center p-1 bg-secondary rounded-lg">
           <Button
              variant={mode === 'Personal' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setMode('Personal')}
              className={cn("text-xs h-7 px-3", mode === 'Personal' && "shadow-sm")}
            >
              Personal
            </Button>
            <Button
              variant={mode === 'Business' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setMode('Business')}
              className={cn("text-xs h-7 px-3", mode === 'Business' && "shadow-sm")}
            >
              Business
            </Button>
         </div>
        {user ? (
            <div className="flex items-center gap-3">
                <Link href="/profile">
                    <Avatar className="h-9 w-9 cursor-pointer border-2 border-primary/50">
                        <AvatarImage src={user.photoURL || `https://api.dicebear.com/8.x/initials/svg?seed=${userProfile?.name || user.email}`} alt={userProfile?.name || 'User'} />
                        <AvatarFallback>{getInitials(userProfile?.name)}</AvatarFallback>
                    </Avatar>
                </Link>
            </div>
        ) : (
             <Link href="/signup">
                <Button>Log In</Button>
            </Link>
        )}
      </div>
    </header>
  );
}
