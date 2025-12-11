# **App Name**: NexConnect

## Core Features:

- Locker Management: Securely store mobile data in a non-expiring 'Locker' and withdraw it when needed.
- Data Calculator: Estimate weekly data usage based on user-defined parameters. Provide a 'Top Up Locker Now' call to action button to take users straight to buying data.
- Data Spray: Generate unique, viral links for data giveaways, deducting data from the Locker and moving it to escrow, and use Redis to check claims before updating the database.
- Business Mode Toggle: Switch between Personal and Business modes, adjusting UI theme and applying reseller pricing, also adjusting Profit Tracking and Customer Management.
- Automated Business Sales: Generate Vendor link with associated profits for automated Business sales that occur via link clicks.
- Customer Management: Enable the Business-mode users to save Customers for faster and easier purchase
- Receipt Generation: Use generative AI to produce a 'receipt' image from recent transactions and share it via WhatsApp.

## Style Guidelines:

- Primary color: Deep Blue (#003366) for security and trust in the Locker feature.
- Accent color: Hot Pink (#FF69B4) to represent excitement and virality in the Spray and Gifting features.
- Background color: Light Blue (#E6F0FF) for a clean, modern mobile app feel.
- Font: 'PT Sans' (sans-serif) for the body, with 'Playfair' (serif) as the headline font. Note: currently only Google Fonts are supported.
- Fixed Bottom Navigation Bar for Locker, Calculator, Gift/Spray, and Profile.
- Vertical scroll layout optimized for phone screens, no sidebar.
- Modern, minimalist icons for navigation and actions.