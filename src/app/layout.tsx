import type { Metadata } from "next";
import "./globals.css";
import { sanFrancisco } from "@/assets/fonts/sanfrancisco/san-francisco";

export const metadata: Metadata = {
  title: "Meme Generator",
  description: "Meme Generator app",
  appleWebApp: {
    title: "Meme Generator",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" className={`${sanFrancisco.className}`}>
      <body className="bg-base-100 text-base-content">{children}</body>
    </html>
  );
}
