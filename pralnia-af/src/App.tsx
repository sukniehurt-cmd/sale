import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Services from './components/Services';
import Effects from './components/Effects';
import Pricing from './components/Pricing';
import Faq from './components/Faq';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CallButton from './components/CallButton';

export default function App() {
  return (
    <div className="font-sans antialiased text-slate-800 bg-white">
      <a
        href="#tresc"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:top-4 focus:left-4 focus:bg-white focus:text-brand-600 focus:px-5 focus:py-3 focus:rounded-full focus:font-semibold focus:shadow-lg">
        Przejdź do treści
      </a>

      <Header />

      <main id="tresc">
        <Hero />
        <About />
        <Testimonials />
        <Services />
        <Effects />
        <Pricing />
        <Faq />
        <Contact />
      </main>

      <Footer />
      <CallButton />
    </div>
  );
}
