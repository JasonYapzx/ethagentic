import { Icons } from "@/components/common/icons";
import { EtherSymbol } from "ethers";
import {
  BrainIcon,
  CodeIcon,
  GlobeIcon,
  PlugIcon,
  UsersIcon,
  ZapIcon,
  Home, Search, Settings, PenToolIcon as Tool, User, MapPin,
  Package,
  Sparkles
} from "lucide-react";

export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {
  name: "Storagent",
  description: "Automated your inventory with natural language",
  cta: "Get Started",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  keywords: [
    "Storagent",
    "Automated Inventory System",
    "Smart Contract Integration",
    "AI Agent Workflow",
  ],
  links: {
    github: "https://github.com/eugenetayyj/ethagentic",
  },
  hero: {
    title: "Storagent",
    description:
      "Get assistance with your inventory management needs with Storagent, a powerful AI agent inventory management system.",
    cta: "Get Storagent",
    ctaDescription: "Stored entirely on-chain, ensuring transparency and security.",
  },
  features: [
    {
      name: "Natural Language Inventory Management",
      description:
        "Chat naturally with your AI agent to check stock levels, understand trends, and manage inventory effortlessly.",
      icon: <BrainIcon className="h-6 w-6" />,
    },
    {
      name: "Automated Restocking",
      description:
        "Let your AI agent monitor inventory levels and automatically restock items when needed, saving you time and preventing stockouts.",
      icon: <Sparkles className="h-6 w-6" />,
    },
    {
      name: "Smart Supplier Management",
      description:
        "Automatically discover and integrate new suppliers, compare prices, and maintain a robust supply chain network.",
      icon: <Package className="h-6 w-6" />,
    },
    {
      name: "Secure Automated Purchasing",
      description:
        "Enable your agent to make secure purchases using your verified credentials when stock levels are low.",
      icon: <PlugIcon className="h-6 w-6" />,
    },
    {
      name: "Real-time Analytics",
      description:
        "Get instant insights into inventory trends, supplier performance, and stock optimization recommendations.",
      icon: <CodeIcon className="h-6 w-6" />,
    },
    {
      name: "On-chain Transparency",
      description:
        "All inventory transactions and supplier interactions are recorded on-chain for complete transparency and auditability.",
      icon: <ZapIcon className="h-6 w-6" />,
    },
  ],
  pricing: [
    {
      name: "Basic",
      price: { monthly: "$9", yearly: "$99" },
      frequency: { monthly: "month", yearly: "year" },
      description: "Perfect for individuals and small projects.",
      features: [
        "100 AI generations per month",
        "Basic text-to-image conversion",
        "Email support",
        "Access to community forum",
      ],
      cta: "Get Started",
    },
    {
      name: "Pro",
      price: { monthly: "$29", yearly: "$290" },
      frequency: { monthly: "month", yearly: "year" },
      description: "Ideal for professionals and growing businesses.",
      features: [
        "1000 AI generations per month",
        "Advanced text-to-image conversion",
        "Priority email support",
        "API access",
        "Custom AI model fine-tuning",
        "Collaboration tools",
      ],
      cta: "Get Started",
    },
    {
      name: "Enterprise",
      price: { monthly: "$999", yearly: "Custom" },
      frequency: { monthly: "month", yearly: "year" },
      description: "Tailored solutions for large organizations.",
      features: [
        "Unlimited AI generations",
        "Dedicated account manager",
        "24/7 phone and email support",
        "Custom AI model development",
        "On-premises deployment option",
        "Advanced analytics and reporting",
      ],
      popular: true,
      cta: "Get Started",
    },
  ],
  footer: {
    socialLinks: [
      {
        icon: <Icons.github className="h-5 w-5" />,
        url: "https://github.com/eugenetayyj/ethagentic",
      },
      {
        icon: <Icons.etherueum className="h-5 w-5" />,
        url: "https://ethglobal.com/showcase?events=agents",
      },
    ],
    links: [
      { text: "ETHGlobal", url: "https://ethglobal.com/showcase?events=agents" },
      { text: "Contact", url: "https://github.com/eugenetayyj/ethagentic" },
    ],
    bottomText: "All rights reserved.",
    brandText: "STORAGENT",
  },
};

export type SiteConfig = typeof siteConfig;


export const AppNavBar = [
  { icon: Home, label: "Home", href: "/app" },
  { icon: Package, label: "Inventories", href: "/app/inventories" },
  { icon: Sparkles, label: "Assistant", href: "/app/assistant" },
  { icon: User, label: "Profile", href: "/app/profile" },
]
