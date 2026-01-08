import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";
import { Web3Provider } from "../providers/Web3Provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "EcoVibe v2",
  description: "Clean the World, Earn Crypto.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Web3Provider>
          <Sidebar />
          <div className="lg:ml-64">
            {children}
          </div>
        </Web3Provider>
      </body>
    </html>
  );
}