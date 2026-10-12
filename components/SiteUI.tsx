'use client';

import Image from 'next/image';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Icon } from './Icons';
import { CATEGORIES, EMAIL, PROJECTS, SERVICES, type IconName } from '@/lib/data';

type UI = {
  openService: (i: number) => void;
  openProject: (i: number, order?: number[]) => void;
  openQuote: (service?: string) => void;
};

const Ctx = createContext<UI | null>(null);

export function useUI() {
  const ui = useContext(Ctx);
  if (!ui) throw new Error('useUI outside <SiteUI>');
  return ui;
}

/** Keeps a native <dialog> in sync with React state (showModal gives focus trap, Esc and inert page). */
function useDialog(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  const props = {
    ref,
    onClose,
    onClick: (e: React.MouseEvent<HTMLDialogElement>) => { if (e.target === e.currentTarget) onClose(); },
  };
  return props;
}

export function SiteUI({ children }: { children: ReactNode }) {
  const [service, setService] = useState<number | null>(null);
  const [project, setProject] = useState<{ i: number; order: number[] } | null>(null);
  const [quote, setQuote] = useState<{ key: number; service?: string } | null>(null);

  const ui = useMemo<UI>(() => ({
    openService: (i) => setService(i),
    openProject: (i, order = PROJECTS.map((_, k) => k)) => setProject({ i, order }),
    openQuote: (s) => { setService(null); setQuote({ key: Date.now(), service: s }); },
  }), []);

  return (
    <Ctx.Provider value={ui}>
      {children}
      <ServiceDialog index={service} onClose={() => setService(null)} onStep={(d) => setService((i) => ((i ?? 0) + d + SERVICES.length) % SERVICES.length)} />
      <ProjectDialog state={project} onClose={() => setProject(null)} onStep={(d) => setProject((p) => {
        if (!p) return p;
        const k = p.order.indexOf(p.i);
        return { ...p, i: p.order[(k + d + p.order.length) % p.order.length] };
      })} />
      <QuoteDialog state={quote} onClose={() => setQuote(null)} />
    </Ctx.Provider>
  );
}

export function ServiceIcon({ name }: { name: IconName }) {
  return <Icon id={name} />;
}

function ServiceDialog({ index, onClose, onStep }: { index: number | null; onClose: () => void; onStep: (d: number) => void }) {
  const dlg = useDialog(index !== null, onClose);
  const { openQuote } = useUI();
  const s = SERVICES[index ?? 0];
  return (
    <dialog className="sheet" aria-labelledby="sv-title" {...dlg}>
      <div className="sheet-media">
        <Image key={s.img} id="sv-img" src={s.img} alt={s.alt} width={s.width} height={232} sizes="(min-width: 1024px) 520px, 100vw" />
        <button type="button" className="icon-btn x" aria-label="Fermer" onClick={onClose}><Icon id="close" /></button>
      </div>
      <div className="sheet-body">
        <span className="tag">Service {(index ?? 0) + 1} / {SERVICES.length}</span>
        <h2 id="sv-title">{s.title}</h2>
        <p>{s.long}</p>
        <ul className="checks" key={index ?? 0}>
          {s.points.map((p, k) => <li key={p} style={{ '--i': k } as React.CSSProperties}><Icon id="check" />{p}</li>)}
        </ul>
        <div className="sheet-foot">
          <button type="button" className="btn btn-soft" aria-label="Service précédent" onClick={() => onStep(-1)}><Icon id="left" className="ic" /><span className="hide-sm">Précédent</span></button>
          <button type="button" className="btn btn-red" onClick={() => openQuote(s.title)}><span>Devis pour ce service</span><Icon id="arrow" className="arr" /></button>
        </div>
      </div>
    </dialog>
  );
}

