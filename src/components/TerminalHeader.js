import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TerminalHeader = () => {
  const [text, setText] = useState("");
  const fullText =
    "> Manan Singh: Senior Software Engineer I";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black dark:bg-gray-950 text-green-400 p-4 font-mono rounded-t-lg border-x-4 border-t-4 border-black shadow-[8px_0px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex gap-2 mb-2">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-lg md:text-2xl font-bold"
      >
        {text}
        <span className="animate-pulse">_</span>
      </motion.p>
    </div>
  );
};

export default TerminalHeader;
