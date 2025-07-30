"use client";
import { useRef, useCallback } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Github, Linkedin, ExternalLink, Code2 } from "lucide-react";
import { logos, projects } from "@/constants";
import Image from "next/image";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  // Refs for different sections
  const loadingRef = useRef(null);
  const circle1Ref = useRef(null);
  const circle2Ref = useRef(null);
  const skillsRef = useRef(null);
  const skillItemsRef = useRef([]);
  const projectsRef = useRef(null);
  const projectItemsRef = useRef([]);

  // Optimized animation configurations
  const ANIMATION_CONFIG = {
    loading: { duration: 1, ease: "power2.inOut" },
    circles: { duration: 8, ease: "power2.inOut" },
    skills: { duration: 0.6, ease: "back.out(1.7)" },
    projects: { duration: 0.8, ease: "power3.out" },
    hover: { duration: 0.3, ease: "power2.out" },
  };

  // Optimized hover handlers
  const createHoverHandlers = useCallback((element, isSkill = false) => {
    const scaleUp = isSkill ? 1.1 : 1.05;
    const yOffset = isSkill ? -10 : -8;

    const handleMouseEnter = () => {
      gsap.to(element, {
        scale: scaleUp,
        y: yOffset,
        ...ANIMATION_CONFIG.hover,
      });

      if (isSkill) {
        const img = element.querySelector("img");
        if (img) {
          gsap.to(img, {
            scale: 1.2,
            rotation: 5,
            ...ANIMATION_CONFIG.hover,
          });
        }
      } else {
        const img = element.querySelector(".project-image");
        if (img) {
          gsap.to(img, {
            scale: 1.1,
            ...ANIMATION_CONFIG.hover,
          });
        }
      }
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        y: 0,
        ...ANIMATION_CONFIG.hover,
      });

      const img = element.querySelector(isSkill ? "img" : ".project-image");
      if (img) {
        gsap.to(img, {
          scale: 1,
          rotation: 0,
          ...ANIMATION_CONFIG.hover,
        });
      }
    };

    return { handleMouseEnter, handleMouseLeave };
  }, []);

  useGSAP(() => {
    // Loading animation
    const timer = setTimeout(() => {
      gsap.to(loadingRef.current, {
        opacity: 0,
        y: "-100vh",
        ...ANIMATION_CONFIG.loading,
      });
    }, 2000);

    // Floating circles animation
    gsap.to(circle1Ref.current, {
      x: 200,
      y: 100,
      rotation: 360,
      duration: ANIMATION_CONFIG.circles.duration,
      ease: ANIMATION_CONFIG.circles.ease,
      repeat: -1,
      yoyo: true,
    });

    gsap.to(circle2Ref.current, {
      x: -150,
      y: -80,
      rotation: -360,
      duration: ANIMATION_CONFIG.circles.duration + 2,
      ease: ANIMATION_CONFIG.circles.ease,
      repeat: -1,
      yoyo: true,
    });

    // Skills section animation
    const skillsSection = skillsRef.current;
    const skillItems = skillItemsRef.current.filter(Boolean);

    if (skillsSection && skillItems.length > 0) {
      gsap.set(skillItems, {
        opacity: 0,
        y: 60,
        scale: 0.8,
        rotationY: 45,
      });

      const skillsTl = gsap.timeline({
        scrollTrigger: {
          trigger: skillsSection,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate title and description
      skillsTl
        .fromTo(
          skillsSection.querySelector("h2"),
          { opacity: 0, y: -50 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        )
        .fromTo(
          skillsSection.querySelector("p"),
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.4"
        );

      // Animate skill items
      skillItems.forEach((item, index) => {
        skillsTl.to(
          item,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationY: 0,
            ...ANIMATION_CONFIG.skills,
            delay: index * 0.08,
          },
          "-=0.5"
        );

        // Add hover animations
        const { handleMouseEnter, handleMouseLeave } = createHoverHandlers(
          item,
          true
        );
        item.addEventListener("mouseenter", handleMouseEnter);
        item.addEventListener("mouseleave", handleMouseLeave);
      });
    }

    // Projects section animation
    const projectsSection = projectsRef.current;
    const projectItems = projectItemsRef.current.filter(Boolean);

    if (projectsSection && projectItems.length > 0) {
      gsap.set(projectItems, {
        opacity: 0,
        y: 80,
        scale: 0.9,
        rotationX: 15,
      });

      const projectsTl = gsap.timeline({
        scrollTrigger: {
          trigger: projectsSection,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate title and description
      projectsTl
        .fromTo(
          projectsSection.querySelector("h2"),
          { opacity: 0, y: -60, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }
        )
        .fromTo(
          projectsSection.querySelector("p"),
          { opacity: 0, y: -40 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.6"
        );

      // Animate project cards with advanced effects
      projectItems.forEach((item, index) => {
        projectsTl.to(
          item,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            ...ANIMATION_CONFIG.projects,
            delay: index * 0.15,
          },
          "-=0.7"
        );

        // Add sophisticated hover animations
        const { handleMouseEnter, handleMouseLeave } = createHoverHandlers(
          item,
          false
        );
        item.addEventListener("mouseenter", handleMouseEnter);
        item.addEventListener("mouseleave", handleMouseLeave);
      });
    }

    return () => {
      clearTimeout(timer);
      // Cleanup event listeners
      [...skillItems, ...projectItems].forEach((item) => {
        if (item) {
          item.removeEventListener("mouseenter", item.handleMouseEnter);
          item.removeEventListener("mouseleave", item.handleMouseLeave);
        }
      });
    };
  }, [createHoverHandlers]);

  return (
    <>
      <div className="relative h-screen w-full">
        {/* Loading Screen */}
        <div
          className="fixed inset-0 bg-gradient-to-br from-violet-900 to-indigo-800 flex items-center justify-center z-50 overflow-hidden"
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

        <main className="min-h-screen w-full bg-[#0a0a0a]">
          {/* Hero Section */}
          <section className="h-screen bg-neutral-950 w-full px-4 sm:px-8 lg:px-16">
            <BackgroundBeams />
            <div className="h-full max-w-7xl mx-auto flex flex-col gap-6 justify-center">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl text-neutral-200 font-bold">
                I'm Dev Sharma
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-neutral-200">
                I am a{" "}
                <span className="text-red-500 animate-(--animate-blink-faulty) shadow-[--shadow-blink-faulty]">
                  Web
                </span>{" "}
                <span className="text-blue-500 animate-(--animate-blink-faulty) delay-[300ms] shadow-[--shadow-blink-faulty]">
                  Developer
                </span>
              </p>
              <div className="flex gap-4">
                <a href="#" className="group">
                  <Linkedin className="w-6 sm:w-8 text-neutral-300 h-6 sm:h-8 group-hover:text-blue-500 transition-colors duration-300" />
                </a>
                <a href="#" className="group">
                  <Github className="w-6 sm:w-8 text-neutral-300 h-6 sm:h-8 group-hover:text-white transition-colors duration-300" />
                </a>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section
            id="about"
            className="relative h-screen px-4 sm:px-8 bg-neutral-950"
          >
            <div
              ref={circle1Ref}
              className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 rounded-full opacity-20 blur-xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(147, 51, 234, 0.8) 0%, rgba(79, 70, 229, 0.4) 50%, transparent 100%)",
              }}
            />
            <div
              ref={circle2Ref}
              className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-56 sm:h-56 rounded-full opacity-15 blur-2xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(168, 85, 247, 0.7) 0%, rgba(139, 92, 246, 0.3) 50%, transparent 100%)",
              }}
            />
            <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 flex flex-col justify-center h-full">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                About Me
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-neutral-300 leading-relaxed">
                I'm a dedicated web developer with a strong foundation in
                JavaScript, React, and modern front-end ecosystems. My approach
                to development blends clean UI/UX with functional backend logic,
                ensuring seamless user experiences.
              </p>
              <p className="text-neutral-400 text-base sm:text-lg">
                Currently focused on building portfolio projects and
                contributing to open-source while actively seeking new
                challenges in the tech industry.
              </p>
            </div>
          </section>

          {/* Skills Section */}
          <section
            ref={skillsRef}
            className="min-h-screen w-full py-16 sm:py-20 lg:py-24 bg-neutral-950 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-purple-500/30 rounded-full animate-pulse" />
              <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-500/40 rounded-full animate-ping" />
              <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-purple-400/20 rounded-full animate-bounce" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Skills & Technologies
                </h2>
                <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto">
                  A comprehensive toolkit of modern technologies I use to craft
                  exceptional web experiences
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 sm:gap-8 lg:gap-10">
                {logos.map((item, index) => (
                  <div
                    key={index}
                    ref={(el) => (skillItemsRef.current[index] = el)}
                    className="group flex flex-col items-center p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-neutral-900/50 to-neutral-800/30 backdrop-blur-sm border border-neutral-700/30 hover:border-purple-500/50 transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mb-3 sm:mb-4 overflow-hidden rounded-xl bg-neutral-800/50">
                      <Image
                        className="max-w-8 max-h-8 sm:max-w-10 sm:max-h-10 lg:max-w-12 lg:max-h-12 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                        src={item.src}
                        alt={item.alt}
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                    </div>
                    <h3 className="text-xs sm:text-sm lg:text-base font-semibold text-neutral-300 group-hover:text-white transition-colors duration-300 text-center leading-tight">
                      {item.title}
                    </h3>
                    <div className="w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-500 mt-2 rounded-full" />
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-16 sm:mt-20">
                <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full opacity-50" />
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section
            ref={projectsRef}
            className="min-h-screen w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-neutral-950 relative overflow-hidden"
          >
            {/* Animated background */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/5 via-transparent to-purple-900/5" />
              <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-radial from-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-gradient-radial from-blue-500/10 to-transparent rounded-full blur-2xl animate-pulse delay-1000" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
              <div className="text-center mb-20">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                  Featured Projects
                </h2>
                <p className="text-base sm:text-lg text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                  A curated showcase of my latest work, featuring innovative
                  solutions, modern design principles, and cutting-edge
                  technologies that push the boundaries of web development.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-10">
                {projects.map((project, index) => (
                  <div
                    key={index}
                    ref={(el) => (projectItemsRef.current[index] = el)}
                    className="group relative bg-gradient-to-br from-neutral-900/80 to-neutral-800/50 rounded-2xl overflow-hidden backdrop-blur-sm border border-neutral-700/50 hover:border-purple-500/50 transition-all duration-500 cursor-pointer"
                  >
                    {/* Image container with overlay */}
                    <div className="relative overflow-hidden rounded-t-2xl">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={600}
                        height={400}
                        className="project-image object-cover w-full h-56 sm:h-64 transition-transform duration-500"
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-8 space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300 leading-tight">
                          {project.title}
                        </h3>
                        <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      </div>

                      <p className="text-neutral-400 text-sm sm:text-base leading-relaxed line-clamp-3">
                        {project.description}
                      </p>

                      {/* Tech stack indicators */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {["React", "TypeScript", "Tailwind"]
                          .slice(0, 3)
                          .map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-2 py-1 text-xs bg-neutral-800/50 text-neutral-300 rounded-md border border-neutral-700/50"
                            >
                              {tech}
                            </span>
                          ))}
                      </div>

                      <div className="flex items-center justify-between pt-4">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors duration-300 text-sm font-medium group-hover:translate-x-1 transform transition-transform duration-300"
                        >
                          Explore Project
                          <ExternalLink className="w-4 h-4" />
                        </a>

                        <div className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    </div>

                    {/* Animated border */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/50 to-blue-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-10 text-center text-neutral-500 text-sm px-4 border-t border-neutral-800/50">
            <div className="max-w-4xl mx-auto">
              <p className="mb-4">
                © {new Date().getFullYear()} Dev Sharma. Crafted with ❤️ using
                Next.js & Tailwind CSS.
              </p>
              <div className="flex justify-center gap-6">
                <a
                  href="#"
                  className="hover:text-purple-400 transition-colors duration-300"
                >
                  Privacy
                </a>
                <a
                  href="#"
                  className="hover:text-purple-400 transition-colors duration-300"
                >
                  Terms
                </a>
                <a
                  href="#"
                  className="hover:text-purple-400 transition-colors duration-300"
                >
                  Contact
                </a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}
