import type { Metadata } from "next";
import "./globals.css";
import { sanFrancisco } from "@/assets/fonts/sanfrancisco/san-francisco";
import { ThemeProvider } from "next-themes";
import { QueryProvider } from "@/contaxts/query-client-provider";

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
    <html
      lang="en"
      className={`${sanFrancisco.className} max-h-screen overflow-clip`}
      suppressHydrationWarning
    >
      <body className="h-screen w-screen bg-base-100 text-base-content transition-[color, background-color] duration-300 ease-[cubic-bezier(.4,0,.2,1)]">
        <ThemeProvider defaultTheme="light">
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
