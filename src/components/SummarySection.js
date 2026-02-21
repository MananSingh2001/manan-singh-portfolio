import React from 'react';
import { motion } from 'framer-motion';

const SummarySection = () => {
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
          Systems Architect
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Senior Software Engineer I architecting enterprise-grade security solutions and driving 30% efficiency gains through agentic AI development
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-cyan-500/10 dark:from-emerald-900/20 dark:via-teal-900/10 dark:to-cyan-900/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-white/10 shadow-xl"
        >
          <motion.h3
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4"
          >
            Career Objective
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-gray-700 dark:text-gray-300 leading-relaxed"
          >
            Systems Architect specializing in enterprise-grade security implementations 
            and agentic AI development. Proven track record of delivering 60% LCP improvements 
            and 40% feature delivery acceleration through Micro-frontend Architecture. 
            Expert in Keycloak, OIDC, and MCP-driven automation workflows.
          </motion.p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-violet-500/10 via-fuchsia-500/5 to-pink-500/10 dark:from-violet-900/20 dark:via-fuchsia-900/10 dark:to-pink-900/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-white/10 shadow-xl"
        >
          <motion.h3
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-4"
          >
            Key Achievements
          </motion.h3>
          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            {[
              "Architected enterprise-grade security layers using Keycloak, OIDC, and SSO",
              "Automated Figma-to-React translation via MCP servers, boosting efficiency by 30%",
              "Mentored 4 engineers in agentic workflows while maintaining 80%+ test coverage",
              "Delivered 60% LCP improvement through advanced UI virtualization strategies"
            ].map((achievement, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * idx + 0.5 }}
                viewport={{ once: true }}
                className="flex items-start gap-3"
              >
                <motion.div
                  className="w-2 h-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full mt-2 flex-shrink-0"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                />
                <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </div>
  );
};

export default SummarySection;
