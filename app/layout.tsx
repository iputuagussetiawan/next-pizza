import "./globals.css";
import {Nunito} from "next/font/google";
import { Suspense } from "react";
import toast, { Toaster } from 'react-hot-toast';

const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      
      <body className={`${nunito.variable}`}>       
        <Suspense> {children}</Suspense>
        <Toaster />
      </body>

    </html>
  );
}
