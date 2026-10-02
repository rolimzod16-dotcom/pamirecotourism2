'use client';
import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.65, ease: 'easeOut' }}>{children}</motion.div>;
}
