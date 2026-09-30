import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata={title:{default:"CAGE Docs",template:"%s · CAGE Docs"},description:"Documentation for the closed-source CAGE emoji programming language."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
