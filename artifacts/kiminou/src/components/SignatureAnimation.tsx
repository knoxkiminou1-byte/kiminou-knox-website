import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function SignatureAnimation({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-60px" });

  const strokeProps = {
    stroke: "currentColor",
    strokeWidth: 2.2,
    fill: "none",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg
      ref={ref}
      viewBox="0 0 340 90"
      xmlns="http://www.w3.org/2000/svg"
      className={`overflow-visible ${className}`}
    >
      {/* K */}
      <motion.path
        d="M 14,15 L 14,75"
        {...strokeProps}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
      />
      <motion.path
        d="M 14,44 L 36,15"
        {...strokeProps}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.35, delay: 0.6 }}
      />
      <motion.path
        d="M 14,44 L 36,75"
        {...strokeProps}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.35, delay: 0.95 }}
      />

      {/* i */}
      <motion.path
        d="M 48,30 L 48,75"
        {...strokeProps}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: 1.3 }}
      />
      <motion.circle
        cx="48" cy="22" r="2.5"
        fill="currentColor"
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.2, delay: 1.25 }}
      />

      {/* m */}
      <motion.path
        d="M 58,75 L 58,35 C 58,28 70,25 74,32 L 74,75 C 74,28 86,25 90,32 L 90,75"
        {...strokeProps}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.6 }}
      />

      {/* i */}
      <motion.path
        d="M 100,30 L 100,75"
        {...strokeProps}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: 2.4 }}
      />
      <motion.circle
        cx="100" cy="22" r="2.5"
        fill="currentColor"
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.2, delay: 2.35 }}
      />

      {/* n */}
      <motion.path
        d="M 110,75 L 110,35 C 110,28 128,24 130,35 L 130,75"
        {...strokeProps}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.55, delay: 2.7 }}
      />

      {/* o */}
      <motion.ellipse
        cx="152" cy="55" rx="14" ry="20"
        {...strokeProps}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.55, delay: 3.25 }}
      />

      {/* u */}
      <motion.path
        d="M 175,35 L 175,62 C 175,75 196,78 196,62 L 196,35"
        {...strokeProps}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 3.8 }}
      />

      {/* Flourish underscore line */}
      <motion.path
        d="M 8,84 C 80,80 200,82 280,78"
        strokeWidth={1.2}
        stroke="currentColor"
        strokeOpacity={0.35}
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1, delay: 4.3 }}
      />

      {/* Knox — simplified */}
      <motion.path
        d="M 210,20 L 210,75"
        {...strokeProps}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 4.5 }}
      />
      <motion.path
        d="M 210,47 L 228,20 M 210,47 L 228,75"
        {...strokeProps}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 4.9 }}
      />

      {/* n */}
      <motion.path
        d="M 236,75 L 236,35 C 236,28 254,24 256,35 L 256,75"
        {...strokeProps}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 5.4 }}
      />

      {/* o */}
      <motion.ellipse
        cx="278" cy="55" rx="14" ry="20"
        {...strokeProps}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 5.9 }}
      />

      {/* x */}
      <motion.path
        d="M 300,35 L 325,75 M 325,35 L 300,75"
        {...strokeProps}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 6.4 }}
      />

      {/* Trailing flourish */}
      <motion.path
        d="M 325,75 C 336,72 340,68 338,62"
        strokeWidth={1.5}
        stroke="currentColor"
        strokeOpacity={0.6}
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 6.9 }}
      />
    </svg>
  );
}
