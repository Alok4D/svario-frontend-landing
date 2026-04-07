import ReduxProvider from "@/redux/ReduxProvider";
import type { Metadata } from "next";
import { Big_Shoulders, Manrope } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const bigShoulders = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const manrope = Manrope({
  variable: "--font-manrope",
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
        className={`${bigShoulders.className} ${bigShoulders.variable} ${manrope.variable} antialiased`}
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
