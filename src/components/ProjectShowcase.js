import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Github, ExternalLink, Code, Database, Palette, Smartphone } from 'lucide-react';

const ProjectCard = ({ project, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const handleCardClick = (e) => {
  // Don't flip if clicking on a link or its children
  const clickedElement = e.target;
  const isLink = clickedElement.tagName === 'A' || clickedElement.closest('a');
  
  if (!isLink) {
    setIsFlipped(!isFlipped);
  }
};

const handleKeyDown = (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    setIsFlipped(!isFlipped);
  }
};

const handleLinkClick = (e) => {
  e.preventDefault(); // Prevent default link behavior
  e.stopPropagation(); // Prevent event bubbling to card
  // Open link manually
  const href = e.currentTarget.getAttribute('href');
  if (href) {
    window.open(href, '_blank');
  }
};

const handleLinkKeyDown = (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    e.stopPropagation();
    const href = e.currentTarget.getAttribute('href');
    if (href) {
      window.open(href, '_blank');
    }
  }
};

const LinkWrapper = ({ children, href, ...props }) => (
  <a href={href} {...props}>{children}</a>
);

  const getIcon = (tech) => {
    const icons = {
      'frontend': <Palette className="w-4 h-4" />,
      'backend': <Database className="w-4 h-4" />,
      'mobile': <Smartphone className="w-4 h-4" />,
      'fullstack': <Code className="w-4 h-4" />
    };
    return icons[tech] || <Code className="w-4 h-4" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative h-80 cursor-pointer"
      style={{ perspective: '1000px' }}
      tabIndex={0}
      role="button"
      aria-label={`Project card: ${project.title}. Press Enter or Space to flip for more details.`}
      onKeyDown={handleKeyDown}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(e.clientX - centerX);
        y.set(e.clientY - centerY);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      onClick={handleCardClick}
    >
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          rotateX: isFlipped ? 180 : 0,
          transition: 'transform 0.6s'
        }}
      >
        {/* Front of card */}
        <motion.div
          className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-violet-600/30 via-fuchsia-500/30 to-cyan-500/30 backdrop-blur-lg border border-white/30 dark:border-white/20 p-6"
          style={{
            backfaceVisibility: 'hidden',
            rotateX,
            rotateY
          }}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-2">
                {project.technologies.slice(0, 2).map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded-full bg-gradient-to-r from-violet-500/40 to-fuchsia-500/40 text-xs text-white font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                {getIcon(project.category)}
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-3 drop-shadow-lg">{project.title}</h3>
            <p className="text-white text-sm mb-4 flex-grow leading-relaxed drop-shadow">{project.description}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                {project.github && (
                  <LinkWrapper
                    as="a"
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-white/30 hover:bg-white/40 transition-all hover:scale-110 cursor-pointer shadow-lg hover:shadow-xl block"
                    onClick={handleLinkClick}
                    onKeyDown={handleLinkKeyDown}
                    title="View on GitHub"
                    aria-label="View project on GitHub (opens in new tab)"
                  >
                    <span className="block">
                      <Github className="w-6 h-6 text-white" />
                    </span>
                  </LinkWrapper>
                )}
                {project.live && (
                  <LinkWrapper
                    as="a"
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-white/30 hover:bg-white/40 transition-all hover:scale-110 cursor-pointer shadow-lg hover:shadow-xl block"
                    onClick={handleLinkClick}
                    onKeyDown={handleLinkKeyDown}
                    title="View Live Demo"
                    aria-label="View live demo (opens in new tab)"
                  >
                    <span className="block">
                      <ExternalLink className="w-6 h-6 text-white" />
                    </span>
                  </LinkWrapper>
                )}
              </div>
              <span className="text-xs text-white/80 font-medium bg-white/10 px-2 py-1 rounded">Click or press Enter/Space to flip</span>
            </div>
          </div>
        </motion.div>

        {/* Back of card */}
        <motion.div
          className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-fuchsia-600/30 via-pink-500/30 to-rose-500/30 backdrop-blur-lg border border-white/30 dark:border-white/20 p-6"
          style={{
            backfaceVisibility: 'hidden',
            rotateX: 180,
            transform: 'rotateX(180deg)'
          }}
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-white drop-shadow-lg">Project Details</h3>
              
              {/* Links on back of card - top right */}
              <div className="flex gap-2">
                {project.github && (
                  <LinkWrapper
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/30 hover:bg-white/40 transition-all hover:scale-110 cursor-pointer shadow-lg hover:shadow-xl block"
                    onClick={handleLinkClick}
                    onKeyDown={handleLinkKeyDown}
                    title="View on GitHub"
                    aria-label="View project on GitHub (opens in new tab)"
                  >
                    <span className="block">
                      <Github className="w-5 h-5 text-white" />
                    </span>
                  </LinkWrapper>
                )}
                {project.live && (
                  <LinkWrapper
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/30 hover:bg-white/40 transition-all hover:scale-110 cursor-pointer shadow-lg hover:shadow-xl block"
                    onClick={handleLinkClick}
                    onKeyDown={handleLinkKeyDown}
                    title="View Live Demo"
                    aria-label="View live demo (opens in new tab)"
                  >
                    <span className="block">
                      <ExternalLink className="w-5 h-5 text-white" />
                    </span>
                  </LinkWrapper>
                )}
              </div>
            </div>
            
            <div className="space-y-3 flex-grow">
              <div>
                <h4 className="text-sm font-bold text-white mb-2 bg-fuchsia-500/30 px-2 py-1 rounded inline-block">Key Features</h4>
                <ul className="text-xs text-white space-y-1">
                  {project.features?.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1 h-1 bg-white rounded-full mt-1 flex-shrink-0" />
                      <span className="drop-shadow">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-bold text-white mb-2 bg-fuchsia-500/30 px-2 py-1 rounded inline-block">Tech Stack</h4>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 rounded bg-white/30 text-xs text-white font-medium border border-white/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <span className="text-xs text-white/80 font-medium bg-white/10 px-2 py-1 rounded">Click or press Enter/Space to flip back</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const ProjectShowcase = () => {
  const projects = [
    {
      title: "Nexus Dashboard Platform",
      description: "AI-Ready MFE Orchestration platform with custom Widget Loader engine for 100% decoupling and Registry-Driven UI using PostgreSQL.",
      technologies: ["React.js", "TypeScript", "PostgreSQL", "MCP", "LLM"],
      category: "fullstack",
      github: "https://github.com/MananSingh2001/nexus-dashboard-platform",
      live: null,
      features: [
        "Production-grade MFE Orchestration",
        "Custom Widget Loader engine",
        "Registry-Driven UI architecture",
        "LLM-generated metadata rendering",
        "100% component decoupling"
      ]
    },
    {
      title: "Nexus-Core",
      description: "Distributed Event Streaming system with Async Audit Logging Pipeline handling 5k+ logs/sec with sub-10ms latency.",
      technologies: ["Node.js", "Redis", "TypeScript", "Event Streaming"],
      category: "backend",
      github: "https://github.com/MananSingh2001/nexus-core",
      live: null,
      features: [
        "Async Audit Logging Pipeline",
        "Redis as message broker",
        "5k+ logs/sec throughput",
        "Sub-10ms latency",
        "Distributed architecture"
      ]
    },
    {
      title: "Secure-Nexus",
      description: "Enterprise IAM dashboard with OIDC RP-Initiated Logout and strict JWT/RBAC validation for secure access management.",
      technologies: ["React.js", "Keycloak", "OIDC", "JWT", "RBAC"],
      category: "fullstack",
      github: "https://github.com/MananSingh2001/secure-IAM",
      live: null,
      features: [
        "OIDC RP-Initiated Logout",
        "Strict JWT validation",
        "RBAC implementation",
        "Enterprise IAM dashboard",
        "SSO integration"
      ]
    },
    {
      title: "Velocity CI/CD Platform",
      description: "Release Management Visualization module streamlining CI/CD pipeline visibility with real-time monitoring and analytics.",
      technologies: ["React.js", "Node.js", "Jenkins", "Docker", "WebSocket"],
      category: "frontend",
      github: "https://github.com/MananSingh2001",
      live: null,
      features: [
        "Release Management Visualization",
        "Real-time CI/CD monitoring",
        "Pipeline analytics dashboard",
        "WebSocket live updates",
        "Multi-pipeline support"
      ]
    },
    {
      title: "MFE Component System",
      description: "Modular Micro-frontend architecture using React and TypeScript, accelerating feature delivery by 40% with advanced lazy loading.",
      technologies: ["React.js", "TypeScript", "Webpack", "Module Federation", "BFF"],
      category: "frontend",
      github: "https://github.com/MananSingh2001",
      live: null,
      features: [
        "Micro-frontend architecture",
        "40% faster feature delivery",
        "UI virtualization",
        "Advanced lazy loading",
        "60% LCP improvement"
      ]
    },
    {
      title: "Agentic Development Tools",
      description: "AI-powered development tools using MCP servers and agentic IDEs to increase UI development efficiency by 30%.",
      technologies: ["MCP", "Cascade", "Gemini", "VS Code", "AI/ML"],
      category: "fullstack",
      github: "https://github.com/MananSingh2001",
      live: null,
      features: [
        "MCP server integration",
        "Figma to React automation",
        "30% development efficiency boost",
        "Agentic workflows",
        "AI-assisted code generation"
      ]
    }
  ];

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-600 via-blue-500 to-violet-500 bg-clip-text text-transparent font-bold tracking-tight mb-4"
        >
          Featured Projects
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Explore my latest work and innovations. Click on any card to see more details.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ProjectShowcase;
