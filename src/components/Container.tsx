import type { PropsWithChildren } from 'react';

type ContainerProps = PropsWithChildren<{ className?: string }>;

// Shared layout wrapper to keep all sections centered consistently
export default function Container({ children, className }: ContainerProps) {
  const cls = ['page-container', className].filter(Boolean).join(' ');
  return <div className={cls}>{children}</div>;
}
