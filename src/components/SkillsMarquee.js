import React from "react";

const SkillsMarquee = () => {
  const skills = [
    "React", "TypeScript", "Node.js", "PostgreSQL", "Redis", 
    "Keycloak", "MCP", "Framer Motion", "TailwindCSS", 
    "MFE Architecture", "UI Virtualization", "Event Streaming"
  ];

  return (
    <section className="bg-black dark:bg-gray-950 text-white py-4 overflow-hidden">
      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...skills, ...skills].map((skill, index) => (
            <span
              key={index}
              className="mx-8 text-sm font-black uppercase tracking-wider"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsMarquee;
