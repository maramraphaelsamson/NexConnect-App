"use client";

import { useApp } from "@/context/AppContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from 'next/link';
import { useAuth } from "@/firebase";

export function UserHeader() {
  const { user, mode, toggleMode } = useApp();
  const auth = useAuth();

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "NN";
    const names = name.split(' ');
    if (names.length > 1) {
      return names[0][0] + names[names.length - 1][0];
    }
    return name.substring(0, 2);
  }

  return (
    <header className="flex justify-between items-center p-4 bg-transparent">
      <h1 className="text-xl font-headline font-bold text-foreground">
          Tunde Ventures
      </h1>
      <div className="flex items-center gap-3">
        <Button 
          variant={mode === 'Personal' ? 'secondary' : 'default'}
          size="sm"
          onClick={toggleMode}
          className="rounded-full data-[state=on]:bg-blue-200 data-[state=on]:text-blue-800"
        >
            {mode}
        </Button>
        {user ? (
            <div className="flex items-center gap-3">
                <Link href="/profile">
                    <Avatar className="h-9 w-9 cursor-pointer border-2 border-primary/50">
                        <AvatarImage src={user.photoURL || `https://api.dicebear.com/8.x/initials/svg?seed=${user.displayName || user.email}`} alt={user.displayName || 'User'} />
                        <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                    </Avatar>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => auth.signOut()}>
                    <LogOut className="h-5 w-5" />
                </Button>
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
