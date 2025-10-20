import { Geist, Geist_Mono } from "next/font/google";
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
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
  title: "Binary Converter ",
  description: "A converter to Binary, Octal and Decimal Number Systems.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      ><PrimeReactProvider>
        {children}
        </PrimeReactProvider>
      </body>
    </html>
  );
}
