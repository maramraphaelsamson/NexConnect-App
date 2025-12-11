"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wifi, Smartphone, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const FloatingIcon = ({ icon: Icon, className }: { icon: React.ElementType, className?: string }) => (
  <div className={cn("absolute rounded-full bg-white/10 p-3 shadow-lg backdrop-blur-sm", className)}>
    <Icon className="h-6 w-6 text-white" />
  </div>
);

export default function WelcomePage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-br from-primary to-cyan-500 text-white overflow-hidden">
      <main className="flex-1 flex flex-col items-center justify-center text-center p-8 z-10">
        
        {/* Floating Icons for background animation */}
        <FloatingIcon icon={Wifi} className="top-[15%] left-[10%] animate-pulse" />
        <FloatingIcon icon={Smartphone} className="top-[25%] right-[15%] animate-pulse delay-500" />
        <FloatingIcon icon={Zap} className="bottom-[30%] left-[20%] animate-pulse delay-1000" />
        <FloatingIcon icon={ArrowRight} className="bottom-[20%] right-[25%] animate-pulse delay-700" />

        <div className="relative w-48 h-48 mb-8 animate-fade-in-down">
          <Image
            src="https://storage.googleapis.com/project-spark-302915.appspot.com/users%2Fstudio-output%2F9b9901d8-0056-4c4f-a92c-633054f3b610.png"
            alt="NexConnect Logo"
            layout="fill"
            objectFit="contain"
          />
        </div>

        <h1 className="text-5xl font-headline font-bold mb-4 animate-fade-in-up">
          Welcome to NexConnect
        </h1>
        <p className="max-w-md text-lg text-blue-100 mb-8 animate-fade-in-up animation-delay-300">
          Your one-stop shop to buy cheap data, top-up airtime, pay bills, and
          share data with friends.
        </p>

        <Link href="/signup" passHref>
          <Button 
            size="lg" 
            className="w-full max-w-xs bg-white text-primary hover:bg-gray-200 animate-fade-in-up animation-delay-600 transform hover:scale-105 transition-transform"
          >
            Get Started <ArrowRight className="ml-2" />
          </Button>
        </Link>
      </main>

      <footer className="p-4 text-center text-xs text-white/50 z-10">
        <p>&copy; {new Date().getFullYear()} Tunde Ventures. All rights reserved.</p>
      </footer>

      {/* Background Gradient Shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-300/10 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
    </div>
  );
}
