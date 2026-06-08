import { motion } from "framer-motion";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <path
          d="M16 2C16 2 13 5 13 8C13 11 16 14 16 14C16 14 19 11 19 8C19 5 16 2 16 2Z"
          fill="currentColor"
          className="text-primary"
        />
        <path
          d="M16 30C16 30 13 27 13 24C13 21 16 18 16 18C16 18 19 21 19 24C19 27 16 30 16 30Z"
          fill="currentColor"
          className="text-primary"
        />
        <path
          d="M2 16C2 16 5 19 8 19C11 19 14 16 14 16C14 16 11 13 8 13C5 13 2 16 2 16Z"
          fill="currentColor"
          className="text-primary"
        />
        <path
          d="M30 16C30 16 27 19 24 19C21 19 18 16 18 16C18 16 21 13 24 13C27 13 30 16 30 16Z"
          fill="currentColor"
          className="text-primary"
        />
        <circle cx="16" cy="16" r="4" fill="currentColor" className="text-foreground" />
      </motion.svg>
      <span className="font-bold text-xl tracking-tight uppercase" style={{ fontFamily: "var(--font-sans)" }}>
        Ahmadi<span className="text-primary">.</span>
      </span>
    </div>
  );
}
