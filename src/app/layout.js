import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "GitHub Screenshotter",
  description: "A tool to capture and share screenshots of GitHub contribution",
  author: "Joseph",
  keywords: [
    "GitHub",
    "screenshot",
    "tool",
    "capture",
    "share",
    "contribution",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script id="openpanel-init" strategy="beforeInteractive">
          {`
            window.op = window.op || function(...args) {
              (window.op.q = window.op.q || []).push(args);
            };
            window.op('init', {
              clientId: '1eba2285-3a01-4d0c-99c4-fab812650b47',
              trackScreenViews: true,
              trackOutgoingLinks: true,
              trackAttributes: true,
            });
          `}
        </Script>
        <Script src="https://openpanel.dev/op1.js" defer async />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
