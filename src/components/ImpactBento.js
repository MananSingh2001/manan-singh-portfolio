import React from "react";
import { motion } from "framer-motion";
import { Activity, Zap, Shield, Cpu, TrendingUp, Rocket } from "lucide-react";

const ImpactTile = ({ title, value, icon: Icon, gradient, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    whileHover={{ 
      y: -10, 
      scale: 1.05,
      boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
    }}
    className={`relative p-8 rounded-2xl backdrop-blur-lg border border-white/20 dark:border-white/10 shadow-xl overflow-hidden group cursor-pointer`}
  >
    {/* Gradient background */}
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-80`} />
    
    {/* Animated overlay */}
    <motion.div
      className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent"
      animate={{ y: ['-100%', '100%'] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: delay * 0.5 }}
    />
    
    {/* Content */}
    <div className="relative z-10">
      <div className="flex justify-between items-start mb-6">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: delay * 0.3 }}
        >
          <Icon size={40} strokeWidth={2} className="text-white/90" />
        </motion.div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: delay + 0.5 }}
          className="text-xs font-bold text-white/80 uppercase tracking-wider bg-white/20 px-2 py-1 rounded-full"
        >
          Metric Validated
        </motion.span>
      </div>
      
      <div className="space-y-2">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: delay + 0.2 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-black text-white leading-none"
        >
          {value}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: delay + 0.4 }}
          viewport={{ once: true }}
          className="text-sm font-bold text-white/90 uppercase tracking-wide"
        >
          {title}
        </motion.p>
      </div>
    </div>
    
    {/* Glow effect on hover */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  </motion.div>
);

const ImpactBento = () => {
  return (
    <div className="space-y-8">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ImpactTile
          title="LCP Improvement"
          value="60%"
          icon={Zap}
          gradient="from-yellow-500 via-orange-500 to-red-500"
          delay={0}
        />

        <ImpactTile
          title="Feature Delivery"
          value="40%"
          icon={Activity}
          gradient="from-blue-500 via-cyan-500 to-teal-500"
          delay={0.1}
        />

        <ImpactTile
          title="Dev Efficiency"
          value="30%"
          icon={Cpu}
          gradient="from-purple-500 via-violet-500 to-fuchsia-500"
          delay={0.2}
        />
      </div>

      {/* Large Architecture Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.02 }}
        className="relative bg-gradient-to-br from-violet-600/20 via-fuchsia-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl border border-white/20 dark:border-white/10 shadow-xl overflow-hidden group"
      >
        {/* Animated background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-r from-violet-500/30 to-fuchsia-500/30 rounded-full blur-2xl"
            animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-r from-pink-500/30 to-rose-500/30 rounded-full blur-2xl"
            animate={{ x: [0, -80, 0], y: [0, -60, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 p-8">
          <div className="flex items-center gap-4 mb-8">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="p-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full"
            >
              <Shield className="text-white" size={32} />
            </motion.div>
            <div>
              <h3 className="text-3xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                Core Orchestration
              </h3>
              <p className="text-violet-300 dark:text-violet-400 font-medium">Nexus Ecosystem Architecture</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full" />
              <div className="pl-6">
                <div className="flex items-center gap-2 mb-3">
                  <Rocket className="text-violet-400" size={20} />
                  <h4 className="font-bold text-violet-300 dark:text-violet-400 text-lg">Micro-frontend (MFE)</h4>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Architected enterprise-grade orchestration with custom Widget Loaders for 100% decoupling and Registry-Driven UI architecture.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-r from-fuchsia-500 to-pink-500 rounded-full" />
              <div className="pl-6">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="text-fuchsia-400" size={20} />
                  <h4 className="font-bold text-fuchsia-300 dark:text-fuchsia-400 text-lg">IAM & Security</h4>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Implemented Keycloak SSO, OIDC workflows, and strict JWT/RBAC validation for Secure-Nexus enterprise security.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ImpactBento;
