import { motion } from "framer-motion";

const LoadingBar = () => {
  return (
    <motion.div
      animate={{ scaleX: 1 }}
      initial={{ scaleX: 0 }}
      style={{originX: 0}}
      transition={{repeat: Infinity, duration: 1, repeatType:"reverse"}}
      className="h-1.5 from-orange-500 to-red-600 bg-gradient-to-r"
    ></motion.div>
  );
};

export default LoadingBar;
