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
  return (
    <div className={containerClassName}>
      <article className={`${cardClassName} ${needCardClassName}`}>
        <div className={labelClassName}>{needLabel}</div>
        <div className={valueClassName}>{need}</div>
      </article>
      <article className={`${cardClassName} ${haveCardClassName}`}>
        <div className={labelClassName}>{haveLabel}</div>
        <div className={valueClassName}>{have}</div>
      </article>
      <article className={`${cardClassName} ${gapCardClassName}`}>
        <div className={labelClassName}>{gapLabel}</div>
        <div className={`${valueClassName} ${gapValueClassName ?? ''}`.trim()}>{gap}</div>
      </article>
    </div>
  );
}
