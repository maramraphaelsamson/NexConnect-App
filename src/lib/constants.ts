import { Shield, Calculator, Gift, User, Users, Clapperboard, Music, Globe, Settings, Briefcase, Activity, Wallet, Smartphone, Lightbulb, LifeBuoy } from "lucide-react";

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

export const FEATURE_SLIDES = [
  {
    id: "data-locker",
    title: "Secure Data Locker",
    description: "Buy data in bulk and store it forever. No more expiry dates!",
    icon: Shield,
    imageId: "feature-data-locker",
  },
  {
    id: "wallet",
    title: "Easy-to-Fund Wallet",
    description: "Top up your wallet securely and make payments in a snap.",
    icon: Wallet,
    imageId: "feature-wallet",
  },
  {
    id: "gift-data",
    title: "Gift & Spray Data",
    description: "Share data with friends or create viral giveaways for your audience.",
    icon: Gift,
    imageId: "feature-gift",
  },
  {
    id: "business-mode",
    title: "Become a Reseller",
    description: "Switch to Business Mode and start earning by selling data and airtime.",
    icon: Briefcase,
    imageId: "feature-business",
  },
];
