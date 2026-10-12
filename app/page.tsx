import { IconSprite } from '@/components/Icons';
import { Header } from '@/components/Header';
import { About, Footer, Hero, Partners } from '@/components/Sections';
import { Dock, Projects, Reviews, Services } from '@/components/Interactive';
import { SiteEffects } from '@/components/SiteEffects';
import { SiteUI } from '@/components/SiteUI';

export default function Home() {
  return (
    <SiteUI>
      <IconSprite />
      <a className="skip" href="#main">Aller au contenu</a>
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <About />
        <Projects />
        <Reviews />
        <Partners />
      </main>
      <Footer />
      <Dock />
      <SiteEffects />
    </SiteUI>
  );
}
