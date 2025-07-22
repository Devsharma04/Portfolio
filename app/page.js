"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Github, Linkedin } from "lucide-react";
import { logos } from "@/constants";

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
    <>
      <div className="relative h-screen w-full">
        {/* Loading Screen */}
        <div
          className="fixed inset-0 bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center z-50 overflow-hidden"
          ref={loadingRef}
          style={{ overflow: "hidden" }}
        >
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 font-mono ">
              Hello World
              <span className="text-green-400 ml-2 animate-ping">|</span>
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full opacity-70"></div>
          </div>
        </div>

        {/* Main Content */}
        <main className="min-h-screen w-full bg-[#0a0a0a]">
          <section className="h-screen bg-neutral-950 w-full px-16">
            <BackgroundBeams />
            <div className="h-full flex flex-col gap-6 justify-center ">
              <h1 className="text-7xl text-neutral-200">I'm Dev Sharma</h1>
              <p className="text-2xl text-neutral-200">
                I am a{" "}
                <span className="text-red-500 animate-(--animate-blink-faulty) shadow-[--shadow-blink-faulty]">
                  Web
                </span>{" "}
                <span className="text-blue-500 animate-(--animate-blink-faulty) delay-[300ms] shadow-[--shadow-blink-faulty]">
                  Developer
                </span>
              </p>

              <a>About Me</a>

              <div className="flex gap-4">
                <a>
                  <Linkedin className="w-8 text-neutral-300 h-8" />
                </a>
                <a>
                  <Github className="w-8 text-neutral-300 h-8" />
                </a>
              </div>
            </div>
          </section>
          <section className="h-screen w-full">
            <h2 className="text-6xl text-white text-center mb-8">Skills</h2>
            <div className="flex max-w-5xl mx-auto items-center flex-wrap justify-center gap-12">
              {logos.map((item, index) => (
                <div key={index} className="flex flex-col items-center ">
                  <div className="flex items-center justify-center w-20 h-20 mb-2">
                    <img
                      className="filter grayscale hover:grayscale-0 hover:scale-125 transition duration-300 max-h-10 max-w-10 object-contain"
                      src={item.src}
                      alt={item.alt}
                    />
                  </div>
                  <p className="text-neutral-300 font-bold text-center">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
