import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Logistic Coordinator",
  description: "AI-assisted route coordination, live freight tracking, and retail appointment booking for Costco and Sam's Club delivery workflows."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
