import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle: string;
  align?: "left" | "center" | "right";
  light?: boolean;
}

export function SectionHeading({ title, subtitle, align = "center", light = false }: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${align === "center" ? "text-center" : align === "left" ? "text-left" : "text-right"}`}>
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="block text-primary font-bold uppercase tracking-[0.2em] text-sm mb-3"
      >
        {subtitle}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={`text-3xl md:text-5xl font-display font-bold ${light ? "text-white" : "text-white"}`}
      >
        {title}
        <span className="block w-24 h-1 bg-primary mt-6 mx-auto rounded-full" style={{ 
          display: align === "center" ? "block" : "none" 
        }} />
        <span className="block w-24 h-1 bg-primary mt-6 rounded-full" style={{ 
          display: align === "left" ? "block" : "none" 
        }} />
      </motion.h2>
    </div>
  );
}
