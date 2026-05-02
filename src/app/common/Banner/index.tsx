import Link from 'next/link';
import styles from './banner.module.css';

type BannerProps = {
  href: string;
  label: string;
};

export default function Banner({ href, label }: BannerProps) {
  return (
    <Link href={href} className={styles.banner}>
      {label}
    </Link>
  );
}
