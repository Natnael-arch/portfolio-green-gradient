import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { CertificatesSection } from "@/components/certificates-section";
import { Footer } from "@/components/footer";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <ProjectsSection />
      <CertificatesSection />
      <Footer />
    </div>
  );
}
