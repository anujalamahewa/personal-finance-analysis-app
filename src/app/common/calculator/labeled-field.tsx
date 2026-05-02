import { type ReactNode } from 'react';

type LabeledFieldProps = {
  label: string;
  children: ReactNode;
  wrapperClassName?: string;
  labelClassName?: string;
};

export default function LabeledField({
  label,
  children,
  wrapperClassName,
  labelClassName,
}: LabeledFieldProps) {
  return (
    <div className={wrapperClassName}>
      <label className={labelClassName}>{label}</label>
      {children}
    </div>
  );
}
