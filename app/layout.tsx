import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const primaryFont = Open_Sans({ weight: ["400","500","600"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Habit Tracker",
  description: "A simple habit tracker app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${primaryFont.className} antialiased`}>{children}</body>
    </html>
  );
}
