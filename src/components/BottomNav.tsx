"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useApp } from "@/context/AppContext";

export function BottomNav() {
  const pathname = usePathname();
  const { mode } = useApp();
  const links = NAV_LINKS[mode];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-card border-t border-border shadow-t-lg z-50 max-w-md mx-auto rounded-t-2xl">
      <div className="flex justify-around items-center h-full">
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full transition-colors duration-200 gap-1",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              <div className={cn("p-2 rounded-lg", isActive && "bg-primary/10")}>
                <Icon className="h-6 w-6" />
              </div>
              <span className="text-xs font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
