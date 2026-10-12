'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Icon } from './Icons';
import { QuoteButton } from './QuoteButton';
import { NAV, PHONE, PHONE_HREF } from '@/lib/data';

const SPY = ['top', 'services', 'apropos', 'realisations', 'contact'];

export function Header() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [current, setCurrent] = useState('top');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(scrollY > 8);
      const y = scrollY + innerHeight * 0.35;
      let cur = 'top';
      SPY.forEach((id) => { const el = document.getElementById(id); if (el && el.offsetTop <= y) cur = id; });
      if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) cur = 'contact';
      if (scrollY < 10) cur = 'top';
      setCurrent(cur);
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    const mq = matchMedia('(min-width: 1024px)');
    const closeOnDesktop = () => setMenu(false);
    mq.addEventListener('change', closeOnDesktop);
    return () => { removeEventListener('scroll', onScroll); mq.removeEventListener('change', closeOnDesktop); };
  }, []);

  return (
    <header className={scrolled ? 'hdr scrolled' : 'hdr'}>
      <div className="frame hdr-in">
        <a className="logo" href="#top" aria-label="ADP Toiture SA, accueil">
          <Image src="/img/logo.png" width={148} height={106} alt="" preload sizes="104px" />
        </a>
        <nav className="nav" aria-label="Navigation principale">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className={current === n.id ? 'cur' : undefined} aria-current={current === n.id ? 'location' : undefined}>{n.label}</a>
          ))}
        </nav>
        <a className="btn btn-tel" href={PHONE_HREF}><Icon id="phone" className="ic" /><span>{PHONE}</span></a>
        <QuoteButton className="btn btn-red btn-cta" />
        <a className="icon-btn m-only call" href={PHONE_HREF} aria-label={`Appeler le ${PHONE}`}><Icon id="phone" /></a>
        <button type="button" className="icon-btn m-only burger" aria-expanded={menu} aria-controls="menu"
          aria-label={menu ? 'Fermer le menu' : 'Ouvrir le menu'} onClick={() => setMenu((m) => !m)}>
          <span /><span /><span />
        </button>
      </div>
      <nav className="menu" id="menu" aria-label="Menu mobile" hidden={!menu}>
        {NAV.map((n) => <a key={n.id} href={`#${n.id}`} onClick={() => setMenu(false)}>{n.label}</a>)}
        <QuoteButton className="btn btn-red" onOpen={() => setMenu(false)} />
      </nav>
    </header>
  );
}
