import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: "Fanta Asta",
  description: "Applicazione web per asta di fantacalcio",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it">
      <body className="bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}
