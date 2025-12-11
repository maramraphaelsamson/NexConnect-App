"use client";

import { Badge } from "@/components/ui/badge";
import { useApp } from "@/context/AppContext";

export function UserHeader() {
  const { user, mode } = useApp();

  const getBadgeVariant = () => {
    if (mode === 'Business') {
      return "default";
    }
    return "secondary";
  }

  const truncatedId = user.id.split('-').slice(0, 2).join('-') + '...';

  return (
    <div className="flex justify-between items-center p-4">
      <div>
        <h1 className="text-2xl font-headline font-bold text-foreground">
          Hello {user.name}
        </h1>
        <p className="text-sm text-muted-foreground">ID: {truncatedId}</p>
      </div>
      <Badge variant={getBadgeVariant()} className={mode === 'Business' ? 'bg-primary text-primary-foreground' : ''}>
        {mode} Mode
      </Badge>
    </div>
  );
}
