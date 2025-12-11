"use client";

import { useApp } from "@/context/AppContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, ChevronRight, HelpCircle, MessageSquare, Phone, ShieldQuestion, FileText, Info } from "lucide-react";
import { useAuth } from "@/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { user, isUserLoading } = useApp();
  const auth = useAuth();
  const router = useRouter();

    useEffect(() => {
        if (!isUserLoading && !user) {
            router.push('/signup');
        }
    }, [user, isUserLoading, router]);

    if (isUserLoading || !user) {
        return null; // Or a loading spinner
    }
    
    const getInitials = (name: string | null | undefined) => {
        if (!name) return "NN";
        const names = name.split(' ');
        if (names.length > 1) {
          return names[0][0] + names[names.length - 1][0];
        }
        return name.substring(0, 2);
    }

  return (
    <div className="p-4 space-y-6">
        <Card>
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-primary">
                        <AvatarImage src={user.photoURL || `https://api.dicebear.com/8.x/initials/svg?seed=${user.displayName || user.email}`} alt={user.displayName || 'User'} />
                        <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="font-headline text-2xl">{user.displayName || "User"}</CardTitle>
                        <CardDescription>{user.email}</CardDescription>
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
            </Header>
            <CardContent>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">App Version</span>
                    <span className="font-medium">1.0.0</span>
                </div>
                 <div className="flex justify-between items-center text-sm mt-2">
                    <span className="text-muted-foreground">User ID</span>
                    <span className="font-medium text-xs">{user.uid}</span>
                </div>
            </CardContent>
        </Card>
        
        <Button variant="destructive" className="w-full" onClick={() => auth.signOut()}>
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
