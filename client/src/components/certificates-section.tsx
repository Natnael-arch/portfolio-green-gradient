import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Award, ExternalLink, Calendar, Building, Image } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { CertificateLightbox } from "./certificate-lightbox";
import type { Certificate } from "@shared/schema.ts";

export function CertificatesSection() {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  const { data: certificates, isLoading } = useQuery<Certificate[]>({
    queryKey: ["/api/certificates"],
  });

  const sortedCertificates = certificates ? [...certificates].sort((a, b) => {
    const parseDate = (dateStr: string) => {
      const months: Record<string, number> = {
        jan: 0, feb: 1, mar: 2, match: 2, apr: 3, may: 4, jun: 5,
        jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
      };
      const [m, y] = dateStr.toLowerCase().split(" ");
      return new Date(parseInt(y), months[m] ?? 0).getTime();
    };
    return parseDate(b.issueDate) - parseDate(a.issueDate);
  }) : [];

  return (
    <section id="certificates" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-[#0B2B26]/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gradient mb-4">
            CERTIFICATES
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Verified credentials and professional certifications in blockchain technology.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="glass-card rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <Skeleton className="w-12 h-12 rounded-full bg-[#235347]/30" />
                  <div className="flex-1">
                    <Skeleton className="h-6 w-2/3 mb-2 bg-[#235347]/30" />
                    <Skeleton className="h-4 w-1/3 bg-[#235347]/30" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : sortedCertificates && sortedCertificates.length > 0 ? (
          <div className="space-y-4">
            {sortedCertificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="glass-card-hover rounded-xl p-5 md:p-6 group"
                data-testid={`card-certificate-${cert.id}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#8EB69B]/10 flex items-center justify-center group-hover:bg-[#8EB69B]/20 transition-colors">
                    {cert.imageUrl ? (
                      <Image className="w-6 h-6 md:w-7 md:h-7 text-[#8EB69B]" />
                    ) : (
                      <Award className="w-6 h-6 md:w-7 md:h-7 text-[#8EB69B]" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-lg md:text-xl font-semibold text-[#DAF1DE] group-hover:text-[#8EB69B] transition-colors truncate"
                      data-testid={`text-cert-name-${cert.id}`}
                    >
                      {cert.name}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-sm text-muted-foreground">
                      <span
                        className="flex items-center gap-1.5"
                        data-testid={`text-cert-org-${cert.id}`}
                      >
                        <Building className="w-4 h-4 text-[#8EB69B]/70" />
                        {cert.issuingOrganization}
                      </span>
                      <span
                        className="flex items-center gap-1.5"
                        data-testid={`text-cert-date-${cert.id}`}
                      >
                        <Calendar className="w-4 h-4 text-[#8EB69B]/70" />
                        {cert.issueDate}
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-shrink-0 gap-2"
                    onClick={() => setSelectedCertificate(cert)}
                    data-testid={`button-view-certificate-${cert.id}`}
                  >
                    View
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full glass-card flex items-center justify-center">
              <Award className="w-10 h-10 text-[#8EB69B]/40" />
            </div>
            <p className="text-muted-foreground text-lg">No certificates yet.</p>
            <p className="text-muted-foreground/60 text-sm mt-2">
              Certificates will appear here once added from the admin panel.
            </p>
          </motion.div>
        )}
      </div>

      <CertificateLightbox
        certificate={selectedCertificate}
        isOpen={!!selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </section>
  );
}
