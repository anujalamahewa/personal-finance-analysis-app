import { type ReactNode } from 'react';
import { RevealSection } from '@/app/common/animations/animations';
import RedLine from '@/app/common/red-line/red-line';
import styles from './single-page-title.module.css';

type SinglePageTitleProps = {
  label: ReactNode;
  title: ReactNode;
  description: ReactNode;
  className?: string;
  labelClassName?: string;
  titleClassName?: string;
  lineClassName?: string;
  descriptionClassName?: string;
};

export default function SinglePageTitle({
  label,
  title,
  description,
  className,
  labelClassName,
  titleClassName,
  lineClassName,
  descriptionClassName,
}: SinglePageTitleProps) {
  return (
    <RevealSection className={`${styles.root} ${className ?? ''}`}>
      <h2 className={`${styles.label} ${labelClassName ?? ''}`}>{label}</h2>
      <h1 className={`${styles.title} ${titleClassName ?? ''}`}>{title}</h1>
      <RedLine className={`${styles.line} ${lineClassName ?? ''}`} />
      <p className={`${styles.description} ${descriptionClassName ?? ''}`}>{description}</p>
    </RevealSection>
  );
}
