import type { Metadata } from "next";
import "./globals.css";
import { sanFrancisco } from "@/assets/fonts/sanfrancisco/san-francisco";
import { ThemeProvider } from "next-themes";

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
      <body className="h-screen w-screen bg-base-100 text-base-content transition-[color, background-color] duration-300 ease-[cubic-bezier(.4,0,.2,1)]">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
