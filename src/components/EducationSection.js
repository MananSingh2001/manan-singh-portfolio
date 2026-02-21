import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Calendar } from "lucide-react";

const EducationSection = ({ data }) => {
  return (
    <div className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-600 via-violet-500 to-indigo-500 bg-clip-text text-transparent font-bold tracking-tight mb-4">
          Education
        </h2>
        <p className="text-gray-700 dark:text-gray-400 max-w-2xl mx-auto">
          My academic background and educational achievements
        </p>
      </motion.div>

      {/* Education Content */}
      <div className="space-y-6">
        {data.education.map((edu, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-500/10 via-violet-500/5 to-indigo-500/10 dark:from-purple-900/20 dark:via-violet-900/10 dark:to-indigo-900/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 dark:border-white/20 shadow-xl"
          >
            <div className="flex items-start gap-4">
              <motion.div
                className="p-3 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: idx * 2 }}
              >
                <GraduationCap className="text-white" size={24} />
              </motion.div>
              <div className="flex-1">
                <h3 className="text-2xl font-black bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-2">
                  {edu.institution}
                </h3>
                <p className="text-lg text-gray-800 dark:text-gray-300 font-medium mb-2">
                  {edu.degree}
                </p>
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold">
                  <Calendar size={16} />
                  <span>{edu.year}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EducationSection;
