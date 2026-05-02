'use client';

import { useMemo, useState, type TouchEvent } from 'react';
import FinanceRoutePage from '@/app/finance-route-page';
import RedLine from '@/app/common/red-line/red-line';
import { useFinance } from '@/app/finance-provider';
import { formatCurrency } from '@/lib/calculations';
import { type NeedKey } from '@/lib/types';
import styles from './page.module.css';

const DISPLAY_KEYS: NeedKey[] = ['retirement', 'life', 'medical'];

const DISPLAY_LABELS: Record<NeedKey, string> = {
  retirement: 'Happy Retirement',
  life: 'Family Income Protection',
  medical: 'Medical Emergency Fund',
  disability: 'Disability Protection',
  education: 'Higher Education Fund',
  criticalIllness: 'Critical Illness Cover',
};

const DISPLAY_DESCRIPTIONS: Record<NeedKey, string> = {
  retirement: 'Having enough to live comfortably after you stop working.',
  life: "Protecting your loved ones and maintaining your family's lifestyle.",
  medical: 'Being prepared for unexpected medical expenses and emergencies.',
  disability: 'Protecting your income if illness or injury stops you from working.',
  education: "Planning in advance for your children's higher education costs.",
  criticalIllness: 'A lump sum to support treatment and income recovery.',
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
  const [draggedKey, setDraggedKey] = useState<NeedKey | null>(null);
  const [dropTargetKey, setDropTargetKey] = useState<NeedKey | null>(null);

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
          description: DISPLAY_DESCRIPTIONS[key],
          icon: DISPLAY_ICONS[key],
          gap: need?.gap ?? 0,
        };
      });
  }, [state.priorities, needsByKey]);

  const displayedOrder = useMemo(
    () => state.priorities.filter((needKey): needKey is NeedKey => DISPLAY_KEYS.includes(needKey)),
    [state.priorities],
  );

  function reorderDisplayedNeeds(fromKey: NeedKey, toKey: NeedKey) {
    if (fromKey === toKey) {
      return;
    }

    const fromIndex = displayedOrder.indexOf(fromKey);
    const toIndex = displayedOrder.indexOf(toKey);
    if (fromIndex < 0 || toIndex < 0) {
      return;
    }

    const steps = Math.abs(toIndex - fromIndex);
    if (steps === 0) {
      return;
    }

    if (fromIndex < toIndex) {
      for (let step = 0; step < steps; step += 1) {
        movePriorityDown(fromKey);
      }
      return;
    }

    for (let step = 0; step < steps; step += 1) {
      movePriorityUp(fromKey);
    }
  }

  function clearDragState() {
    setDraggedKey(null);
    setDropTargetKey(null);
  }

  function handleDragStart(key: NeedKey) {
    setDraggedKey(key);
    setDropTargetKey(key);
  }

  function handleDrop(key: NeedKey) {
    if (draggedKey) {
      reorderDisplayedNeeds(draggedKey, key);
    }
    clearDragState();
  }

  function handleTouchMove(event: TouchEvent<HTMLElement>) {
    if (!draggedKey) {
      return;
    }

    const touch = event.touches[0];
    if (!touch) {
      return;
    }

    const targetElement = document
      .elementFromPoint(touch.clientX, touch.clientY)
      ?.closest('[data-priority-key]');

    const targetKey = targetElement?.getAttribute('data-priority-key') as NeedKey | null;
    if (targetKey && DISPLAY_KEYS.includes(targetKey)) {
      setDropTargetKey(targetKey);
    }

    event.preventDefault();
  }

  function handleTouchEnd() {
    if (draggedKey && dropTargetKey) {
      reorderDisplayedNeeds(draggedKey, dropTargetKey);
    }
    clearDragState();
  }

  return (
    <FinanceRoutePage
      routeId="priorities"
      customBody={
        <section className={styles.pageWrap}>
          <div className={styles.workspace}>
            <section className={styles.contextColumn}>
              <div className={styles.heroLabel}>Now That You&apos;ve Seen the Numbers</div>
              <h1 className={styles.heroTitle}>
                Prioritise Your <span className={styles.heroAccent}>Needs</span>
              </h1>
              <RedLine className={styles.heroUnderline} />
              <p className={styles.heroBody}>
                Based on the gaps we&apos;ve identified, drag or use touch to rank these needs in
                order of importance to you.
                <br />
                This shapes the solution we build together.
              </p>

              <article className={styles.futureCard}>
                <div className={styles.futureIcon} aria-hidden="true">
                  ☆
                </div>
                <div>
                  <h2 className={styles.futureTitle}>Your priorities, your future</h2>
                  <p className={styles.futureBody}>
                    You&apos;re in control. Rank what matters most so we can build the right plan
                    for you.
                  </p>
                </div>
              </article>

              <p className={styles.tipBanner}>Tip: Drag by the handle to reorder priorities</p>
            </section>

            <section className={styles.interactionColumn}>
              <h2 className={styles.listTitle}>Rank These Needs</h2>
              <div className={styles.priorityList}>
                {displayedPriorityNeeds.map((need, index) => (
                  <article
                    key={need.key}
                    className={`${styles.priorityRow} ${draggedKey === need.key ? styles.priorityRowDragging : ''} ${dropTargetKey === need.key ? styles.priorityRowDropTarget : ''}`}
                    data-priority-key={need.key}
                    draggable
                    onDragStart={(event) => {
                      event.dataTransfer.effectAllowed = 'move';
                      handleDragStart(need.key);
                    }}
                    onDragOver={(event) => {
                      event.preventDefault();
                      if (draggedKey && draggedKey !== need.key) {
                        setDropTargetKey(need.key);
                      }
                    }}
                    onDrop={(event) => {
                      event.preventDefault();
                      handleDrop(need.key);
                    }}
                    onDragEnd={clearDragState}
                    onTouchStart={() => handleDragStart(need.key)}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onTouchCancel={clearDragState}
                  >
                    <div
                      className={`${styles.rankBadge} ${index === 0 ? styles.rankBadgeActive : ''}`}
                    >
                      {index + 1}
                    </div>

                    <div
                      className={`${styles.priorityItem} ${index === 0 ? styles.priorityActive : ''}`}
                    >
                      <div className={styles.priorityMain}>
                        <button
                          type="button"
                          className={styles.dragHandle}
                          aria-label={`Drag to reorder ${need.label}`}
                        >
                          <span className={styles.dragDot} />
                          <span className={styles.dragDot} />
                          <span className={styles.dragDot} />
                          <span className={styles.dragDot} />
                          <span className={styles.dragDot} />
                          <span className={styles.dragDot} />
                        </button>
                        <span className={styles.priorityIcon}>{need.icon}</span>
                        <div>
                          <div className={styles.priorityName}>{need.label}</div>
                          <p className={styles.priorityDescription}>{need.description}</p>
                        </div>
                      </div>
                      {need.gap > 0 && (
                        <div className={styles.priorityGapBlock}>
                          <div className={styles.priorityGapLabel}>Gap</div>
                          <div className={styles.priorityGap}>{formatCurrency(need.gap)}</div>
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </section>
      }
    />
  );
}