function ProjectDialog({ state, onClose, onStep }: { state: { i: number; order: number[] } | null; onClose: () => void; onStep: (d: number) => void }) {
  const dlg = useDialog(state !== null, onClose);
  const p = PROJECTS[state?.i ?? 0];
  const pos = state ? state.order.indexOf(state.i) + 1 : 1;
  return (
    <dialog className="sheet sheet-wide" aria-labelledby="pj-title" {...dlg}
      onKeyDown={(e) => { if (e.key === 'ArrowRight') onStep(1); if (e.key === 'ArrowLeft') onStep(-1); }}>
      <div className="sheet-media">
        <Image key={p.img} src={p.img} alt={p.alt} width={p.width} height={218} sizes="(min-width: 1024px) 640px, 100vw" />
        <button type="button" className="icon-btn x" aria-label="Fermer" onClick={onClose}><Icon id="close" /></button>
      </div>
      <div className="sheet-body">
        <span className="tag">{CATEGORIES[p.cat]}</span>
        <h2 id="pj-title">{p.title}</h2>
        <p>{p.desc}</p>
        <div className="pj-nav">
          <span className="prj-l"><Icon id="pin" /><span>{p.loc}</span></span>
          <span className="pj-count">{pos} / {state?.order.length ?? PROJECTS.length}</span>
          <span className="grp">
            <button type="button" className="icon-btn" aria-label="Projet précédent" onClick={() => onStep(-1)}><Icon id="left" /></button>
            <button type="button" className="icon-btn" aria-label="Projet suivant" onClick={() => onStep(1)}><Icon id="right" /></button>
          </span>
        </div>
      </div>
    </dialog>
  );
}

const STEP_NAMES = ['Travaux', 'Projet', 'Coordonnées'];
const BIENS = ['Maison', 'Immeuble', 'Commercial'];
const DELAIS = ['Urgent', 'Sous 3 mois', 'Pas pressé'];
const EMPTY = { svc: '', surface: 120, bien: '', delai: '', name: '', contact: '', msg: '' };

function QuoteDialog({ state, onClose }: { state: { key: number; service?: string } | null; onClose: () => void }) {
  const dlg = useDialog(state !== null, onClose);
  return (
    <dialog className="sheet" aria-labelledby="q-title" {...dlg}>
      {/* a new key per open gives every request a fresh form */}
      <QuoteForm key={state?.key ?? 0} service={state?.service} onClose={onClose} />
    </dialog>
  );
}

