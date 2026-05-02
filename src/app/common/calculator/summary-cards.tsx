'use client';

import { PopValue, StaggerGroup, StaggerItem } from '@/app/common/animations/animations';

type SummaryCardsProps = {
  need: string;
  have: string;
  gap: string;
  containerClassName: string;
  cardClassName: string;
  needCardClassName: string;
  haveCardClassName: string;
  gapCardClassName: string;
  labelClassName: string;
  valueClassName: string;
  gapValueClassName?: string;
  needLabel?: string;
  haveLabel?: string;
  gapLabel?: string;
};

export default function SummaryCards({
  need,
  have,
  gap,
  containerClassName,
  cardClassName,
  needCardClassName,
  haveCardClassName,
  gapCardClassName,
  labelClassName,
  valueClassName,
  gapValueClassName,
  needLabel = 'I Need',
  haveLabel = 'I Have',
  gapLabel = 'My Gap',
}: SummaryCardsProps) {
  const cards = [
    {
      id: 'need',
      label: needLabel,
      value: need,
      cardClassName: needCardClassName,
      valueClassName: valueClassName,
    },
    {
      id: 'have',
      label: haveLabel,
      value: have,
      cardClassName: haveCardClassName,
      valueClassName: valueClassName,
    },
    {
      id: 'gap',
      label: gapLabel,
      value: gap,
      cardClassName: gapCardClassName,
      valueClassName: `${valueClassName} ${gapValueClassName ?? ''}`.trim(),
    },
  ] as const;

  return (
    <StaggerGroup className={containerClassName}>
      {cards.map((card, index) => (
        <StaggerItem key={card.id} index={index}>
          <article className={`${cardClassName} ${card.cardClassName}`}>
            <div className={labelClassName}>{card.label}</div>
            <PopValue valueKey={`${card.id}-${card.value}`} className={card.valueClassName}>
              {card.value}
            </PopValue>
          </article>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
