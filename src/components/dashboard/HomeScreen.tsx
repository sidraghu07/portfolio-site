import { NavBar } from "./NavBar";
import { Hero } from "./Hero";
import { HubRow } from "./HubRow";
import { AboutSection } from "./AboutSection";
import { ProjectsSection } from "./ProjectsSection";
import { ContactSection } from "./ContactSection";
import { Footer } from "./Footer";
import { SiteBackground } from "./SiteBackground";

export function HomeScreen() {
  return (
    <main className="min-h-screen">
      <SiteBackground />
      <NavBar />
      <Hero />
      <HubRow />
      <div className="divide-y divide-line border-t border-line">
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </div>
      <Footer />
    </main>
  );
}
