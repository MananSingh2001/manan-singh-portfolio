import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const SkillBar = ({ skill, level, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const getGradientColor = (level) => {
    if (level >= 90) return 'from-emerald-500 to-green-600';
    if (level >= 80) return 'from-cyan-500 to-blue-600';
    if (level >= 70) return 'from-violet-500 to-purple-600';
    if (level >= 60) return 'from-fuchsia-500 to-pink-600';
    return 'from-amber-500 to-orange-600';
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="space-y-2"
    >
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill}</span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
          className="text-xs font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent"
        >
          {level}%
        </motion.span>
      </div>
      <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          style={{ width: `${level}%` }}
          className={`h-full bg-gradient-to-r ${getGradientColor(level)} rounded-full relative overflow-hidden`}
          initial={{ width: "0%" }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay: index * 0.1 + 0.2, ease: "easeOut" }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
              delay: index * 0.2
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

const SkillsSection = () => {
  const skills = {
    "Languages": [
      { name: "React.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Next.js 15", level: 88 },
      { name: "Node.js", level: 85 },
      { name: "Java", level: 82 },
      { name: "SQL (Postgres)", level: 88 },
      { name: "GraphQL", level: 80 }
    ],
    "Architecture": [
      { name: "Micro-frontends", level: 92 },
      { name: "BFF Pattern", level: 88 },
      { name: "Keycloak", level: 85 },
      { name: "OIDC", level: 87 },
      { name: "OAuth2", level: 85 },
      { name: "RBAC", level: 83 },
      { name: "Registry-Driven UI", level: 90 }
    ],
    "Tools & DevOps": [
      { name: "Docker", level: 86 },
      { name: "Kubernetes", level: 78 },
      { name: "AWS (EC2, S3)", level: 84 },
      { name: "Jenkins CI/CD", level: 82 },
      { name: "Redis", level: 88 },
      { name: "Webpack", level: 80 },
      { name: "Redux Toolkit", level: 87 }
    ],
    "AI & Agentic Tools": [
      { name: "Windsurf", level: 92 },
      { name: "Cascade", level: 95 },
      { name: "VS Code Copilot", level: 90 },
      { name: "Gemini Code Assist", level: 88 },
      { name: "MCP Protocol", level: 85 }
    ]
  };

  return (
    <div className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent font-bold tracking-tight mb-4">
          Technical Skills
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Proficient in modern web technologies with expertise in full-stack development and cloud architecture.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(skills).map(([category, skillList], categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white/10 to-gray-100/10 dark:from-gray-800/20 dark:to-gray-900/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-white/10 shadow-xl"
          >
            <motion.h3
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: categoryIndex * 0.1 + 0.2 }}
              viewport={{ once: true }}
              className="text-lg font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-4"
            >
              {category}
            </motion.h3>
            
            <div className="space-y-3">
              {skillList.map((skill, skillIndex) => (
                <SkillBar
                  key={skill.name}
                  skill={skill.name}
                  level={skill.level}
                  index={skillIndex}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Skill Overview Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: "Years Experience", value: "2+", color: "from-violet-500 to-fuchsia-500" },
          { label: "Performance Gains", value: "60%", color: "from-cyan-500 to-blue-500" },
          { label: "Delivery Speed", value: "40%", color: "from-emerald-500 to-green-500" },
          { label: "Dev Efficiency", value: "30%", color: "from-amber-500 to-orange-500" }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.6 }}
            viewport={{ once: true }}
            className="text-center p-4 rounded-xl bg-gradient-to-br from-white/10 to-gray-100/10 dark:from-gray-800/20 dark:to-gray-900/20 backdrop-blur-lg border border-white/20 dark:border-white/10"
          >
            <div className={`text-2xl md:text-3xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
              {stat.value}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SkillsSection;
