import Link from 'next/link';
import styles from './banner.module.css';

type BannerProps = {
  href: string;
  label: string;
  className?: string;
};

export default function Banner({ href, label, className }: BannerProps) {
  return (
    <Link href={href} className={`${styles.banner} ${className ?? ''}`}>
      <span>{label}</span>
    </Link>
  );
}
