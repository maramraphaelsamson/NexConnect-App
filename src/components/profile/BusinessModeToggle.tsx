"use client";

import { useApp } from "@/context/AppContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function BusinessModeToggle() {
  const { mode, toggleMode } = useApp();

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="font-headline">Mode Switch</CardTitle>
        <CardDescription>
          {mode === 'Personal' 
            ? 'Switch to the reseller dashboard for wholesale prices.'
            : 'Return to your personal dashboard.'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
          <Label htmlFor="business-mode" className="font-semibold text-lg">
            💼 Business Mode
          </Label>
          <Switch
            id="business-mode"
            checked={mode === 'Business'}
            onCheckedChange={toggleMode}
          />
        </div>
      </CardContent>
    </Card>
  );
}
