import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "/context/Providers";
const inter = Inter({ subsets: ["latin"] });
import {
  ClerkProvider,
 
} from '@clerk/nextjs'
import { dark } from "@clerk/themes";

export const metadata = {
  title: "MEANT",
  description: "A cosmetic e-commerce platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
     appearance={{
        baseTheme: dark,
        layout:{
          logoImageUrl:'/assets/images/logo.webp',
       
        }
      }}
    >
    

    <html lang="en">
      <body className={inter.className}>
      
        <Providers>
        
          {children}
        </Providers>

      </body>
    </html>
    </ClerkProvider>
  );
}
