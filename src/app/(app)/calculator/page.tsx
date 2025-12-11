"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { CALCULATOR_SLIDERS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { BuyDataSheet } from "@/components/dashboard/personal/BuyDataSheet";

const USAGE_MULTIPLIERS = {
  social: 0.2, // GB per hour
  video: 0.5,
  music: 0.1,
  browsing: 0.1,
};

type Usage = {
  social: number;
  video: number;
  music: number;
  browsing: number;
};

export default function CalculatorPage() {
  const [usage, setUsage] = useState<Usage>({
    social: 2,
    video: 1,
    music: 1,
    browsing: 3,
  });

  const handleSliderChange = (id: keyof Usage, value: number[]) => {
    setUsage((prev) => ({ ...prev, [id]: value[0] }));
  };

  const estimatedWeeklyGB = useMemo(() => {
    const dailyGB = 
      usage.social * USAGE_MULTIPLIERS.social +
      usage.video * USAGE_MULTIPLIERS.video +
      usage.music * USAGE_MULTIPLIERS.music +
      usage.browsing * USAGE_MULTIPLIERS.browsing;
    return dailyGB * 7;
  }, [usage]);

  return (
    <div className="p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Data Calculator</CardTitle>
          <CardDescription>Estimate your weekly data needs.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {CALCULATOR_SLIDERS.map(({ id, label, icon: Icon, color }) => (
            <div key={id}>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor={id} className="flex items-center gap-2 text-sm font-medium">
                  <Icon className={cn("w-5 h-5", color)} />
                  {label}
                </label>
                <span className="text-sm font-bold text-primary">{usage[id]} hrs/day</span>
              </div>
              <Slider
                id={id}
                min={0}
                max={12}
                step={0.5}
                value={[usage[id]]}
                onValueChange={(value) => handleSliderChange(id, value)}
              />
            </div>
          ))}
        </CardContent>
      </Card>
      
      <Card className="text-center p-6 bg-primary text-primary-foreground shadow-lg">
        <CardDescription className="text-blue-200">Estimated Weekly Usage</CardDescription>
        <p className="text-5xl font-bold my-2 font-headline">
            {estimatedWeeklyGB.toFixed(1)}
            <span className="text-3xl font-body ml-1">GB</span>
        </p>
      </Card>

      <BuyDataSheet>
        <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
          Top Up Locker Now <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </BuyDataSheet>
    </div>
  );
}
