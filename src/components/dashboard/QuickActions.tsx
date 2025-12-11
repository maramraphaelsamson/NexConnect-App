import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, Phone, Zap, History, Lightbulb } from "lucide-react";
import { BuyDataSheet } from "@/components/dashboard/personal/BuyDataSheet";
import { BuyAirtimeSheet } from "@/components/dashboard/personal/BuyAirtimeSheet";

export function QuickActions() {
  const actions = [
    {
      label: "Buy Data",
      icon: Smartphone,
      component: <BuyDataSheet><ActionCard icon={Smartphone} label="Buy Data" /></BuyDataSheet>
    },
    {
      label: "Buy Airtime",
      icon: Phone,
      component: <BuyAirtimeSheet><ActionCard icon={Phone} label="Buy Airtime" /></BuyAirtimeSheet>
    },
    {
      label: "Pay Bills",
      icon: Lightbulb,
      href: "#"
    },
    {
      label: "History",
      icon: History,
      href: "#"
    }
  ];

  return (
    <div className="px-4">
      <h2 className="text-lg font-bold text-foreground mb-3 px-1 font-headline">Quick Sell (POS)</h2>
      <div className="grid grid-cols-4 gap-3">
        {actions.map((action) => (
           action.component ? action.component :
          <Link href={action.href || "#"} key={action.label} passHref>
              <ActionCard icon={action.icon} label={action.label} />
          </Link>
        ))}
      </div>
    </div>
  );
}


function ActionCard({ icon: Icon, label }: { icon: React.ElementType, label: string }) {
    return (
        <Card className="h-24 flex flex-col items-center justify-center p-2 hover:bg-secondary transition-colors shadow-sm hover:shadow-md cursor-pointer">
            <div className="bg-primary/10 p-3 rounded-full mb-2">
                <Icon className="h-5 w-5 text-primary" />
            </div>
            <p className="text-xs font-semibold text-center text-foreground">{label}</p>
        </Card>
    )
}
