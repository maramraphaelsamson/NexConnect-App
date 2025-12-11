import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GiftForm } from "@/components/gift-spray/GiftForm";
import { SprayForm } from "@/components/gift-spray/SprayForm";

export default function GiftSprayPage() {
  return (
    <div className="p-4 space-y-6">
      <Card className="border-none shadow-none bg-transparent">
        <CardHeader className="p-0">
          <CardTitle className="font-headline text-3xl">Gift &amp; Spray Hub</CardTitle>
          <CardDescription>Share data with friends or go viral.</CardDescription>
        </CardHeader>
      </Card>
      
      <div className="grid grid-cols-1 gap-6">
        <GiftForm />
        <SprayForm />
      </div>
    </div>
  );
}
