import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

export function WalletCard() {
  const walletBalance = 15000.00; // Dummy data

  return (
    <Card className="mx-4 my-6 shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardDescription>Cash Balance</CardDescription>
          <CardTitle className="text-3xl font-bold font-headline">
            ₦{walletBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </CardTitle>
        </div>
        <Button>
          <Wallet className="mr-2 h-4 w-4" /> Fund Wallet
        </Button>
      </CardHeader>
      <CardContent>
        {/* Can add more details here if needed */}
      </CardContent>
    </Card>
  );
}
