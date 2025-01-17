import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
// import "./globals.css";
import { Providers } from '@/app/provider/provider';
import AppHeader from '@/component/app.header';
import AppFooter from '@/component/app.footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AppHeader />
          {children}
          <AppFooter />
        </Providers>
      </body>
    </html>
  );
}
