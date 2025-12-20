"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useApp } from "@/context/AppContext";
import { useFirestore, useDoc, useMemoFirebase, updateDocumentNonBlocking } from "@/firebase";
import { doc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";

const profileSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    businessName: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface UserProfile {
    name: string;
    businessName?: string;
    profilePicture?: string;
}

export default function EditProfilePage() {
    const { user, isUserLoading } = useApp();
    const router = useRouter();
    const firestore = useFirestore();
    const { toast } = useToast();
    const [isSaving, setIsSaving] = useState(false);

    const userRef = useMemoFirebase(() => {
        if (!firestore || !user) return null;
        return doc(firestore, "users", user.uid);
    }, [firestore, user]);

    const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userRef);

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: "",
            businessName: "",
        },
    });

    useEffect(() => {
        if (!isUserLoading && !user) {
            router.push('/signup');
        }
    }, [user, isUserLoading, router]);

    useEffect(() => {
        if (userProfile) {
            form.reset({
                name: userProfile.name || "",
                businessName: userProfile.businessName || "",
            });
        }
    }, [userProfile, form]);
    
    const getInitials = (name: string | null | undefined) => {
        if (!name) return "NN";
        const names = name.split(' ');
        if (names.length > 1) {
          return names[0][0] + names[names.length - 1][0];
        }
        return name.substring(0, 2);
    }

    const onSubmit = async (data: ProfileFormValues) => {
        if (!userRef) return;
        setIsSaving(true);
        try {
            const avatarUrl = `https://api.dicebear.com/8.x/initials/svg?seed=${data.name || user?.email}`;
            
            updateDocumentNonBlocking(userRef, {
                name: data.name,
                businessName: data.businessName,
                profilePicture: avatarUrl
            });
            
            toast({
                title: "Profile Updated",
                description: "Your changes have been saved.",
            });
            router.push("/profile");
        } catch (error) {
            console.error("Error updating profile: ", error);
            toast({
                variant: "destructive",
                title: "Update Failed",
                description: "Could not save your changes. Please try again.",
            });
        } finally {
            setIsSaving(false);
        }
    };

    if (isUserLoading || isProfileLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="p-4">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Edit Profile</CardTitle>
                    <CardDescription>Manage your personal and business information.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center mb-6">
                        <Avatar className="h-24 w-24 border-4 border-primary/50">
                            <AvatarImage src={userProfile?.profilePicture} alt={userProfile?.name || 'User'} />
                            <AvatarFallback className="text-3xl">{getInitials(form.watch('name') || userProfile?.name)}</AvatarFallback>
                        </Avatar>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Tunde Adebayo" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="businessName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Business Name (Optional)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Tunde Ventures" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex gap-4 pt-4">
                                <Button type="button" variant="outline" onClick={() => router.back()} className="w-full">
                                    Cancel
                                </Button>
                                <Button type="submit" className="w-full" disabled={isSaving}>
                                    {isSaving ? <Loader2 className="animate-spin" /> : "Save Changes"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
