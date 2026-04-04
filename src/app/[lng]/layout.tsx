import type { Metadata } from "next";
import { Geist_Mono, Barlow } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import { I18nProvider } from "next-i18next/client";
import { initServerI18next, getT, getResources, generateI18nStaticParams } from "next-i18next/server";
import i18nConfig from "@/i18n.config";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";

// Initialize server-side i18n at module scope
initServerI18next(i18nConfig);

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Grimoire - D&D Card Maker",
  description: "Create and manage your D&D 5e card decks.",
};

export async function generateStaticParams() {
  return generateI18nStaticParams();
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}>) {
  const { lng } = await params;
  const { i18n } = await getT();
  const resources = getResources(i18n, ["common"]);

  return (
    <html lang={lng} suppressHydrationWarning>
      <body
        className={cn(
          barlow.variable,
          geistMono.variable,
          "antialiased",
          "bg-background text-foreground font-sans",
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <I18nProvider language={lng} resources={resources}>
            {children}
          </I18nProvider>
          <Toaster position="bottom-center" />
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
