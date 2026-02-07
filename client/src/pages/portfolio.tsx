import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { CertificatesSection } from "@/components/certificates-section";
import { AboutSection } from "@/components/about-section";
import { Footer } from "@/components/footer";
import { BackgroundMusic } from "@/components/background-music";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ProjectsSection />
      <CertificatesSection />
      <AboutSection />
      <Footer />
      <div className="fixed bottom-2 right-2 text-[8px] text-muted-foreground/20 pointer-events-none">
        Build: {new Date().toLocaleTimeString()}
      </div>
      <BackgroundMusic />
    </div>
  );
}
