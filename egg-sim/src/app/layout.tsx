import { Geist, Geist_Mono } from 'next/font/google';
import { Metadata } from 'next';
import './globals.css';
import NavBar from './components/navBar';
import ClientProvider from './ClientProvider';
import ScrollManager from './components/scrollManager'; // Import the ScrollManager component

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Egg Simulator',
  description: 'Created by Ivan Wang, Evan Lin, and Jayden Chen',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-screen`}
      >
        <NavBar />
        <ClientProvider>
          <ScrollManager />
          <main className="flex-1 mt-[5rem]">{children}</main>
        </ClientProvider>
      </body>
    </html>
  );
}
