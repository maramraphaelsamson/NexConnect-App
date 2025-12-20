"use client";

import { useApp } from "@/context/AppContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, ChevronRight, HelpCircle, MessageSquare, Phone, ShieldQuestion, FileText, Info, Edit, Moon, Sun } from "lucide-react";
import { useAuth, useDoc, useFirestore, useMemoFirebase } from "@/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { doc } from "firebase/firestore";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface UserProfile {
    name: string;
    email: string;
    profilePicture?: string;
}

export default function ProfilePage() {
  const { user, isUserLoading, theme, toggleTheme } = useApp();
  const auth = useAuth();
  const router = useRouter();
  const firestore = useFirestore();

    const userRef = useMemoFirebase(() => {
        if (!firestore || !user) return null;
        return doc(firestore, 'users', user.uid);
    }, [firestore, user]);

  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userRef);

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
                        <AvatarImage src={userProfile?.profilePicture} alt={userProfile?.name || 'User'} />
                        <AvatarFallback>{getInitials(userProfile?.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        {isProfileLoading ? (
                            <div className="space-y-2">
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-full" />
                            </div>
                        ) : (
                            <>
                                <CardTitle className="font-headline text-2xl">{userProfile?.name || "User"}</CardTitle>
                                <CardDescription>{userProfile?.email || user.email}</CardDescription>
                            </>
                        )}
                    </div>
                    <Button asChild variant="outline" size="icon">
                        <Link href="/profile/edit">
                           <Edit className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </CardHeader>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-lg">Appearance</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between">
                    <Label htmlFor="dark-mode-switch" className="flex items-center gap-3">
                        {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                        <span className="text-base">Dark Mode</span>
                    </Label>
                    <Switch
                        id="dark-mode-switch"
                        checked={theme === 'dark'}
                        onCheckedChange={toggleTheme}
                    />
                </div>
            </CardContent>
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
