import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine, PlusCircle } from "lucide-react";
import { BuyDataSheet } from "@/components/dashboard/personal/BuyDataSheet";

export function LockerCard() {
  const lockerBalance = 120.5; // Dummy data

  return (
    <Card className="m-4 bg-gradient-to-br from-primary to-blue-800 text-primary-foreground shadow-lg">
      <CardHeader>
        <CardDescription className="text-blue-200">Locker Balance</CardDescription>
        <CardTitle className="text-4xl font-bold font-headline">
          {lockerBalance.toFixed(1)} <span className="text-2xl font-body">GB</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex gap-4">
        <Button variant="secondary" className="w-full bg-white/20 hover:bg-white/30 text-white">
          <ArrowDownToLine className="mr-2 h-4 w-4" /> Withdraw
        </Button>
        <BuyDataSheet>
          <Button variant="secondary" className="w-full bg-white/90 hover:bg-white text-primary">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Bulk
          </Button>
        </BuyDataSheet>
      </CardContent>
    </Card>
  );
}
