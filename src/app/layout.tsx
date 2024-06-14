import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import clsx from "clsx";
import AppHeader from "@/components/common/AppHeader";
import VhMobile from "@/components/common/VhMobile";
import QueryProvider from "@/components/common/QueryProvider";

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
        <main className="w-full flex flex-1 flex-col md:w-[640px] bg-white">
          <AppHeader />
          <QueryProvider>
            {children}
          </QueryProvider>
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
