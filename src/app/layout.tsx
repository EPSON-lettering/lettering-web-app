import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import clsx from "clsx";
import AppHeader from "@/components/common/AppHeader";
import QueryProvider from "@/components/common/QueryProvider";
import GNB from "@/components/common/GNB";

export const metadata: Metadata = {
  title: "Lettering",
  description: "letter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/*<VhMobile />*/}
      <body className={clsx([
          pretendard.className, pretendard.variable,
          'flex justify-center h-full'
      ])}>
        <main id="root" className="w-full flex flex-1 relative flex-col md:w-[640px] bg-white">
          <AppHeader />
          <QueryProvider>
            {children}
          </QueryProvider>
          <GNB />
          <div id="portal" />
        </main>
      </body>
    </html>
  );
}

const pretendard = localFont({
  src: [
    {
      path: '../../public/font/Pretendard-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/font/Pretendard-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/font/Pretendard-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/font/Pretendard-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font--pretendard',
});
