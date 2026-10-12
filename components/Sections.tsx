import Image from 'next/image';
import { Icon } from './Icons';
import { QuoteButton } from './QuoteButton';
import { ADDRESS, EMAIL, MAPS_HREF, NAV, PARTNERS, PHONE, PHONE_HREF } from '@/lib/data';

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <Image className="hero-img" src="/img/hero.jpg" width={2048} height={624} preload sizes="(min-width: 1024px) 100vw, 200vw"
        alt="Ferblantier découpant une tôle sur un toit, avec vue sur le lac Léman et le jet d'eau" />
      <div className="frame hero-in">
        <p className="eyebrow t h-a1">À Genève et ses alentours</p>
        <h1 className="t" id="hero-title">
          <span className="h-a2">ADP Toiture SA</span> <span className="h-a3">pour vos travaux</span>{' '}
          <span className="h-a4">de <em>toiture.</em></span>
        </h1>
        <p className="lede t fb h-a5">
          Ferblanterie, couverture et étanchéité.<br className="d-br" /> Un savoir-faire au service des particuliers<br className="d-br" /> et des professionnels.
        </p>
        <div className="hero-cta h-a6">
          <QuoteButton className="btn btn-red btn-hero" />
          <a className="btn btn-ghost" href="#services">Nos services</a>
        </div>
        <ul className="trust m-only h-a6" aria-label="En bref">
          {['Particuliers & professionnels', 'Atelier de fabrication', 'Genève & alentours'].map((t) => (
            <li key={t}><Icon id="check" />{t}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section className="about" id="apropos" aria-labelledby="about-title">
      <Image className="about-img" src="/img/team.jpg" width={2048} height={480} sizes="(min-width: 1024px) 100vw, 160vw"
        alt="L'équipe ADP Toiture devant l'atelier et les véhicules de l'entreprise" />
      <div className="frame about-in rv">
        <p className="eyebrow t">Notre entreprise</p>
        <h2 className="t" id="about-title">Une équipe à taille humaine,<br className="d-br" /> un savoir-faire reconnu.</h2>
        <p className="about-p t fb">
          Basés aux Acacias, aux Vives, à Genève, nous mettons notre<br className="d-br" /> expérience et notre savoir-faire au service de vos projets<br className="d-br" /> de
          toiture. Notre équipe de 7 à 8 collaborateurs intervient<br className="d-br" /> pour les particuliers, les entreprises et en collaboration<br className="d-br" /> avec
          les plus grands acteurs du secteur.
        </p>
        <ul className="facts m-only">
          <li><b>7–8</b><span>collaborateurs</span></li>
          <li><b>4</b><span>métiers du toit</span></li>
          <li><b>1</b><span>atelier de fabrication</span></li>
        </ul>
        <a className="btn btn-line-dark" href="#contact"><span>En savoir plus</span><Icon id="arrow" className="arr" /></a>
      </div>
    </section>
  );
}

export function Partners() {
  const items = [...PARTNERS.map((p) => ({ ...p, clone: false })), ...PARTNERS.map((p) => ({ ...p, clone: true }))];
  return (
    <section className="partners" aria-labelledby="pt-title">
      <div className="frame"><p className="eyebrow t" id="pt-title">Ils nous font confiance</p></div>
      <div className="pt-view">
        {/* second copy keeps the phone marquee seamless; hidden on desktop */}
        <ul className="pt-track frame" role="list">
          {items.map((p, i) => (
            <li key={i} className={`pt pt-${(i % PARTNERS.length) + 1}${p.clone ? ' pt-clone' : ''}`} aria-hidden={p.clone || undefined}>
              <Image src={p.src} width={p.w} height={p.h} alt={p.clone ? '' : p.alt} sizes="220px" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="ftr" id="contact">
      <div className="frame ftr-in">
        <a className="logo ftr-logo" href="#top" aria-label="ADP Toiture SA, retour en haut">
          <Image src="/img/logo-footer.png" width={150} height={120} alt="" sizes="106px" />
        </a>
        <nav className="ftr-nav" aria-label="Pied de page">
          {NAV.map((n) => <a key={n.id} href={`#${n.id}`}>{n.label}</a>)}
        </nav>
        <ul className="ftr-contact" role="list">
          <li><a href={PHONE_HREF}><Icon id="phone" />{PHONE}</a></li>
          <li><a href={`mailto:${EMAIL}`}><Icon id="mail" />{EMAIL}</a></li>
          <li><a href={MAPS_HREF} target="_blank" rel="noopener"><Icon id="pin" />{ADDRESS}</a></li>
        </ul>
        <QuoteButton className="btn btn-red ftr-cta" />
      </div>
      <div className="ftr-legal">
        <div className="frame ftr-legal-in">
          <span className="copy t fb">© 2024 ADP Toiture SA. Tous droits réservés.</span>
          <nav className="t fb" aria-label="Informations légales">
            <a href="#contact">Mentions légales</a><span aria-hidden="true">|</span><a href="#contact">Politique de confidentialité</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
