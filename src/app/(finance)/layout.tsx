import { FinanceProvider } from '@/app/finance-provider';

type FinanceLayoutProps = {
  children: React.ReactNode;
};

export default function FinanceLayout({ children }: FinanceLayoutProps) {
  return <FinanceProvider>{children}</FinanceProvider>;
}
