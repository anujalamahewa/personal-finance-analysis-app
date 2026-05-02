'use client';

import { type ReactNode, useEffect } from 'react';
import { financeRoutes, getRouteById, getRouteIndex, type FinanceRouteId } from '@/lib/routes';
import Header from '@/app/common/Header';
import Footer from '@/app/common/Footer';
import { useFinance } from './FinanceProvider';
import styles from './FinanceRoutePage.module.css';

type FinanceRoutePageProps = {
  routeId: FinanceRouteId;
  customBody?: ReactNode;
};

export default function FinanceRoutePage({ routeId, customBody }: FinanceRoutePageProps) {
  const isWelcomeRoute = routeId === 'welcome';
  const route = getRouteById(routeId);
  const routeIndex = getRouteIndex(routeId);
  const prevRoute = routeIndex > 0 ? financeRoutes[routeIndex - 1] : null;
  const nextRoute = routeIndex < financeRoutes.length - 1 ? financeRoutes[routeIndex + 1] : null;
  const { setLastRoute } = useFinance();

  useEffect(() => {
    setLastRoute(routeId);
  }, [routeId]);

  const body =
    customBody !== undefined
      ? customBody
      : (() => {
          switch (routeId) {
            default:
              return (
                <>
                  <div className={styles.heroLabel}>Financial Analysis</div>
                  <h1 className={styles.heroTitle}>{route?.title ?? 'Page'}</h1>
                </>
              );
          }
        })();

  return (
    <div className={`${styles.shell} ${isWelcomeRoute ? styles.shellWelcome : ''}`}>
      <Header routeId={routeId} routeIndex={routeIndex} />

      <main className={`${styles.main} ${isWelcomeRoute ? styles.mainWelcome : ''}`}>
        {body}
        <Footer
          prevRoute={prevRoute}
          nextRoute={nextRoute}
          routeIndex={routeIndex}
          totalSteps={financeRoutes.length}
        />
      </main>
    </div>
  );
}
