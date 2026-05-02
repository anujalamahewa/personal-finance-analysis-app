'use client';

import styles from './card.module.css';
import { motion, useReducedMotion } from 'motion/react';

type CardProps = {
  phase: string;
  title: string;
  description: string;
  icon?: string;
  className?: string;
  delay?: number;
};

export default function Card({
  phase,
  title,
  description,
  icon = '💰',
  className,
  delay = 0,
}: CardProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      className={`${styles.card} ${className ?? ''}`}
      initial={reducedMotion ? undefined : { opacity: 0, y: 12 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={reducedMotion ? undefined : { once: true, amount: 0.2 }}
      transition={
        reducedMotion ? undefined : { duration: 0.3, ease: 'easeOut', delay: Math.max(0, delay) }
      }
      whileHover={reducedMotion ? undefined : { y: -3 }}
      whileTap={reducedMotion ? undefined : { scale: 0.99 }}
    >
      <div className={styles.topAccent} aria-hidden="true" />
      <div className={styles.phase}>{phase}</div>
      <div className={styles.iconBubble} aria-hidden="true">
        <span className={styles.icon}>{icon}</span>
      </div>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.divider} aria-hidden="true" />
      <p className={styles.body}>{description}</p>
    </motion.article>
  );
}
