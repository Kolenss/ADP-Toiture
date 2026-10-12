'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icons';
import { QuoteButton } from './QuoteButton';
import { useUI } from './SiteUI';
import { PHONE_HREF, PROJECTS, REVIEWS, SERVICES, type Category } from '@/lib/data';

const idx = (i: number) => ({ '--i': i }) as React.CSSProperties;

export function Services() {
  const { openService } = useUI();
  return (
    <section className="sec svc-sec" id="services" aria-labelledby="svc-title">
      <div className="frame">
        <div className="sec-head rv">
          <p className="eyebrow t">Nos services</p>
          <h2 className="t" id="svc-title">Notre savoir-faire.</h2>
          <a className="more t" href="#services" onClick={(e) => { e.preventDefault(); openService(0); }}>
            Voir tous nos services<Icon id="arrow" />
          </a>
        </div>
        <ul className="svc-list" role="list">
          {SERVICES.map((s, i) => (
            <li className="svc rv" style={idx(i)} key={s.title}>
              <button type="button" aria-label={`${s.title} : en savoir plus`} onClick={() => openService(i)}>
                <span className="svc-media">
                  <Image src={s.img} width={s.width} height={232} alt="" sizes="(min-width: 1024px) 23vw, 80vw" />
                  <span className="svc-ic"><Icon id={s.icon} /></span>
                </span>
                <span className="svc-t t">{s.title}</span>
                <span className="svc-d t fb">{s.lines[0]}<br className="d-br" /> {s.lines[1]}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const FILTERS: { id: 'all' | Category; label: string }[] = [
  { id: 'all', label: 'Tous' }, { id: 'couv', label: 'Couverture' }, { id: 'etan', label: 'Étanchéité' }, { id: 'ferb', label: 'Ferblanterie' },
];

export function Projects() {
  const { openProject } = useUI();
  const [filter, setFilter] = useState<'all' | Category>('all');
  const [popKey, setPopKey] = useState(0);
  const visible = PROJECTS.map((_, i) => i).filter((i) => filter === 'all' || PROJECTS[i].cat === filter);
  const count = (id: 'all' | Category) => (id === 'all' ? PROJECTS.length : PROJECTS.filter((p) => p.cat === id).length);

  return (
    <section className="sec prj-sec" id="realisations" aria-labelledby="prj-title">
      <div className="frame">
        <div className="sec-head rv">
          <p className="eyebrow t">Nos réalisations</p>
          <h2 className="t" id="prj-title">Des projets variés à Genève.</h2>
          <a className="more t" href="#realisations" onClick={(e) => { e.preventDefault(); openProject(visible[0], visible); }}>
            Voir toutes nos réalisations<Icon id="arrow" />
          </a>
        </div>
        <div className="chips m-only" role="group" aria-label="Filtrer les réalisations">
          {FILTERS.map((f) => (
            <button key={f.id} type="button" className={filter === f.id ? 'chip on' : 'chip'} aria-pressed={filter === f.id}
              onClick={() => { setFilter(f.id); setPopKey((k) => k + 1); }}>
              {f.label} <span>{count(f.id)}</span>
            </button>
          ))}
        </div>
        <ul className="prj-list" role="list">
          {PROJECTS.map((p, i) => {
            const shown = visible.includes(i);
            return (
              <li key={i} className={`prj rv${shown ? '' : ' out'}`} style={idx(i)}>
                {/* the inner key replays the pop animation when the filter changes */}
                <button key={popKey} className={popKey ? 'pop-in' : undefined} type="button" onClick={() => openProject(i, visible)}
                  aria-label={`${p.title}, ${p.loc} : voir le projet`}>
                  <span className="prj-media">
                    <Image src={p.img} width={p.width} height={218} alt="" sizes="(min-width: 1024px) 23vw, 45vw" />
                    <span className="zoom"><Icon id="expand" /></span>
                  </span>
                  <span className="prj-t t">{p.title}</span>
                  <span className="prj-l t fb"><Icon id="pin" />{p.loc}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function Reviews() {
  const track = useRef<HTMLDivElement>(null);
  const [cur, setCur] = useState(0);

  const cards = () => Array.from(track.current?.querySelectorAll<HTMLElement>('.rv-card') ?? []);
  const nearest = () => {
    const t = track.current!;
    const mid = t.scrollLeft + t.clientWidth / 2;
    let best = 0, dist = Infinity;
    cards().forEach((c, i) => { const d = Math.abs(c.offsetLeft - t.offsetLeft + c.offsetWidth / 2 - mid); if (d < dist) { dist = d; best = i; } });
    return best;
  };
  const go = (i: number) => {
    const t = track.current!, list = cards();
    const c = list[(i + list.length) % list.length];
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    t.scrollTo({ left: c.offsetLeft - t.offsetLeft - (t.clientWidth - c.offsetWidth) / 2, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <section className="sec rv-sec" id="avis" aria-labelledby="rv-title">
      <div className="frame">
        <div className="sec-head rv">
          <p className="eyebrow t">Ils nous font confiance</p>
          <h2 className="t" id="rv-title">Des clients satisfaits.</h2>
          <a className="btn btn-line-dark btn-avis" href="#avis"><span>Voir tous les avis</span><Icon id="arrow" className="arr" /></a>
        </div>
        <div className="rv-track" ref={track} tabIndex={0} aria-label="Avis clients" onScroll={() => setCur(nearest())}>
          {REVIEWS.map((r, i) => (
            <figure className="rv-card rv" style={idx(i)} key={r.name}>
              <span className="stars" role="img" aria-label="5 étoiles sur 5">
                {[0, 1, 2, 3, 4].map((s) => <Icon key={s} id="star" />)}
              </span>
              <blockquote className="t fb">« {r.lines[0]}<br className="d-br" /> {r.lines[1]} »</blockquote>
              <figcaption><b className="t">{r.name}</b><span className="t fb">{r.role}</span></figcaption>
              <Icon id="quote" className="qm" />
            </figure>
          ))}
        </div>
        <div className="rv-ctrl m-only">
          <div className="dots" role="group" aria-label="Choisir un avis">
            {REVIEWS.map((r, i) => (
              <button key={r.name} type="button" className={cur === i ? 'on' : undefined} aria-label={`Avis ${i + 1} sur ${REVIEWS.length}`}
                aria-pressed={cur === i} onClick={() => go(i)}><span /></button>
            ))}
          </div>
          <div className="arrows">
            <button type="button" className="icon-btn" aria-label="Avis précédent" onClick={() => go(nearest() - 1)}><Icon id="left" /></button>
            <button type="button" className="icon-btn" aria-label="Avis suivant" onClick={() => go(nearest() + 1)}><Icon id="right" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Dock() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById('top');
      setShow(scrollY > (hero?.offsetHeight ?? 600) * 0.6);
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className={show ? 'dock m-only show' : 'dock m-only'}>
      <a className="btn btn-soft" href={PHONE_HREF}><Icon id="phone" className="ic" /><span>Appeler</span></a>
      <QuoteButton className="btn btn-red" arrow={false} />
    </div>
  );
}
