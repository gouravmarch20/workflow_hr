import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HR Workflow Designer",
  description: "Visual workflow builder for HR processes",
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
