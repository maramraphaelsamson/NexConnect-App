"use client";

import { useState } from 'react';
import Image from 'next/image';
import { generateShareableReceipt, type GenerateShareableReceiptInput } from '@/ai/flows/generate-shareable-receipt';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Share2 } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

// Mock a recent transaction
const lastTransaction = {
  details: "2GB MTN Data",
  customer: "Customer John",
  date: new Date().toLocaleDateString('en-GB'),
  amount: "550.00"
};

export function ReceiptGenerator({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [receiptUrl, setReceiptUrl] = useState<string | null>(null);
    const { toast } = useToast();

    // The AI flow requires a base64 image. We'll send a transparent pixel as a placeholder.
    // The prompt instructs the model to use a generic background if none is provided.
    const transparentPixel = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

    const handleGenerate = async () => {
        setIsLoading(true);
        setReceiptUrl(null);
        try {
            const input: GenerateShareableReceiptInput = {
                transactionDetails: `${lastTransaction.details} - ₦${lastTransaction.amount}`,
                businessName: "Tunde Ventures",
                customerName: lastTransaction.customer,
                date: lastTransaction.date,
                backgroundImage: transparentPixel
            };
            const result = await generateShareableReceipt(input);

            if (result.receiptImageUrl) {
                setReceiptUrl(result.receiptImageUrl);
            } else {
                 throw new Error("AI did not return a receipt image.");
            }
        } catch (error) {
            console.error("Error generating receipt:", error);
            toast({
                variant: "destructive",
                title: "Generation Failed",
                description: "Could not generate the receipt. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild onClick={() => setReceiptUrl(null)}>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-md w-full">
                <DialogHeader>
                    <DialogTitle className="font-headline">Generate Receipt</DialogTitle>
                </DialogHeader>
                <div className="p-4 text-center">
                    {!receiptUrl && !isLoading && (
                         <>
                            <p className="mb-4 text-muted-foreground">Generate a shareable receipt for your last transaction to <span className="font-semibold text-foreground">{lastTransaction.customer}</span> for <span className="font-semibold text-foreground">{lastTransaction.details}</span>.</p>
                            <Button onClick={handleGenerate} className="w-full">Generate</Button>
                        </>
                    )}
                    
                    {isLoading && (
                        <div className="flex flex-col items-center justify-center h-48">
                            <Loader2 className="h-12 w-12 animate-spin text-primary" />
                            <p className="mt-4 text-muted-foreground">Generating your receipt...</p>
                        </div>
                    )}
                    
                    {receiptUrl && (
                        <div className="space-y-4">
                            <div className="rounded-lg overflow-hidden border">
                                <Image src={receiptUrl} alt="Generated Receipt" width={400} height={500} className="w-full h-auto" />
                            </div>
                            <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                                <Share2 className="mr-2 h-4 w-4" /> Share on WhatsApp
                            </Button>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
