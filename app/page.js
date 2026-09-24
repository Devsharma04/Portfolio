"use client";
import { useRef, useCallback, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Github,
  Linkedin,
  ExternalLink,
  Mail,
  Copy,
  Check,
  Code2,
  Sparkles,
  Terminal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { logos, projects } from "@/constants";
import Image from "next/image";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef(null);
  const [copied, setCopied] = useState(false);
const projectsRef = useRef(null);
const [activeProject, setActiveProject] = useState(0);

const scrollProjects = useCallback((direction) => {
  const container = projectsRef.current;
  if (!container) return;

  const card = container.querySelector("[data-project-card]");
  if (!card) return;

  const gap = 24;
  const scrollAmount = card.getBoundingClientRect().width + gap;

  container.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth",
  });
}, []);

const handleProjectsScroll = useCallback(() => {
  const container = projectsRef.current;
  if (!container) return;

  const card = container.querySelector("[data-project-card]");
  if (!card) return;

  const gap = 24;
  const cardWidth = card.getBoundingClientRect().width + gap;

  const index = Math.round(container.scrollLeft / cardWidth);

  setActiveProject(
    Math.min(
      Math.max(index, 0),
      Math.max(projects.length - 1, 0)
    )
  );
}, []);

const goToProject = useCallback((index) => {
  const container = projectsRef.current;
  if (!container) return;

  const card = container.querySelector("[data-project-card]");
  if (!card) return;

  const gap = 24;
  const cardWidth = card.getBoundingClientRect().width + gap;

  container.scrollTo({
    left: index * cardWidth,
    behavior: "smooth",
  });
}, []);
  // Mouse move handler for the dynamic GPU-accelerated spotlight
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    containerRef.current.style.setProperty("--mouse-x", `${x}px`);
    containerRef.current.style.setProperty("--mouse-y", `${y}px`);
  }, []);

  // Email copy function
  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText("devsharma04.dev@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  useGSAP(() => {
    // Smooth entry animations for Hero
    gsap.fromTo(
      ".fade-in-nav",
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
    gsap.fromTo(
      ".fade-in-hero",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.15 }
    );

    // Scroll Trigger animations for sections
    const sections = ["#about", "#skills", "#projects", "#contact"];
    sections.forEach((secId) => {
      const element = document.querySelector(secId);
      if (element) {
        gsap.fromTo(
          element.querySelectorAll(".scroll-fade"),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-[#050508] bg-dot-grid bg-spotlight text-neutral-200 selection:bg-purple-500/30 overflow-x-hidden"
    >
      {/* Floating Navigation */}
      <nav className="fade-in-nav fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between w-[92%] max-w-3xl px-6 py-3 rounded-full bg-neutral-900/60 backdrop-blur-md border border-neutral-800/40 shadow-lg shadow-black/30">
        <a href="#" className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200">
          <Code2 className="w-5 h-5 text-purple-400" />
          <span className="text-sm font-semibold tracking-wider text-white uppercase font-mono">Dev.S</span>
        </a>
        <div className="flex items-center gap-6 text-sm">
          <a href="#about" className="text-neutral-400 hover:text-white transition-colors duration-200">About</a>
          <a href="#skills" className="text-neutral-400 hover:text-white transition-colors duration-200">Skills</a>
          <a href="#projects" className="text-neutral-400 hover:text-white transition-colors duration-200">Projects</a>
          <a href="#contact" className="text-neutral-400 hover:text-white transition-colors duration-200">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center max-w-6xl mx-auto px-6 pt-24 sm:pt-32">
        <div className="space-y-6 max-w-3xl">
          <div className="fade-in-hero inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Available for Freelance & Full-time Roles
          </div>
          <h1 className="fade-in-hero text-5xl sm:text-7xl font-bold tracking-tight text-white leading-tight">
            Dev Sharma
          </h1>
          <h2 className="fade-in-hero text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Web Developer
          </h2>
          <p className="fade-in-hero text-neutral-400 text-lg sm:text-xl leading-relaxed max-w-2xl font-light">
            I craft high-performance web applications blending clean engineering, modern UI/UX design, and premium animations.
          </p>
          <div className="fade-in-hero flex flex-wrap gap-4 pt-4">
            <a
              href="#projects"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-sm transition-all duration-300 shadow-lg shadow-purple-500/20"
            >
              Explore Projects
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-full bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white font-medium text-sm transition-all duration-300"
            >
              Get in Touch
            </a>
          </div>
          <div className="fade-in-hero flex items-center gap-6 pt-6 text-neutral-400">
            <a
              href="https://www.linkedin.com/in/dev-sharma-a31748232/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition-colors duration-200"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="https://github.com/Devsharma04"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition-colors duration-200"
            >
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 sm:py-32 border-t border-neutral-900 bg-neutral-950/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Code Snippet Card */}
            <div className="scroll-fade lg:col-span-6 order-2 lg:order-1">
              <div className="relative rounded-2xl bg-neutral-900/60 border border-neutral-800/80 shadow-2xl overflow-hidden font-mono text-sm leading-relaxed">
                {/* Editor Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-neutral-900/80 border-b border-neutral-800/80">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <Terminal className="w-3.5 h-3.5" />
                    dev_profile.js
                  </div>
                </div>
                {/* Editor Content */}
                <div className="p-6 overflow-x-auto text-neutral-400 no-scrollbar space-y-1">
                  <p><span className="text-purple-400">const</span> developer = &#123;</p>
                  <p className="pl-4">name: <span className="text-green-300">&quot;Dev Sharma&quot;</span>,</p>
                  <p className="pl-4">role: <span className="text-green-300">&quot;Web Developer&quot;</span>,</p>
                  <p className="pl-4">stack: [</p>
                  <p className="pl-8"><span className="text-green-300">&quot;React&quot;</span>, <span className="text-green-300">&quot;Next.js&quot;</span>,</p>
                  <p className="pl-8"><span className="text-green-300">&quot;TailwindCSS&quot;</span>, <span className="text-green-300">&quot;Node.js&quot;</span></p>
                  <p className="pl-4">],</p>
                  <p className="pl-4">approaches: [</p>
                  <p className="pl-8"><span className="text-green-300">&quot;Clean Code&quot;</span>, <span className="text-green-300">&quot;Pixel-Perfect UI&quot;</span>,</p>
                  <p className="pl-8"><span className="text-green-300">&quot;Interactive Animations&quot;</span></p>
                  <p className="pl-4">],</p>
                  <p className="pl-4">collaborating: <span className="text-yellow-300">true</span></p>
                  <p>&#125;;</p>
                </div>
              </div>
            </div>

            {/* Right: Text Description */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <div className="scroll-fade inline-flex items-center gap-2 text-purple-400 text-sm font-semibold tracking-wide uppercase">
                <Sparkles className="w-4 h-4" />
                About Me
              </div>
              <h3 className="scroll-fade text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Engineering Premium Web Applications.
              </h3>
              <p className="scroll-fade text-neutral-400 leading-relaxed font-light">
                I am a dedicated web developer with a strong foundation in JavaScript, React, and modern front-end ecosystems. My approach to development blends clean UI/UX with functional backend logic, ensuring seamless user experiences.
              </p>
              <p className="scroll-fade text-neutral-400 leading-relaxed font-light">
                While learning, I also explored Next.js, which has become a core part of my workflow for building full-stack web apps. I also assisted a startup in building their platform from the ground up, applying real-world skills in a collaborative environment.
              </p>
              <p className="scroll-fade text-neutral-400 leading-relaxed font-light">
                Currently focused on building projects and contributing to open-source while actively seeking new challenges in the tech industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 sm:py-32 border-t border-neutral-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="scroll-fade text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Skills & Technologies
            </h2>
            <p className="scroll-fade text-neutral-400 font-light">
              A comprehensive toolkit of modern technologies I use to craft exceptional web experiences
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {logos.map((item, index) => (
              <div
                key={index}
                className="scroll-fade group flex items-center gap-4 p-4 rounded-xl bg-neutral-900/30 border border-neutral-800/40 hover:border-purple-500/40 hover:bg-neutral-900/60 transition-all duration-300 cursor-default"
              >
                <div className="relative flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-neutral-950 overflow-hidden">
                  <Image
                    className="max-w-6 max-h-6 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                    width={24}
                    height={24}
                    src={item.src}
                    alt={item.alt}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-neutral-300 group-hover:text-white transition-colors duration-200">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 sm:py-32 border-t border-neutral-900 bg-neutral-950/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <h2 className="scroll-fade text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Featured Work
            </h2>
            <p className="scroll-fade text-neutral-400 font-light">
              A curated selection of client platforms, business websites, and digital interfaces.
            </p>
          </div>

         {/* Project Carousel */}
<div className="relative">

  <div
    ref={projectsRef}
    onScroll={handleProjectsScroll}
    className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6 no-scrollbar"
    style={{
      scrollbarWidth: "none",
      msOverflowStyle: "none",
    }}
  >
    {projects.map((project, index) => (
      <article
        key={project.title}
        data-project-card
        className="
          scroll-fade
          group
          flex-none
          w-[88%]
          sm:w-[68%]
          md:w-[calc(50%-12px)]
          lg:w-[calc(33.333%-16px)]
          snap-start
          rounded-2xl
          bg-neutral-900/40
          border
          border-neutral-800/50
          overflow-hidden
          hover:border-purple-500/30
          transition-colors
          duration-300
        "
      >

        {/* Project Image */}
        <div className="relative aspect-video overflow-hidden bg-neutral-950">

          <Image
            src={project.image}
            alt={`${project.title} website preview`}
            fill
            sizes="
              (max-width: 640px) 88vw,
              (max-width: 1024px) 68vw,
              33vw
            "
            className="
              object-cover
              transition-transform
              duration-500
              group-hover:scale-[1.03]
            "
            priority={index < 3}
          />

          <div className="
            absolute
            inset-0
            bg-gradient-to-t
            from-neutral-950/80
            via-transparent
            to-transparent
            pointer-events-none
          " />

        </div>

        {/* Project Content */}
        <div className="
          p-5
          sm:p-6
          flex
          min-h-[190px]
          flex-col
          justify-between
          gap-6
        ">

          <div className="space-y-2.5">

            <h3 className="
              text-lg
              font-bold
              text-white
              group-hover:text-purple-400
              transition-colors
              duration-200
            ">
              {project.title}
            </h3>

            <p className="
              text-sm
              text-neutral-400
              leading-relaxed
              font-light
              line-clamp-3
            ">
              {project.description ||
                "A modern web experience built with a focus on clean design, performance, and usability."}
            </p>

          </div>

          {/* Visit Button */}
          <div className="
            pt-4
            border-t
            border-neutral-800/60
          ">

            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${project.title}`}
              className="
                inline-flex
                items-center
                gap-1.5
                text-xs
                font-semibold
                text-purple-400
                hover:text-purple-300
                transition-colors
                duration-200
              "
            >
              Visit Site

              <ExternalLink className="w-3.5 h-3.5" />
            </a>

          </div>

        </div>

      </article>
    ))}
  </div>

  {/* Carousel Controls */}
  {projects.length > 1 && (
    <div className="
      flex
      items-center
      justify-between
      gap-4
      mt-2
    ">

      {/* Pagination */}
      <div
        className="flex items-center gap-2"
        aria-label="Project carousel pagination"
      >

        {projects.map((project, index) => (
          <button
            key={project.title}
            type="button"
            onClick={() => goToProject(index)}
            aria-label={`Go to ${project.title}`}
            aria-current={
              activeProject === index
                ? "true"
                : undefined
            }
            className={`
              h-1.5
              rounded-full
              transition-all
              duration-300
              ${
                activeProject === index
                  ? "w-7 bg-purple-400"
                  : "w-1.5 bg-neutral-700 hover:bg-neutral-500"
              }
            `}
          />
        ))}

      </div>

      {/* Previous / Next */}
      <div className="flex items-center gap-2">

        <button
          type="button"
          onClick={() => scrollProjects(-1)}
          disabled={activeProject === 0}
          aria-label="Previous projects"
          className="
            w-10
            h-10
            rounded-full
            border
            border-neutral-800
            bg-neutral-900/60
            text-neutral-400
            hover:text-white
            hover:border-neutral-700
            disabled:opacity-30
            disabled:pointer-events-none
            transition-colors
            duration-200
            flex
            items-center
            justify-center
          "
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => scrollProjects(1)}
          disabled={activeProject >= projects.length - 1}
          aria-label="Next projects"
          className="
            w-10
            h-10
            rounded-full
            border
            border-neutral-800
            bg-neutral-900/60
            text-neutral-400
            hover:text-white
            hover:border-neutral-700
            disabled:opacity-30
            disabled:pointer-events-none
            transition-colors
            duration-200
            flex
            items-center
            justify-center
          "
        >
          <ChevronRight className="w-4 h-4" />
        </button>

      </div>

    </div>
  )}

</div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 sm:py-32 border-t border-neutral-900">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <div className="scroll-fade inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium tracking-wide uppercase">
            <Mail className="w-3.5 h-3.5" />
            Get in Touch
          </div>
          <h2 className="scroll-fade text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Let&apos;s build something together.
          </h2>
          <p className="scroll-fade text-neutral-400 text-lg font-light max-w-xl mx-auto">
            Ready to kick off a project, or just looking to say hello? Copy my email below or check out my profiles.
          </p>

          {/* Interactive Copy Card */}
          <div className="scroll-fade max-w-md mx-auto">
            <button
              onClick={copyEmail}
              className="flex items-center justify-between w-full p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-purple-500/30 hover:bg-neutral-900/80 transition-all duration-300 font-mono text-sm text-left group"
            >
              <span className="text-neutral-400 group-hover:text-neutral-200 transition-colors duration-200 font-light">
                devsharma.oficial@gmail.com
              </span>
              <div className="flex items-center gap-1 text-purple-400 font-sans font-semibold text-xs">
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-green-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                    <span>Copy</span>
                  </>
                )}
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-xs text-neutral-600 border-t border-neutral-900/50 bg-neutral-950/40">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Dev Sharma. All rights reserved.</p>
          <p className="font-mono">Crafted with React, GSAP & Tailwind v4</p>
        </div>
      </footer>
    </div>
  );
}
