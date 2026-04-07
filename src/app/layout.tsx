import ReduxProvider from "@/redux/ReduxProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Svario.is",
  description: "AI Support Hub - Connecting support workers and providers",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} ${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        {/* <RecaptchaProvider> */}
        <ReduxProvider>
          <Toaster richColors />

          <div className="min-h-screen">{children}</div>
        </ReduxProvider>

        {/* </RecaptchaProvider> */}
      </body>
    </html>
  );
}
