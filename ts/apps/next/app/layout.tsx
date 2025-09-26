import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "@/providers/client-providers";
import Header from "@/components/header";
import Footer from "@/components/footer";
import GradientBackground from "@/components/background/gradient-background";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Geney - AI-Powered Biochemistry Research",
  description:
    "Accelerate discovery with intelligent automation and AI-powered insights for biochemistry research",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientProviders>
          <div className="flex flex-col min-h-screen relative">
            <GradientBackground />
            <Header />
            <main className="flex-grow relative z-0 pt-24">{children}</main>
            <Footer />
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}
