import { useEffect } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useLocation } from "wouter";

/**
 * ProfessionalAtmosphere restores the earlier site's sense of depth:
 * scroll progress, floating ambient shapes, orbiting rings, and section reveals.
 * It is decorative only and intentionally separate from the future Pixel world.
 */
export default function ProfessionalAtmosphere() {
  const [location] = useLocation();
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 130, damping: 28, mass: 0.25 });
  const slowRotate = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 120]);
  const reverseRotate = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -86]);
  const driftY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -140]);
  const driftYTwo = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 110]);

  useEffect(() => {
    if (reduceMotion || typeof IntersectionObserver === "undefined") return;

    let observer: IntersectionObserver | null = null;
    const frame = window.requestAnimationFrame(() => {
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>(
          "main > section:not(.kk-hero), main > article, main article"
        )
      );

      nodes.forEach((node) => node.classList.add("kk-scroll-reveal"));

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              (entry.target as HTMLElement).classList.add("kk-inview");
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
      );

      nodes.forEach((node) => observer?.observe(node));
    });

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [location, reduceMotion]);

  return (
    <>
      <motion.div
        className="kk-scroll-progress"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />
      <div className="kk-atmosphere" aria-hidden="true">
        <motion.div className="kk-orbit kk-orbit-one" style={{ rotate: slowRotate, y: driftY }}>
          <span />
          <span />
          <span />
        </motion.div>
        <motion.div className="kk-orbit kk-orbit-two" style={{ rotate: reverseRotate, y: driftYTwo }}>
          <span />
          <span />
        </motion.div>
        <motion.div className="kk-float-shard kk-float-shard-one" style={{ y: driftY }} />
        <motion.div className="kk-float-shard kk-float-shard-two" style={{ y: driftYTwo }} />
        <div className="kk-purple-haze kk-purple-haze-one" />
        <div className="kk-purple-haze kk-purple-haze-two" />
      </div>
      <div className="kk-grain" aria-hidden="true" />
    </>
  );
}
