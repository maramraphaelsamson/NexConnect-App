"use client"
import * as React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, Phone, Zap, History, Lightbulb, LifeBuoy, Handshake } from "lucide-react";
import { BuyDataSheet } from "@/components/dashboard/personal/BuyDataSheet";
import { BuyAirtimeSheet } from "@/components/dashboard/personal/BuyAirtimeSheet";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


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
      icon: Zap,
      href: "#",
      disabled: true,
      tooltip: "Coming Soon"
    },
    {
      label: "Borrow Data",
      icon: Handshake,
      href: "#",
      disabled: true,
      tooltip: "Coming Soon"
    },
    {
      label: "History",
      icon: History,
      href: "/history"
    }
  ];

  return (
    <div className="px-4">
      <h2 className="text-lg font-bold text-foreground mb-3 px-1 font-headline">Quick Actions</h2>
      <div className="grid grid-cols-4 gap-3">
        {actions.map((action) => {
           if (action.disabled) {
             return (
                <TooltipProvider key={action.label}>
                    <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                            <div>
                                <ActionCard icon={action.icon} label={action.label} disabled={true} />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{action.tooltip || "Coming Soon"}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
             )
           }
          if (action.component) {
            return React.cloneElement(action.component, { key: action.label });
          }
          return (
            <Link href={action.href || "#"} key={action.label} passHref>
                <ActionCard icon={action.icon} label={action.label} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}


function ActionCard({ icon: Icon, label, disabled = false }: { icon: React.ElementType, label: string, disabled?: boolean }) {
    return (
        <Card className={cn("h-24 flex flex-col items-center justify-center p-2 shadow-sm", 
            disabled 
            ? "bg-muted/50 cursor-not-allowed"
            : "hover:bg-secondary transition-colors hover:shadow-md cursor-pointer"
        )}>
            <div className={cn("p-3 rounded-full mb-2", disabled ? "bg-muted" : "bg-primary/10")}>
                <Icon className={cn("h-5 w-5", disabled ? "text-muted-foreground" : "text-primary")} />
            </div>
            <p className={cn("text-xs font-semibold text-center", disabled ? "text-muted-foreground" : "text-foreground")}>{label}</p>
        </Card>
    )
}
