import { Shield, Calculator, Gift, User, Users, Clapperboard, Music, Globe } from "lucide-react";

export const NAV_LINKS = [
  { href: "/locker", label: "Locker", icon: Shield },
  { href: "/calculator", label: "Calculator", icon: Calculator },
  { href: "/gift-spray", label: "Gift/Spray", icon: Gift },
  { href: "/profile", label: "Profile", icon: User },
];

export const CALCULATOR_SLIDERS = [
  { id: "social", label: "Social Media", icon: Users, color: "text-blue-500" },
  { id: "video", label: "Video Streaming", icon: Clapperboard, color: "text-red-500" },
  { id: "music", label: "Music", icon: Music, color: "text-green-500" },
  { id: "browsing", label: "Browsing", icon: Globe, color: "text-purple-500" },
] as const;

export const GIFT_VIBES = [
  { id: "sapa-relief", label: "Sapa Relief", imageId: "sapa-relief" },
  { id: "for-my-love", label: "For My Love", imageId: "for-my-love" },
  { id: "work-flow", label: "Work Flow", imageId: "work-flow" },
] as const;
