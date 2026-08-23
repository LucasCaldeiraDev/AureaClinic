import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Media queries centralizadas: animações de scroll só em desktop sem prefers-reduced-motion.
export const MQ_MOTION_DESKTOP = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";
export const MQ_MOTION_ANY = "(prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger, useGSAP };
