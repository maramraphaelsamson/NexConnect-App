"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function WelcomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-blue-50">
      <main className="flex-1 flex flex-col items-center justify-center text-center p-8">
        <div className="relative w-48 h-48 mb-8">
          <Image
            src="https://picsum.photos/seed/rocket/300/300"
            alt="NexConnect Rocket"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
            data-ai-hint="rocket launch"
          />
        </div>

        <h1 className="text-4xl font-headline font-bold text-primary mb-4">
          Welcome to NexConnect
        </h1>
        <p className="max-w-md text-lg text-muted-foreground mb-8">
          Your one-stop shop to buy cheap data, top-up airtime, pay bills, and
          share data with friends.
        </p>

        <Link href="/signup" passHref>
          <Button size="lg" className="w-full max-w-xs">
            Get Started <ArrowRight className="ml-2" />
          </Button>
        </Link>
      </main>

      <footer className="p-4 text-center text-xs text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Tunde Ventures. All rights reserved.</p>
      </footer>
    </div>
  );
}
