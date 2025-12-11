"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Gift } from "lucide-react";
import { GIFT_VIBES } from "@/lib/constants";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

export function GiftForm() {
  const [selectedVibe, setSelectedVibe] = useState(GIFT_VIBES[0].id);

  const getImage = (vibeId: string) => {
    const vibe = GIFT_VIBES.find(v => v.id === vibeId);
    if (!vibe) return null;
    return PlaceHolderImages.find(img => img.id === vibe.imageId);
  };
  
  const selectedImage = getImage(selectedVibe);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card className="h-48 flex flex-col items-center justify-center p-4 hover:bg-accent/50 transition-colors cursor-pointer shadow-md">
            <Gift className="h-10 w-10 text-primary mb-2" />
            <p className="text-lg font-semibold text-center text-foreground font-headline">Personal Gift</p>
            <p className="text-sm text-muted-foreground text-center">Send "Sapa Relief" to a friend</p>
        </Card>
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-lg max-w-md mx-auto">
        <SheetHeader>
          <SheetTitle className="font-headline flex items-center gap-2"><Gift /> Personal Gift</SheetTitle>
          <SheetDescription>
            Send data to a friend from your locker.
          </SheetDescription>
        </SheetHeader>
        <div className="p-4 space-y-6">
            <div>
              <Label htmlFor="recipient">Recipient Phone Number</Label>
              <Input id="recipient" placeholder="e.g., 08012345678" />
            </div>
            <div>
              <Label htmlFor="amount">Amount (GB)</Label>
              <Input id="amount" type="number" placeholder="e.g., 2" />
            </div>
            <div>
              <Label>Card Vibe</Label>
              <RadioGroup value={selectedVibe} onValueChange={setSelectedVibe} className="mt-2">
                <div className="grid grid-cols-3 gap-4">
                  {GIFT_VIBES.map((vibe) => {
                    const image = getImage(vibe.id);
                    return (
                        <Label key={vibe.id} htmlFor={vibe.id} className={cn(
                          "cursor-pointer rounded-lg border-2 bg-card text-card-foreground shadow-sm transition-all",
                          selectedVibe === vibe.id ? 'border-primary' : 'border-transparent'
                        )}>
                            <RadioGroupItem value={vibe.id} id={vibe.id} className="sr-only"/>
                            {image && <Image src={image.imageUrl} alt={vibe.label} data-ai-hint={image.imageHint} width={150} height={75} className="rounded-t-md aspect-[2/1] object-cover" />}
                            <p className="text-center text-sm font-medium p-2">{vibe.label}</p>
                        </Label>
                    )
                  })}
                </div>
              </RadioGroup>
            </div>
            <Button size="lg" className="w-full">Send Gift</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
