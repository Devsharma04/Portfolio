import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactLenis } from "@/utils/lenis";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dev - Portfolio",
  description: "Portfolio of Dev Sharma, a web developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactLenis
          root
          options={{
            lerp: 0.075, // Lower value = smoother scroll (default is 0.1)
            duration: 1.7, // Slightly longer duration for smoother feel
            smoothWheel: true,
            wheelMultiplier: 0.7, // Reduce wheel sensitivity for smoother scrolling
            touchMultiplier: 1.5,
            infinite: false,
          }}
        >
          {children}
        </ReactLenis>
      </body>
    </html>
  );
}