function QuoteForm({ service, onClose }: { service?: string; onClose: () => void }) {
  // opening from a service card skips the first step
  const [step, setStep] = useState(service ? 1 : 0);
  const [f, setF] = useState({ ...EMPTY, svc: service ?? '' });
  const [bad, setBad] = useState<{ name: number; contact: number }>({ name: 0, contact: 0 });
  const nameRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);

  const set = useCallback(<K extends keyof typeof EMPTY>(k: K, v: (typeof EMPTY)[K]) => setF((x) => ({ ...x, [k]: v })), []);
  const sent = step === 3;

  const summary: [string, string][] = [
    ['Travaux', f.svc], ['Surface', f.surface + ' m²'],
    ['Bien', f.bien || 'Non précisé'], ['Délai', f.delai || 'Non précisé'],
  ];
  const mailHref = useMemo(() => {
    const body = [...summary, ['Nom', f.name.trim()], ['Contact', f.contact.trim()]]
      .map(([k, v]) => `${k} : ${v}`).join('\n') + (f.msg.trim() ? `\n\nMessage :\n${f.msg.trim()}` : '');
    return `mailto:${EMAIL}?subject=${encodeURIComponent('Demande de devis : ' + f.svc)}&body=${encodeURIComponent(body)}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [f]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 0 && !f.svc) return;
    if (step === 2) {
      const badName = f.name.trim().length < 2, badContact = f.contact.trim().length < 5;
      if (badName || badContact) {
        setBad((b) => ({ name: badName ? b.name + 1 : 0, contact: badContact ? b.contact + 1 : 0 }));
        (badName ? nameRef : contactRef).current?.focus();
        return;
      }
    }
    setStep((s) => s + 1);
  };

  return (
      <form className="sheet-body q" onSubmit={submit} noValidate>
        <div className="q-top">
          <h2 id="q-title">Demande de devis</h2>
          <button type="button" className="icon-btn" aria-label="Fermer" onClick={onClose}><Icon id="close" /></button>
        </div>
        <div className="prog" aria-hidden="true">
          <div className="prog-meta"><span>{sent ? 'Terminé' : `Étape ${step + 1} sur 3`}</span><span>{sent ? 'Prête' : STEP_NAMES[step]}</span></div>
          <div className="prog-bar"><span style={{ width: `${sent ? 100 : ((step + 1) / 3) * 100}%` }} /></div>
        </div>

        {step === 0 && (
          <fieldset className="q-step">
            <legend>Quel type de travaux ?</legend>
            <div className="opts">
              {SERVICES.map((s) => (
                <label className="opt" key={s.title}>
                  <input type="radio" name="svc" value={s.title} checked={f.svc === s.title} onChange={() => set('svc', s.title)} />
                  <span className="oi"><Icon id={s.icon} /></span>{s.title}
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {step === 1 && (
          <fieldset className="q-step">
            <legend>Votre projet</legend>
            <div className="field">
              <div className="range-row"><label htmlFor="q-surface">Surface approximative</label><output htmlFor="q-surface">{f.surface} m²</output></div>
              <input id="q-surface" type="range" min={10} max={600} step={10} value={f.surface} onChange={(e) => set('surface', +e.target.value)} />
            </div>
            <Pills label="Type de bien" name="bien" options={BIENS} value={f.bien} onChange={(v) => set('bien', v)} />
            <Pills label="Délai souhaité" name="delai" options={DELAIS} value={f.delai} onChange={(v) => set('delai', v)} />
          </fieldset>
        )}

        {step === 2 && (
          <fieldset className="q-step">
            <legend>Vos coordonnées</legend>
            <div className="field">
              <label htmlFor="q-name">Nom</label>
              <input ref={nameRef} key={'n' + bad.name} className={bad.name ? 'bad' : undefined} id="q-name" type="text" autoComplete="name" placeholder="Prénom Nom" value={f.name} onChange={(e) => set('name', e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="q-contact">Téléphone ou e-mail</label>
              <input ref={contactRef} key={'c' + bad.contact} className={bad.contact ? 'bad' : undefined} id="q-contact" type="text" autoComplete="email" placeholder="Pour vous recontacter" value={f.contact} onChange={(e) => set('contact', e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="q-msg">Message <span className="opt-l">(facultatif)</span></label>
              <textarea id="q-msg" rows={3} placeholder="Décrivez votre toiture, l'accès, les problèmes constatés…" value={f.msg} onChange={(e) => set('msg', e.target.value)} />
            </div>
          </fieldset>
        )}

        {sent && (
          <div className="q-done">
            <div className="done-ic"><Icon id="check" /></div>
            <h3>Merci{f.name.trim() ? ', ' + f.name.trim().split(' ')[0] : ''} !</h3>
            <p>Votre demande est prête. Envoyez-la par e-mail en un clic, elle arrivera directement chez ADP Toiture.</p>
            <dl className="summary">
              {summary.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
            </dl>
          </div>
        )}

        <div className="sheet-foot">
          {step > 0 && !sent && <button type="button" className="btn btn-soft" onClick={() => setStep((s) => s - 1)}>Retour</button>}
          {!sent && (
            <button type="submit" className="btn btn-red" disabled={step === 0 && !f.svc}>
              <span>{step === 2 ? 'Préparer la demande' : 'Continuer'}</span><Icon id="arrow" className="arr" />
            </button>
          )}
          {sent && <a className="btn btn-red" href={mailHref}><Icon id="mail" className="ic" /><span>Envoyer par e-mail</span></a>}
        </div>
      </form>
  );
}

function Pills({ label, name, options, value, onChange }: { label: string; name: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="field">
      <span className="lbl" id={`lbl-${name}`}>{label}</span>
      <div className="pills" role="radiogroup" aria-labelledby={`lbl-${name}`}>
        {options.map((o) => (
          <label className="pill" key={o}>
            <input type="radio" name={name} value={o} checked={value === o} onChange={() => onChange(o)} />{o}
          </label>
        ))}
      </div>
    </div>
  );
}
