import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

const InfoTabs = ({ data }) => {
  return (
    <div className="py-8">
      {/* Experience Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-amber-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent font-bold tracking-tight mb-4">
          Professional Experience
        </h2>
        <p className="text-gray-700 dark:text-gray-400 max-w-2xl mx-auto">
          My professional journey and technical achievements
        </p>
      </motion.div>

      {/* Experience Content */}
      <div className="space-y-6">
        {data.experience.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="relative group"
          >
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500/50 via-orange-500/50 to-yellow-500/50" />
            
            {/* Experience Card */}
            <div className="relative pl-16">
              {/* Timeline Dot */}
              <motion.div
                className="absolute left-6 top-8 w-4 h-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full border-4 border-white dark:border-gray-900"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
              />
              
              {/* Badge - Fixed positioning */}
              <motion.div
                className={`absolute -top-2 right-4 px-3 py-1 rounded-full text-xs font-bold text-white ${exp.accent} shadow-lg z-20 yellow-border`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.1 + 0.2 }}
                viewport={{ once: true }}
              >
                {exp.badge}
              </motion.div>

              {/* Card Content */}
              <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-yellow-500/10 dark:from-amber-900/20 dark:via-orange-900/10 dark:to-yellow-900/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 dark:border-white/20 shadow-xl group-hover:shadow-2xl transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="pr-20">
                    <h3 className="text-xl font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-4 mt-2 text-gray-700 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <Briefcase size={16} className="text-amber-500" />
                        <span className="font-medium">{exp.company}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-amber-500" />
                        <span className="font-medium">{exp.period}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {exp.highlights.map((highlight, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 + i * 0.1 + 0.3 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3"
                    >
                      <motion.div
                        className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mt-2 flex-shrink-0"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                      />
                      <span className="text-gray-800 dark:text-gray-300 leading-relaxed">{highlight}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default InfoTabs;
