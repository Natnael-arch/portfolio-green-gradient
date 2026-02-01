import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Award, ExternalLink, Calendar, Building } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { Certificate } from "@shared/schema";

export function CertificatesSection() {
  const { data: certificates, isLoading } = useQuery<Certificate[]>({
    queryKey: ["/api/certificates"],
  });

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
        ) : certificates && certificates.length > 0 ? (
          <div className="space-y-4">
            {certificates.map((cert, index) => (
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
                    <Award className="w-6 h-6 md:w-7 md:h-7 text-[#8EB69B]" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg md:text-xl font-semibold text-[#DAF1DE] group-hover:text-[#8EB69B] transition-colors truncate">
                      {cert.name}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Building className="w-4 h-4 text-[#8EB69B]/70" />
                        {cert.issuingOrganization}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-[#8EB69B]/70" />
                        {cert.issueDate}
                      </span>
                    </div>
                  </div>
                  
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#8EB69B]/10 text-[#8EB69B] text-sm font-medium hover:bg-[#8EB69B]/20 transition-colors"
                      data-testid={`link-certificate-${cert.id}`}
                    >
                      View
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
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
    </section>
  );
}
