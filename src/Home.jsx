import Nav from './components/Nav';
import Menu from './components/Menu';
import Loader from './components/Loader';
import Footer from './components/Footer';
import GlobalStyles from './components/GlobalStyles';
import HeroSection from './components/HeroSection';
import ShowreelSection from './components/ShowreelSection';
import WorksSection from './components/WorksSection';
import StudioVideoSection from './components/StudioVideoSection';
import StudioInfoSection from './components/StudioInfoSection';
import GlitchSection from './components/GlitchSection';

/**
 * Home - Main landing page.
 * Composes all section components while preserving the exact DOM structure
 * that the GSAP animations in main.js depend on (page-wrapper > main-wrapper > page_view).
 */
export default function Home() {
  return (
    <>
      <GlobalStyles />
      <Nav />
      <Menu />
      <Loader />

      <div className="page-wrapper">
        <div data-taxi="" className="main-wrapper">
          <div data-taxi-view="" className="page_view">
            <HeroSection />
            <ShowreelSection />
            <WorksSection />
            <StudioVideoSection />
            <StudioInfoSection />
            <GlitchSection />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}