import Script from "next/script";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GeistMono } from "geist/font/mono";

import SheetProvider from "@/providers/SheetProvider";
import JotaiProvider from "@/providers/JotaiProvider";
import ToastProvider from "@/providers/ToastProvider";
import PlatformProvider from "@/providers/PlatformProvider";
import BackButtonProvider from "@/providers/BackButtonProvider";

import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
	title: "ULT100x Burn",
	description: "ULT100x Burn",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${inter.variable} ${GeistMono.variable}`}>
			<head>
				<Script
					src="https://telegram.org/js/telegram-web-app.js"
					strategy="beforeInteractive"
				/>
			</head>
			<body>
				<JotaiProvider>
					<ToastProvider />
					{children}
					<PlatformProvider />
					<BackButtonProvider />
					<SheetProvider />
				</JotaiProvider>
			</body>
		</html>
	);
}
