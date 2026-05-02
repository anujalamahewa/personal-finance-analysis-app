import { FinanceProvider } from '@/app/FinanceProvider';

type FinanceLayoutProps = {
  children: React.ReactNode;
};

export default function FinanceLayout({ children }: FinanceLayoutProps) {
  return <FinanceProvider>{children}</FinanceProvider>;
}
