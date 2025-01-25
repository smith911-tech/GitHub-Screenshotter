import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
        <meta
          name="google-site-verification"
          content="nD29tshy6v_FR2eopYjdeY36S65XJccsKVnFa_0YPYY"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
