import { Geist, Geist_Mono } from 'next/font/google';
import { Metadata } from 'next';
import './globals.css';
import NavBar from './components/navBar';
import ClientProvider from './ClientProvider';
import ScrollManager from './components/scrollManager'; // Import the ScrollManager component
import MusicPlayer from "./components/musicplayer"; // MusicPlayer for background music

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
  description: 'Created by Ivan Wang, Evan Lin, Raymond Zheng, and Jayden Chen',
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-screen text-black`}
      >
        <NavBar />
        <ClientProvider>
          <ScrollManager />
          <main className=" flex-1 border-6 border-[#C89F77]">{children}</main>
        </ClientProvider>
        <MusicPlayer/>
      </body>
    </html>
  );
}
