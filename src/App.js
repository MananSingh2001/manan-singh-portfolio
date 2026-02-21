import React, { useState, useEffect } from "react";
import ImpactBento from "./components/ImpactBento";
import InfoTabs from "./components/InfoTabs";
import SkillsSection from "./components/SkillsSection";
import SummarySection from "./components/SummarySection";
import DynamicBackground from "./components/DynamicBackground";
import ThemeToggle from "./components/ThemeToggle";
import ContactLinks from "./components/ContactLinks";
import ContactModal from "./components/ContactModal";
import TypingAnimation from "./components/TypingAnimation";
import ParallaxSection from "./components/ParallaxSection";
import ProjectShowcase from "./components/ProjectShowcase";
import EducationSection from "./components/EducationSection";
import registry from "./data/registry.json";
import { motion } from "framer-motion";
import { ThemeProvider } from "./contexts/ThemeContext";
import { MessageSquare } from "lucide-react";

const downloadResume = () => {
  const link = document.createElement("a");
  link.href = "/data/MANAN%20SINGH_SSE.pdf";
  link.download = "MANAN_SINGH_SSE.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "summary", "skills", "experience", "education", "impact", "projects"];
      const scrollPosition = window.scrollY + 100; // Reduced offset for better detection

      // Throttle scroll events for better performance
      if (!handleScroll.lastCall || Date.now() - handleScroll.lastCall > 50) {
        handleScroll.lastCall = Date.now();

        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          const element = document.getElementById(section);
          
          if (element) {
            const { offsetTop } = element;
            
            // Check if we've scrolled past this section
            if (scrollPosition >= offsetTop - 50) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ThemeProvider>
      <DynamicBackground />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-all duration-500 relative">
        {/* Fixed Theme Toggle */}
        <div className="fixed top-6 right-6 z-50">
          <ThemeToggle />
        </div>

        {/* Contact Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsContactModalOpen(true)}
            className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <MessageSquare className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Navigation */}
        <nav className="fixed top-6 left-6 z-40 hidden md:block">
          <div className="flex flex-col space-y-2">
            {["hero", "summary", "skills", "experience", "education", "impact", "projects"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`text-xs font-medium px-3 py-2 rounded-full transition-all ${
                  activeSection === section
                    ? "bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 text-white shadow-lg"
                    : "bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-violet-600 hover:via-fuchsia-500 hover:to-cyan-500 hover:text-white hover:shadow-lg"
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <ParallaxSection speed={0.1} className="min-h-screen flex items-center justify-center relative">
            <section id="hero" className="min-h-screen flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-fuchsia-500/3 to-cyan-500/5 dark:from-violet-900/10 dark:via-fuchsia-900/5 dark:to-cyan-900/10" />
              <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="mb-6"
                >
                  <h1 className="text-7xl md:text-9xl font-black bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent font-bold tracking-tight relative"
                    style={{
                      textShadow: '0 0 40px rgba(139, 92, 246, 0.3), 0 0 80px rgba(236, 72, 153, 0.2)',
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                    }}
                  >
                    Manan Singh
                    <motion.div
                      className="absolute -inset-4 bg-gradient-to-r from-violet-600/20 via-fuchsia-500/20 to-cyan-500/20 blur-xl rounded-lg"
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.3, 0.5, 0.3]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                      }}
                    />
                  </h1>
                </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="text-2xl md:text-3xl text-gray-700 dark:text-gray-200 font-medium"
              >
                <TypingAnimation 
                  texts={[
                    "Senior Software Engineer I",
                    "Full Stack Software Engineer", 
                    "MFE Architecture Expert",
                    "Agentic Development Pioneer",
                    "Enterprise Solutions Architect"
                  ]}
                  className="bg-gradient-to-r from-gray-700 to-gray-500 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent"
                  speed={100}
                  deleteSpeed={50}
                  pauseTime={2000}
                />
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12"
              >
                <div className="flex gap-3">
                  <ContactLinks />
                </div>
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 10px 40px rgba(139, 92, 246, 0.3)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={downloadResume}
                  className="relative bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 text-white px-10 py-4 rounded-full font-bold text-lg transition-all hover:shadow-2xl group overflow-hidden"
                >
                  <span className="relative z-10">Download Resume</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-violet-600"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '0%' }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              </motion.div>
              
              {/* Floating elements */}
              <motion.div
                className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-violet-400/30 to-fuchsia-400/30 rounded-full blur-xl"
                animate={{
                  y: [0, -20, 0],
                  x: [0, 10, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-cyan-400/30 to-blue-400/30 rounded-full blur-lg"
                animate={{
                  y: [0, 15, 0],
                  x: [0, -15, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
              <motion.div
                className="absolute bottom-40 left-1/4 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-rose-400/20 rounded-full blur-2xl"
                animate={{
                  y: [0, -10, 0],
                  x: [0, 20, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              />
            </div>
          </section>
        </ParallaxSection>

          {/* Summary Section */}
          <ParallaxSection speed={0.1} className="py-12 relative">
            <section id="summary" className="py-12 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-teal-500/3 to-green-500/5 dark:from-emerald-900/10 dark:via-teal-900/5 dark:to-green-900/10" />
              <div className="relative z-10">
                <SummarySection />
              </div>
            </section>
          </ParallaxSection>

          {/* Skills Section */}
          <ParallaxSection speed={0.2} className="py-12 relative">
            <section id="skills" className="py-12 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/3 to-violet-500/5 dark:from-cyan-900/10 dark:via-blue-900/5 dark:to-violet-900/10" />
              <div className="relative z-10">
                <SkillsSection />
              </div>
            </section>
          </ParallaxSection>

          {/* Experience Section */}
          <ParallaxSection speed={0.05} className="py-12 relative">
            <section id="experience" className="py-12 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-orange-500/3 to-yellow-500/5 dark:from-amber-900/10 dark:via-orange-900/5 dark:to-yellow-900/10" />
              <div className="relative z-10">
                <InfoTabs data={registry} />
              </div>
            </section>
          </ParallaxSection>

          {/* Education Section */}
          <ParallaxSection speed={0.05} className="py-12 relative">
            <section id="education" className="py-12 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-violet-500/3 to-indigo-500/5 dark:from-purple-900/10 dark:via-violet-900/5 dark:to-indigo-900/10" />
              <div className="relative z-10">
                <EducationSection data={registry} />
              </div>
            </section>
          </ParallaxSection>

          {/* Impact Section */}
          <ParallaxSection speed={0.15} className="py-12 relative">
            <section id="impact" className="py-12 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 via-pink-500/3 to-rose-500/5 dark:from-fuchsia-900/10 dark:via-pink-900/5 dark:to-rose-900/10" />
              <div className="relative z-10">
                <ImpactBento />
              </div>
            </section>
          </ParallaxSection>

          {/* Projects Section */}
          <ParallaxSection speed={0.12} className="py-12 relative">
            <section id="projects" className="py-12 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/3 to-indigo-500/5 dark:from-cyan-900/10 dark:via-blue-900/5 dark:to-indigo-900/10" />
              <div className="relative z-10">
                <ProjectShowcase />
              </div>
            </section>
          </ParallaxSection>
        </div>
      </div>
      
      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </ThemeProvider>
  );
}

export default App;
