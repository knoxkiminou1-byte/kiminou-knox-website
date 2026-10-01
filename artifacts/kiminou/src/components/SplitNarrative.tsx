import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { PUBLISHED_BOOK_COUNT } from "@/content/authorProfile";

export default function SplitNarrative() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const leftY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const rightY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ minHeight: "70vh" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[70vh]">
        {/* Left — THE ATHLETE */}
        <motion.div
          className="relative flex flex-col items-start justify-center p-10 md:p-16 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0a0000 0%, #1a0805 50%, #0a0000 100%)",
          }}
          initial={{ x: -60, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Background texture */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, rgba(239,68,68,0.015) 0px, rgba(239,68,68,0.015) 1px, transparent 1px, transparent 20px)",
            }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(180deg, transparent, rgba(251,191,36,0.3), transparent)" }}
          />

          {/* Giant background number */}
          <div
            className="absolute -right-4 top-1/2 -translate-y-1/2 font-serif font-light pointer-events-none select-none"
            style={{ fontSize: "clamp(140px,20vw,220px)", color: "rgba(239,68,68,0.04)", lineHeight: 1 }}
          >
            6'7
          </div>

          <motion.div style={{ y: leftY }}>
            <motion.p
              className="text-[10px] uppercase tracking-[0.45em] text-red-400/60 mb-6"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              On the court
            </motion.p>

            <motion.h2
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-none"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              The
              <br />
              <span className="text-red-400/90">Athlete</span>
            </motion.h2>

            <motion.div
              className="w-10 h-px bg-red-400/40 mb-6"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.7 }}
              style={{ transformOrigin: "left" }}
            />

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {[
                ["6'7\"", "on the court"],
                ["235 lbs", "of controlled force"],
                ["Multi-Sport", "captain & leader"],
                ["Class of 2025", "varsity athlete"],
              ].map(([stat, label]) => (
                <div key={stat} className="flex items-baseline gap-3">
                  <span className="font-serif text-xl text-white font-light">{stat}</span>
                  <span className="text-xs text-white/30 uppercase tracking-[0.15em]">{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right — THE AUTHOR */}
        <motion.div
          className="relative flex flex-col items-start justify-center p-10 md:p-16 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #060401 0%, #120d04 50%, #060401 100%)",
          }}
          initial={{ x: 60, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Background texture */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-45deg, rgba(251,191,36,0.012) 0px, rgba(251,191,36,0.012) 1px, transparent 1px, transparent 20px)",
            }}
          />

          {/* Giant background number */}
          <div
            className="absolute -left-2 top-1/2 -translate-y-1/2 font-serif font-light pointer-events-none select-none"
            style={{ fontSize: "clamp(140px,20vw,220px)", color: "rgba(251,191,36,0.04)", lineHeight: 1 }}
          >
            7
          </div>

          <motion.div style={{ y: rightY }}>
            <motion.p
              className="text-[10px] uppercase tracking-[0.45em] text-amber-400/60 mb-6"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
            >
              On the page
            </motion.p>

            <motion.h2
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-none"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              The
              <br />
              <span className="text-amber-300/90">Author</span>
            </motion.h2>

            <motion.div
              className="w-10 h-px bg-amber-400/40 mb-6"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.8 }}
              style={{ transformOrigin: "left" }}
            />

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              {[
                [`${PUBLISHED_BOOK_COUNT} Books`, "published since 2020"],
                ["Faith · Love · Identity", "recurring themes"],
                ["Top Essay Winner", "2025 Miles Hall Youth Summit"],
                ["The Tee Shirt Teens", "founder & director"],
              ].map(([stat, label]) => (
                <div key={stat} className="flex items-baseline gap-3">
                  <span className="font-serif text-xl text-white font-light">{stat}</span>
                  <span className="text-xs text-white/30 uppercase tracking-[0.15em]">{label}</span>
                </div>
              ))}
            </motion.div>

            <motion.blockquote
              className="mt-8 border-l border-amber-400/30 pl-4"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <p className="font-serif italic text-white/45 text-sm leading-relaxed">
                "Seeking is its own form of finding."
              </p>
            </motion.blockquote>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
