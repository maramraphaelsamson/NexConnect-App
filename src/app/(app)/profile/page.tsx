"use client";

import { useApp } from "@/context/AppContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, ChevronRight, HelpCircle, MessageSquare, Phone, ShieldQuestion, FileText, Info } from "lucide-react";

export default function ProfilePage() {
  const { user } = useApp();

  return (
    <div className="p-4 space-y-6">
        <Card>
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-primary">
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
                <CardTitle className="font-headline text-lg">Support & Legal</CardTitle>
            </CardHeader>
            <CardContent className="divide-y">
                <SupportItem icon={HelpCircle} label="FAQ" />
                <SupportItem icon={MessageSquare} label="Live Chat" />
                <SupportItem icon={Phone} label="Call Us" />
                <SupportItem icon={ShieldQuestion} label="Privacy Policy" />
                <SupportItem icon={FileText} label="Terms of Service" />
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-lg">App Info</CardTitle>
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

const SupportItem = ({ icon: Icon, label }: { icon: React.ElementType, label: string }) => (
    <Button variant="ghost" className="w-full justify-start -ml-4 py-6 text-base">
        <Icon className="mr-3 h-5 w-5 text-muted-foreground" /> 
        <span>{label}</span>
        <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
    </Button>
)
