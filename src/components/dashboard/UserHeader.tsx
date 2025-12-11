"use client";

import { useApp } from "@/context/AppContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Briefcase, User } from "lucide-react";
import Link from 'next/link';

export function UserHeader() {
  const { user, mode, toggleMode } = useApp();

  return (
    <div className="flex justify-between items-center p-4 bg-background">
      <div>
        <h1 className="text-2xl font-headline font-bold text-foreground">
          Hello {user.name}
        </h1>
        <p className="text-sm text-muted-foreground">ID: {user.id.split('-')[0]}...</p>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant={mode === 'Personal' ? 'secondary' : 'default'} 
          onClick={toggleMode}
          className="rounded-full px-4 py-2 h-auto text-sm"
        >
            {mode === 'Personal' ? <User className="mr-2 h-4 w-4" /> : <Briefcase className="mr-2 h-4 w-4" />}
            {mode}
        </Button>
        <Link href="/profile">
            <Avatar className="h-9 w-9 cursor-pointer">
                <AvatarImage src={`https://api.dicebear.com/8.x/initials/svg?seed=${user.name}`} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
        </Link>
      </div>
    </div>
  );
}
