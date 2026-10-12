'use client';

import { Icon } from './Icons';
import { useUI } from './SiteUI';

export function QuoteButton({ className, label = 'Demander un devis', arrow = true, onOpen }: {
  className: string; label?: string; arrow?: boolean; onOpen?: () => void;
}) {
  const { openQuote } = useUI();
  return (
    <button type="button" className={className} onClick={() => { onOpen?.(); openQuote(); }}>
      <span>{label}</span>{arrow && <Icon id="arrow" className="arr" />}
    </button>
  );
}
