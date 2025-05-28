"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
export default function Home() {
  const loadingRef = useRef(null);
  useGSAP(() => {
    const timer = setTimeout(() => {
      gsap.to(loadingRef.current, {
        opacity: 0,
        duration: 1,
        y: "-100vh",
        ease: "power2.inOut",
      });
    }, 2000);
    return () => clearTimeout(timer);
  });
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Loading Screen */}
      <div
        className="fixed inset-0 bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center z-50"
        ref={loadingRef}
      >
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 font-mono">
            Hello World
            <span className="text-green-400 ml-2 animate-ping">|</span>
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full opacity-70"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100">
        hello
      </div>
    </div>
  );
}
