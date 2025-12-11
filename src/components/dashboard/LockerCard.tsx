import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BuyDataSheet } from "@/components/dashboard/personal/BuyDataSheet";
import { Skeleton } from "@/components/ui/skeleton";

interface LockerCardProps {
    balance: number | null;
    isLoading: boolean;
}

export function LockerCard({ balance, isLoading }: LockerCardProps) {

  return (
    <Card className="m-4 bg-gradient-to-br from-blue-500 to-cyan-400 text-primary-foreground shadow-lg">
      <CardHeader>
        <CardDescription className="text-blue-100">Data Locker</CardDescription>
        <CardTitle className="text-5xl font-bold font-headline">
          {isLoading ? (
            <Skeleton className="h-12 w-36 bg-white/30" />
          ) : (
            <>
              {(balance ?? 0).toFixed(2)} <span className="text-3xl font-body">GB</span>
            </>
          )}
        </CardTitle>
        <p className="text-sm text-blue-200 pt-1">Non-Expiring Storage</p>
      </CardHeader>
      <CardContent className="flex gap-4 pt-2">
        <Button variant="outline" className="w-full bg-transparent hover:bg-white/10 text-white border-white/50">
          Withdraw
        </Button>
        <BuyDataSheet>
          <Button variant="secondary" className="w-full bg-white hover:bg-gray-100 text-blue-600 font-semibold">
            Add Bulk
          </Button>
        </BuyDataSheet>
      </CardContent>
    </Card>
  );
}
