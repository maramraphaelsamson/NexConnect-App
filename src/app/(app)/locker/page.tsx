"use client";

import { useApp } from "@/context/AppContext";
import { UserHeader } from "@/components/dashboard/UserHeader";
import { LockerCard } from "@/components/dashboard/LockerCard";
import { WalletCard } from "@/components/dashboard/WalletCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { BusinessDashboard } from "@/components/dashboard/BusinessDashboard";

export default function LockerPage() {
  const { mode } = useApp();

  return (
    <div className="h-full">
      {mode === 'Personal' ? (
        <>
          <UserHeader />
          <LockerCard />
          <WalletCard />
          <QuickActions />
        </>
      ) : (
        <BusinessDashboard />
      )}
    </div>
  );
}
