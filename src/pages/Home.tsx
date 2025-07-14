import { motion } from "framer-motion";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <motion.div
      className="w-full"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <Hero />
    </motion.div>
  );
}
