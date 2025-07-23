import { motion } from "framer-motion";
import { FileText } from "lucide-react";

const ResumeButton = () => {
  
  const driveViewLink = "https://drive.google.com/file/d/1OaxghdePKPeON0M6iV9wAfx5itLppOM3/view?usp=sharing";

  return (
    <motion.a
      href={driveViewLink}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300"
    >
      <FileText className="w-5 h-5" />
      <span className="font-medium tracking-wide">View Resume</span>
    </motion.a>
  );
};

export default ResumeButton;
