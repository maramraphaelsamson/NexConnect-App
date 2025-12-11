import { BottomNav } from "@/components/BottomNav";
import { UserHeader } from "@/components/dashboard/UserHeader";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center bg-background min-h-screen">
        <div className="relative w-full max-w-md bg-background flex flex-col">
            <UserHeader />
            <main className="flex-1 pb-24 overflow-y-auto">
                {children}
            </main>
            <BottomNav />
        </div>
    </div>
  );
}
