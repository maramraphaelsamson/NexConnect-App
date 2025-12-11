"use client";

import { useApp } from "@/context/AppContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, ChevronRight, HelpCircle, MessageSquare, Phone } from "lucide-react";

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
        
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Support & Legal</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col space-y-2 text-sm">
                    <Button variant="ghost" className="justify-start -ml-4">
                        <HelpCircle className="mr-2 h-4 w-4" /> FAQ
                    </Button>
                     <Button variant="ghost" className="justify-start -ml-4">
                        <MessageSquare className="mr-2 h-4 w-4" /> Live Chat
                    </Button>
                     <Button variant="ghost" className="justify-start -ml-4">
                        <Phone className="mr-2 h-4 w-4" /> Call Us
                    </Button>
                </div>
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">App Info</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">App Version</span>
                    <span className="font-medium">1.0.0</span>
                </div>
                 <div className="flex justify-between items-center text-sm mt-2">
                    <span className="text-muted-foreground">Device ID</span>
                    <span className="font-medium text-xs">{user.id}</span>
                </div>
            </CardContent>
        </Card>
        
        <Button variant="destructive" className="w-full">
            <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
    </div>
  );
}
