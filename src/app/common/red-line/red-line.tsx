import styles from './red-line.module.css';

type RedLineProps = {
  className?: string;
};

export default function RedLine({ className }: RedLineProps) {
  return <div className={`${styles.accent} ${className ?? ''}`} aria-hidden="true" />;
}
