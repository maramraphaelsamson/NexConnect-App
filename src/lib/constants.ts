import { Shield, Calculator, Gift, User, Users, Clapperboard, Music, Globe, Settings, Briefcase, Activity } from "lucide-react";

export const NAV_LINKS = {
  Personal: [
    { href: "/locker", label: "Dashboard", icon: Shield },
    { href: "/calculator", label: "Activity", icon: Activity },
    { href: "/profile", label: "Profile", icon: User },
  ],
  Business: [
      { href: "/locker", label: "Dashboard", icon: Briefcase },
      { href: "/gift-spray", label: "Customers", icon: Users },
      { href: "/profile", label: "Settings", icon: Settings },
  ]
};

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
