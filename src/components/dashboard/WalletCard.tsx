import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "../ui/skeleton";
import { FundWalletSheet } from "./personal/FundWalletSheet";

interface WalletCardProps {
    balance: number | null;
    isLoading: boolean;
}

export function WalletCard({ balance, isLoading }: WalletCardProps) {
  return (
    <Card className="mx-4 my-6 shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardDescription>Wallet Balance (Naira)</CardDescription>
          <CardTitle className="text-3xl font-bold font-headline">
             {isLoading ? (
                <Skeleton className="h-8 w-48 mt-1" />
             ) : (
                `₦${(balance ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
             )}
          </CardTitle>
        </div>
        <FundWalletSheet>
            <Button variant="accent" className="bg-accent text-accent-foreground font-semibold">
              Fund Wallet
            </Button>
        </FundWalletSheet>
      </CardHeader>
    </Card>
  );
}
