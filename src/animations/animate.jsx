import { motion } from "framer-motion";

export const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: "easeOut" }
};

export const fadeInUpDelayed = (delay = 0.2) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.9, ease: "easeOut", delay }
});

export const MotionDiv = (props) => {
  return (
    <motion.div
      initial={props.initial}
      whileInView={props.whileInView}
      viewport={props.viewport}
      transition={props.transition}
      style={props.style}
    >
      {props.children}
    </motion.div>
  );
};
