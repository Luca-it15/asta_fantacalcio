import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Fantasy Auction",
  description: "Asta Fantacalcio online con Next.js e WebSocket",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it">
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  );
}
