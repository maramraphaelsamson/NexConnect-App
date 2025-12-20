"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { FEATURE_SLIDES } from "@/lib/constants";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Autoplay from "embla-carousel-autoplay";
import { NexConnectLogo } from "@/components/NexConnectLogo";

export default function WelcomePage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-br from-primary via-cyan-500 to-emerald-500 text-white overflow-hidden">
      <main className="flex-1 flex flex-col items-center justify-center text-center p-4 md:p-8 z-10">
        <div className="relative w-48 h-48 mb-6 animate-fade-in-down">
          <NexConnectLogo />
        </div>

        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4 animate-fade-in-up">
          Welcome to NexConnect
        </h1>
        <p className="max-w-md text-base md:text-lg text-blue-100 mb-8 animate-fade-in-up animation-delay-300">
          Your one-stop shop to buy cheap data, top-up airtime, pay bills, and
          share data with friends.
        </p>

        <Carousel
          className="w-full max-w-sm md:max-w-md lg:max-w-lg mb-8 animate-fade-in-up animation-delay-500"
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: true,
            }),
          ]}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-2">
            {FEATURE_SLIDES.map((slide) => {
              const image = PlaceHolderImages.find(img => img.id === slide.imageId);
              return (
                <CarouselItem key={slide.id} className="pl-4 basis-full">
                  <Card className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardContent className="flex flex-col items-center justify-center p-4 aspect-video relative overflow-hidden">
                       {image && (
                        <Image
                          src={image.imageUrl}
                          alt={slide.title}
                          data-ai-hint={image.imageHint}
                          fill
                          className="object-cover opacity-20"
                        />
                      )}
                      <div className="z-10 flex flex-col items-center text-center">
                        <div className="p-3 bg-white/20 rounded-full mb-3">
                           <slide.icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-lg font-bold font-headline text-white">{slide.title}</h3>
                        <p className="text-xs text-blue-100 px-4">{slide.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <CarouselPrevious className="left-2 hidden sm:flex" />
          <CarouselNext className="right-2 hidden sm:flex" />
        </Carousel>

        <Link href="/signup" passHref>
          <Button
            size="lg"
            className="w-full max-w-xs bg-white text-primary hover:bg-gray-200 animate-fade-in-up animation-delay-900 transform hover:scale-105 transition-transform"
          >
            Get Started <ArrowRight className="ml-2" />
          </Button>
        </Link>
      </main>

      <footer className="p-4 text-center text-xs text-white/50 z-10">
        <p>
          &copy; {new Date().getFullYear()} Tunde Ventures. All rights reserved.
        </p>
      </footer>

      {/* Background Gradient Shapes */}
      <div className="absolute top-0 -left-1/4 w-96 h-96 bg-white/5 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute -bottom-16 right-0 w-80 h-80 bg-emerald-300/10 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
    </div>
  );
}
