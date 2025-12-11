"use client";

import { useApp } from "@/context/AppContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Briefcase, User } from "lucide-react";
import Link from 'next/link';

export function UserHeader() {
  const { user, mode, toggleMode } = useApp();

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
            Personal
        </Button>
        <Link href="/profile">
            <Avatar className="h-9 w-9 cursor-pointer border-2 border-primary/50">
                <AvatarImage src={`https://api.dicebear.com/8.x/initials/svg?seed=${user.name}`} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
        </Link>
      </div>
    </header>
  );
}
