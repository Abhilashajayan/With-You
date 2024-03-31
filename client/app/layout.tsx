import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Bae | A Dating app & Make friends",
  description: "Bae | A Dating app & Make friends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <head>
      <link rel="icon" type="image/png" href="/BAE_transparent.png" />
      </head>
      <body className={inter.className}>
        <StoreProvider>{children}</StoreProvider>
        <Toaster />
      </body>
    </html>

  );
}
