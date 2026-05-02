import styles from './card.module.css';

type CardProps = {
  phase: string;
  title: string;
  description: string;
  icon?: string;
  className?: string;
};

export default function Card({ phase, title, description, icon = '💰', className }: CardProps) {
  return (
    <article className={`${styles.card} ${className ?? ''}`}>
      <div className={styles.topAccent} aria-hidden="true" />
      <div className={styles.phase}>{phase}</div>
      <div className={styles.iconBubble} aria-hidden="true">
        <span className={styles.icon}>{icon}</span>
      </div>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.divider} aria-hidden="true" />
      <p className={styles.body}>{description}</p>
    </article>
  );
}
