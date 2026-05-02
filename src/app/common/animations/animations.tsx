'use client';

import { type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

type ClassNameProps = {
  className?: string;
  children: ReactNode;
};

type AnimatedPageProps = ClassNameProps & {
  pageKey: string;
};

type StaggerItemProps = ClassNameProps & {
  index?: number;
};

export function AnimatedPage({ pageKey, className, children }: AnimatedPageProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      key={pageKey}
      className={className}
      initial={reducedMotion ? undefined : { opacity: 0, y: 12 }}
      animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      transition={reducedMotion ? undefined : { duration: 0.35, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export function RevealSection({ className, children }: ClassNameProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerGroup({ className, children }: ClassNameProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.06,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ className, children, index = 0 }: StaggerItemProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 12 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.3, ease: 'easeOut', delay: index * 0.01 },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

type PopValueProps = {
  valueKey: string;
  className?: string;
  children: ReactNode;
};

export function PopValue({ valueKey, className, children }: PopValueProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.span
      key={valueKey}
      className={className}
      initial={reducedMotion ? undefined : { opacity: 0, scale: 0.92 }}
      animate={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
      transition={reducedMotion ? undefined : { duration: 0.28, ease: 'easeOut' }}
    >
      {children}
    </motion.span>
  );
}
