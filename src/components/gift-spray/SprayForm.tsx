"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Megaphone, Copy, Check } from "lucide-react";

export function SprayForm() {
    const [generatedLink, setGeneratedLink] = useState("");
    const [isCopied, setIsCopied] = useState(false);

    const handleGenerate = () => {
        // In a real app, this would be an API call
        const uniqueId = Math.random().toString(36).substring(7);
        setGeneratedLink(`https://nexconnect.ng/spray/${uniqueId}`);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedLink);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Card className="h-48 flex flex-col items-center justify-center p-4 hover:bg-accent/50 transition-colors cursor-pointer shadow-md">
                    <Megaphone className="h-10 w-10 text-accent mb-2" />
                    <p className="text-lg font-semibold text-center text-foreground font-headline">Create Data Spray</p>
                    <p className="text-sm text-muted-foreground text-center">Create a viral giveaway link</p>
                </Card>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-lg max-w-md mx-auto">
                <SheetHeader>
                    <SheetTitle className="font-headline flex items-center gap-2"><Megaphone /> Create Data Spray</SheetTitle>
                    <SheetDescription>
                        Generate a unique link for a data giveaway.
                    </SheetDescription>
                </SheetHeader>
                <div className="p-4 space-y-6">
                    {!generatedLink ? (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="total-data">Total Data (GB)</Label>
                                    <Input id="total-data" type="number" placeholder="e.g., 5" />
                                </div>
                                <div>
                                    <Label htmlFor="winners">Number of Winners</Label>
                                    <Input id="winners" type="number" placeholder="e.g., 20" />
                                </div>
                            </div>
                            <div>
                                <Label>Mode</Label>
                                <RadioGroup defaultValue="fastest" className="mt-2">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="fastest" id="fastest" />
                                        <Label htmlFor="fastest">Fastest Fingers (Lucky Dip)</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <Button size="lg" className="w-full" onClick={handleGenerate}>
                                Generate Link
                            </Button>
                        </>
                    ) : (
                        <div className="space-y-4 text-center">
                            <h3 className="font-semibold text-lg">Link Generated!</h3>
                            <p className="text-sm text-muted-foreground">Your data has been deducted. Share the link below.</p>
                             <div className="flex gap-2">
                                <Input value={generatedLink} readOnly />
                                <Button size="icon" onClick={handleCopy}>
                                    {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                </Button>
                            </div>
                            <Button variant="outline" onClick={() => setGeneratedLink("")} className="w-full">Create another Spray</Button>
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
