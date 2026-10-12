export type IconName = 'home' | 'wave' | 'drop' | 'cube';
export type Category = 'couv' | 'etan' | 'ferb';

export const PHONE = '078 760 96 36';
export const PHONE_HREF = 'tel:+41787609636';
export const EMAIL = 'info@adp-toiture.ch';
export const ADDRESS = 'Chem. Frank-Thomas 24B, 1208 Genève';
export const MAPS_HREF = 'https://maps.google.com/?q=Chemin+Frank-Thomas+24B,+1208+Gen%C3%A8ve';

export const NAV = [
  { id: 'top', label: 'Accueil' },
  { id: 'services', label: 'Nos services' },
  { id: 'realisations', label: 'Nos réalisations' },
  { id: 'apropos', label: 'À propos' },
  { id: 'contact', label: 'Contact' },
] as const;

export type Service = {
  title: string;
  icon: IconName;
  img: string;
  width: number;
  alt: string;
  /** card copy, split where the mockup breaks the line on desktop */
  lines: [string, string];
  long: string;
  points: string[];
};

export const SERVICES: Service[] = [
  {
    title: 'Couverture', icon: 'home', img: '/img/svc-couverture.jpg', width: 442,
    alt: 'Toiture en tuiles avec fenêtre de toit',
    lines: ['Pose et rénovation', 'de toitures de tous types.'],
    long: 'Pose et rénovation de toitures de tous types : neuf, rénovation complète ou réparation ponctuelle, du relevé à la pose.',
    points: ['Tuiles, ardoises et couvertures métalliques', 'Rénovation complète ou partielle', 'Entretien et réparations'],
  },
  {
    title: 'Ferblanterie', icon: 'wave', img: '/img/svc-ferblanterie.jpg', width: 440,
    alt: 'Chéneau en zinc posé sous une toiture',
    lines: ['Travaux sur mesure en zinc,', 'cuivre et aluminium.'],
    long: 'Travaux sur mesure en zinc, cuivre et aluminium : chéneaux, descentes et raccords façonnés pour durer.',
    points: ['Chéneaux et descentes d’eau pluviale', 'Zinc, cuivre et aluminium', 'Bandeaux, rives et habillages'],
  },
  {
    title: 'Étanchéité', icon: 'drop', img: '/img/svc-etancheite.jpg', width: 444,
    alt: 'Pose d’une membrane d’étanchéité au chalumeau',
    lines: ['Solutions durables pour toitures', 'plates, terrasses et ouvrages.'],
    long: 'Solutions durables pour toitures plates, terrasses et ouvrages, posées dans les règles de l’art.',
    points: ['Toitures plates et terrasses', 'Membranes bitumineuses et synthétiques', 'Réfection et diagnostic'],
  },
  {
    title: 'Fabrication sur mesure', icon: 'cube', img: '/img/svc-fabrication.jpg', width: 438,
    alt: 'Plieuse et pièces de ferblanterie dans l’atelier',
    lines: ['Pièces et éléments de ferblanterie', 'réalisés dans notre atelier.'],
    long: 'Pièces et éléments de ferblanterie réalisés dans notre atelier, à vos cotes et selon les contraintes du chantier.',
    points: ['Pliage et façonnage en atelier', 'Pièces uniques ou en série', 'Adapté aux contraintes du chantier'],
  },
];

export const CATEGORIES: Record<Category, string> = { couv: 'Couverture', etan: 'Étanchéité', ferb: 'Ferblanterie' };

export type Project = { title: string; cat: Category; loc: string; img: string; width: number; alt: string; desc: string };

export const PROJECTS: Project[] = [
  { title: 'Entretien de toiture', cat: 'couv', loc: 'Genève', img: '/img/prj-entretien.jpg', width: 438,
    alt: 'Couvreur nettoyant une toiture en tuiles',
    desc: 'Nettoyage et entretien d’une couverture en tuiles pour prolonger sa durée de vie.' },
  { title: 'Étanchéité de terrasse', cat: 'etan', loc: 'Genève', img: '/img/prj-terrasse.jpg', width: 434,
    alt: 'Toiture-terrasse avec vue sur le lac et le jet d’eau',
    desc: 'Réfection de l’étanchéité d’une toiture-terrasse face au Léman.' },
  { title: 'Rénovation de couverture', cat: 'couv', loc: 'Genève', img: '/img/prj-renovation.jpg', width: 438,
    alt: 'Immeuble ancien avec toiture en ardoise rénovée',
    desc: 'Rénovation de la couverture d’un immeuble de caractère.' },
  { title: 'Habillage en cuivre', cat: 'ferb', loc: 'Genève', img: '/img/prj-cuivre.jpg', width: 438,
    alt: 'Toiture et façade habillées de cuivre',
    desc: 'Habillage de toiture et de façade en cuivre, façonné sur mesure.' },
];

export const REVIEWS = [
  { lines: ['Travail soigné et équipe professionnelle.', 'Notre toit est comme neuf !'], name: 'M. Dupont', role: 'Particulier, Genève' },
  { lines: ['Des conseils clairs et un résultat impeccable.', 'Je recommande sans hésiter.'], name: 'Mme Martin', role: 'Particulière, Genève' },
  { lines: ['Intervention rapide et efficace.', 'Une équipe sérieuse et à l’écoute.'], name: 'M. Rossi', role: 'Régie immobilière, Genève' },
];

export const PARTNERS = [
  { src: '/img/partner-implenia.png', w: 292, h: 104, alt: 'Implenia' },
  { src: '/img/partner-losinger.png', w: 222, h: 128, alt: 'Losinger Marazzi' },
  { src: '/img/partner-racines.png', w: 330, h: 110, alt: 'Racines Carrées, charpente et menuiserie' },
  { src: '/img/partner-degand.png', w: 304, h: 98, alt: 'De Gand Paysage' },
  { src: '/img/partner-metancheite.png', w: 200, h: 156, alt: 'M Étanchéité Sàrl' },
];
