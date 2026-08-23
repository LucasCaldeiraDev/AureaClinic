import Header from "./components/Header";
import Hero from "./components/Hero";
import Manifesto from "./components/Manifesto";
import Treatments from "./components/Treatments";
import Experience from "./components/Experience";
import Results from "./components/Results";
import Team from "./components/Team";
import Space from "./components/Space";
import Booking from "./components/Booking";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

export default function App() {
  return (
    <div id="page" className="bg-porcelain">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-porcelain"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Manifesto />
        <Treatments />
        <Experience />
        <Results />
        <Team />
        <Space />
        <Booking />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
