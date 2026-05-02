import type { ReactNode } from 'react';
import styles from './popup.module.css';

type PopupProps = {
  isOpen: boolean;
  title: string;
  items: ReactNode[];
  onClose: () => void;
};

export default function Popup({ isOpen, title, items, onClose }: PopupProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <ol className={styles.stepList}>
          {items.map((item, index) => (
            <li key={index} className={styles.stepItem}>
              <span className={styles.stepIndex}>{index + 1}</span>
              <span className={styles.stepText}>{item}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
