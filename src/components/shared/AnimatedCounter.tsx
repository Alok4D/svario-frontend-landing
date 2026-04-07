"use client";

import { useEffect, useRef } from "react";
import {
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

export interface AnimatedCounterProps {
  /** Target number to count up to */
  value: number;
  /** Text appended after the number (e.g. "%", "x", "+") */
  suffix?: string;
  /** Text prepended before the number (e.g. "$") */
  prefix?: string;
  /** Animation duration in seconds */
  duration?: number;
  /** Custom easing curve [x1, y1, x2, y2] */
  ease?: [number, number, number, number];
  /** IntersectionObserver margin for triggering the animation */
  triggerMargin?: string;
}

/**
 * Reusable animated counter that counts from 0 → `value` with a smooth
 * spring-like easing when the element scrolls into view.
 *
 * Usage:
 * ```tsx
 * <AnimatedCounter value={500} suffix="+" duration={2.4} />
 * ```
 */
const AnimatedCounter = ({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  ease = [0.16, 1, 0.3, 1],
  triggerMargin = "-40px",
}: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (latest) => Math.round(latest));
  const isInView = useInView(ref, { once: true, margin: triggerMargin as `${number}px` });

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionVal, value, {
      duration,
      ease,
    });
    return controls.stop;
  }, [isInView, motionVal, value, duration, ease]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${latest}${suffix}`;
      }
    });
    return unsubscribe;
  }, [rounded, prefix, suffix]);

  return <span ref={ref}>{`${prefix}0${suffix}`}</span>;
};

export default AnimatedCounter;
