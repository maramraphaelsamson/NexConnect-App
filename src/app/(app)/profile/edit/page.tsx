"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, zodResolver } from "@hookform/resolvers/zod";
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
import { Loader2 } from "lucide-react";

const profileSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    businessName: z.string().optional(),
    profilePicture: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
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
            profilePicture: "",
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
                profilePicture: userProfile.profilePicture || "",
            });
        }
    }, [userProfile, form]);

    const onSubmit = async (data: ProfileFormValues) => {
        if (!userRef) return;
        setIsSaving(true);
        try {
            updateDocumentNonBlocking(userRef, {
                name: data.name,
                businessName: data.businessName,
                profilePicture: data.profilePicture
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
                             <FormField
                                control={form.control}
                                name="profilePicture"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Profile Picture URL (Optional)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://example.com/image.png" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex gap-4">
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
