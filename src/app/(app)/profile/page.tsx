"use client";

import { useApp } from "@/context/AppContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BusinessModeToggle } from "@/components/profile/BusinessModeToggle";
import { LogOut } from "lucide-react";

export default function ProfilePage() {
  const { user } = useApp();

  return (
    <div className="p-4 space-y-6">
        <Card>
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={`https://api.dicebear.com/8.x/initials/svg?seed=${user.name}`} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="font-headline text-2xl">{user.name}</CardTitle>
                        <CardDescription>+234 801 234 5678</CardDescription>
                    </div>
                </div>
            </CardHeader>
        </Card>
        
        <BusinessModeToggle />
        
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">App Info</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">App Version</span>
                    <span className="font-medium">1.0.0</span>
                </div>
            </CardContent>
        </Card>
        
        <Button variant="destructive" className="w-full">
            <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
    </div>
  );
}
