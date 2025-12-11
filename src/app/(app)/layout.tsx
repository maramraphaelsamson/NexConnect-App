import { BottomNav } from "@/components/BottomNav";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center bg-background min-h-screen">
        <div className="relative w-full max-w-md bg-background flex flex-col">
            <main className="flex-1 pb-20 overflow-y-auto">
                {children}
            </main>
            <BottomNav />
        </div>
    </div>
  );
}
