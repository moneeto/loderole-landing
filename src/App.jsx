import { Navbar } from './components/Navbar.jsx';
import { Hero } from './components/Hero.jsx';
import { Clients } from './components/Clients.jsx';
import { Solutions } from './components/Solutions.jsx';
import { Projects } from './components/Projects.jsx';
import { Planey } from './components/Planey.jsx';
import { About } from './components/About.jsx';
import { Faq } from './components/Faq.jsx';
import { Contact } from './components/Contact.jsx';
import { Footer } from './components/Footer.jsx';
import { WhatsAppButton } from './components/WhatsAppButton.jsx';
import { useI18n } from './i18n/I18nProvider.jsx';

export default function App() {
  const { t } = useI18n();

  return (
    <div id="top">
      <div id="scroll-sentinel" className="scroll-sentinel" aria-hidden="true" />
      <a className="skip-link" href="#home">
        {t('hero.wordmark')}
      </a>
      <Navbar />
      <main>
        <Hero />
        <Clients />
        <Solutions />
        <Projects />
        <Planey />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
