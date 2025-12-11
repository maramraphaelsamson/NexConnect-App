"use client";

import { useApp } from "@/context/AppContext";
import { LockerCard } from "@/components/dashboard/LockerCard";
import { WalletCard } from "@/components/dashboard/WalletCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { BusinessDashboard } from "@/components/dashboard/BusinessDashboard";

export default function LockerPage() {
  const { mode } = useApp();

  return (
    <div className="h-full">
      {mode === 'Personal' ? (
        <div className="space-y-4">
          <LockerCard />
          <WalletCard />
          <QuickActions />
        </div>
      ) : (
        <BusinessDashboard />
      )}
    </div>
  );
}
