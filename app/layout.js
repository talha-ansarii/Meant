import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "/context/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MEANT",
  description: "A cosmetic e-commerce platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
