import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@aws-amplify/ui-react/styles.css";
import "./globals.css";
import AuthDetailsContextProvider from "@/context/auth-details.context";
import AmplifyProvider from "@/context/amplify.context";
import Header from "@/components/header/header.components";
import { getAuthUserDetails } from "@/utils/amplify.server";
import StoreProvider from "@/context/store-provider.contex";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yushen Farewell Web App - Offshore",
  description: "A web application for Yushen's farewell gallery of memories.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authDetails = await getAuthUserDetails();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AmplifyProvider>
          <StoreProvider authDetails={authDetails}>
            <AuthDetailsContextProvider authDetails={authDetails}>
              <Header />
              {children}
            </AuthDetailsContextProvider>
          </StoreProvider>
        </AmplifyProvider>
      </body>
    </html>
  );
}
