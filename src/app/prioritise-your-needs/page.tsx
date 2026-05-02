'use client';

import { useMemo } from 'react';
import FinanceRoutePage from '@/lib/FinanceRoutePage';
import { useFinance } from '@/lib/FinanceProvider';
import { formatCurrency } from '@/lib/calculations';
import { type NeedKey } from '@/lib/types';
import styles from './page.module.css';

const DISPLAY_KEYS: NeedKey[] = ['retirement', 'life', 'medical'];

const DISPLAY_LABELS: Record<NeedKey, string> = {
  retirement: 'Happy Retirement',
  life: 'Family Income Protection',
  medical: 'Medical Emergency Funds',
  disability: 'Disability Protection',
  education: 'Higher Education Fund',
  criticalIllness: 'Critical Illness Cover',
};

const DISPLAY_ICONS: Record<NeedKey, string> = {
  retirement: '💰',
  life: '👪',
  medical: '🏥',
  disability: '🛟',
  education: '🎓',
  criticalIllness: '🛡️',
};

export default function PriorityNeedsPage() {
  const { computed, state, movePriorityUp, movePriorityDown } = useFinance();

  const needsByKey = useMemo(() => {
    const map = new Map<NeedKey, (typeof computed.needs)[number]>();
    computed.needs.forEach((need) => {
      map.set(need.key, need);
    });
    return map;
  }, [computed.needs]);

  const displayedPriorityNeeds = useMemo(() => {
    return state.priorities
      .filter((key): key is NeedKey => DISPLAY_KEYS.includes(key))
      .map((key) => {
        const need = needsByKey.get(key);
        return {
          key,
          label: DISPLAY_LABELS[key],
          icon: DISPLAY_ICONS[key],
          gap: need?.gap ?? 0,
        };
      });
  }, [state.priorities, needsByKey]);

  function handleMoveUp(key: NeedKey) {
    const displayedOrder = state.priorities.filter((needKey) => DISPLAY_KEYS.includes(needKey));
    const currentPosition = displayedOrder.indexOf(key);
    if (currentPosition <= 0) {
      return;
    }

    const previousKey = displayedOrder[currentPosition - 1];
    const currentIndex = state.priorities.indexOf(key);
    const previousIndex = state.priorities.indexOf(previousKey);
    const jumps = Math.max(1, currentIndex - previousIndex);

    for (let step = 0; step < jumps; step += 1) {
      movePriorityUp(key);
    }
  }

  function handleMoveDown(key: NeedKey) {
    const displayedOrder = state.priorities.filter((needKey) => DISPLAY_KEYS.includes(needKey));
    const currentPosition = displayedOrder.indexOf(key);
    if (currentPosition < 0 || currentPosition >= displayedOrder.length - 1) {
      return;
    }

    const nextKey = displayedOrder[currentPosition + 1];
    const currentIndex = state.priorities.indexOf(key);
    const nextIndex = state.priorities.indexOf(nextKey);
    const jumps = Math.max(1, nextIndex - currentIndex);

    for (let step = 0; step < jumps; step += 1) {
      movePriorityDown(key);
    }
  }

  return (
    <FinanceRoutePage
      routeId="prioritise-your-needs"
      customBody={
        <section className={styles.pageWrap}>
          <div className={styles.heroLabel}>Now That You&apos;ve Seen the Numbers</div>
          <h1 className={styles.heroTitle}>
            Prioritise
            <br />
            Your
            <br />
            Needs
          </h1>
          <p className={styles.heroBody}>
            Based on the gaps we&apos;ve identified, drag or use the arrows to rank these needs in
            order of importance to you. This shapes the solution we build together.
          </p>

          <div className={styles.priorityList}>
            {displayedPriorityNeeds.map((need, index) => (
              <article key={need.key} className={styles.priorityRow}>
                <div className={styles.rankBadge}>{index + 1}</div>

                <div
                  className={`${styles.priorityItem} ${index === 0 ? styles.priorityActive : ''}`}
                >
                  <div className={styles.priorityName}>
                    <span className={styles.priorityIcon}>{need.icon}</span>
                    {need.label}
                  </div>
                  {need.gap > 0 && (
                    <div className={styles.priorityGap}>Gap: {formatCurrency(need.gap)}</div>
                  )}
                </div>

                <div className={styles.arrowControls}>
                  <button
                    className={styles.arrowBtn}
                    onClick={() => handleMoveUp(need.key)}
                    aria-label={`Move ${need.label} up`}
                  >
                    ▲
                  </button>
                  <button
                    className={styles.arrowBtn}
                    onClick={() => handleMoveDown(need.key)}
                    aria-label={`Move ${need.label} down`}
                  >
                    ▼
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      }
    />
  );
}
