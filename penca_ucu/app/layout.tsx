import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/css/bootstrap.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Penca UCU",
  description: "Penca UCU - Copa America 2024",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="app-body" >{children}</body>
    </html>
  );
}
