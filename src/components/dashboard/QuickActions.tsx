import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Smartphone, Phone, Zap, History } from "lucide-react";
import { BuyDataSheet } from "@/components/dashboard/personal/BuyDataSheet";
import { BuyAirtimeSheet } from "@/components/dashboard/personal/BuyAirtimeSheet";

export function QuickActions() {
  return (
    <div className="px-4">
      <h2 className="text-lg font-bold text-foreground mb-2 px-2 font-headline">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-4">
        
        <BuyDataSheet>
          <Card className="h-32 flex flex-col items-center justify-center p-4 hover:bg-accent/50 transition-colors shadow-sm hover:shadow-md cursor-pointer">
            <Smartphone className="h-8 w-8 text-primary mb-2" />
            <p className="text-sm font-semibold text-center text-foreground">Buy Data</p>
          </Card>
        </BuyDataSheet>
        
        <BuyAirtimeSheet>
          <Card className="h-32 flex flex-col items-center justify-center p-4 hover:bg-accent/50 transition-colors shadow-sm hover:shadow-md cursor-pointer">
            <Phone className="h-8 w-8 text-primary mb-2" />
            <p className="text-sm font-semibold text-center text-foreground">Buy Airtime</p>
          </Card>
        </BuyAirtimeSheet>
        
        <Link href="#" passHref>
          <Card className="h-32 flex flex-col items-center justify-center p-4 hover:bg-accent/50 transition-colors shadow-sm hover:shadow-md">
            <Zap className="h-8 w-8 text-primary mb-2" />
            <p className="text-sm font-semibold text-center text-foreground">Pay Bills</p>
          </Card>
        </Link>
        
        <Link href="#" passHref>
          <Card className="h-32 flex flex-col items-center justify-center p-4 hover:bg-accent/50 transition-colors shadow-sm hover:shadow-md">
            <History className="h-8 w-8 text-primary mb-2" />
            <p className="text-sm font-semibold text-center text-foreground">History</p>
          </Card>
        </Link>
        
      </div>
    </div>
  );
}
