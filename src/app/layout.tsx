import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";

const font = Lora({
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Senandika Space",
  description: "Merangkai karya merawat jiwa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        {children}
      </body>
    </html>
  );
}
