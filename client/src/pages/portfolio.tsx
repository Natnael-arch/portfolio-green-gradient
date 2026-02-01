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
      <BackgroundMusic />
    </div>
  );
}
