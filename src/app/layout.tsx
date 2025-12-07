import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Fake NextAuth App",
  description: "Next.js + fake credentials login example",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
