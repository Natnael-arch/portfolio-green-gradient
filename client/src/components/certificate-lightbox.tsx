import { motion, AnimatePresence } from "framer-motion";
import { X, Award, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Certificate } from "@shared/schema";

interface CertificateLightboxProps {
  certificate: Certificate | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CertificateLightbox({ certificate, isOpen, onClose }: CertificateLightboxProps) {
  if (!certificate) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-w-3xl w-full glass-card rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-4 right-4 z-10 rounded-full"
              onClick={onClose}
              aria-label="Close lightbox"
              data-testid="button-close-lightbox"
            >
              <X className="w-5 h-5" />
            </Button>

            {certificate.imageUrl ? (
              <div className="relative">
                <img
                  src={certificate.imageUrl}
                  alt={certificate.name}
                  className="w-full max-h-[70vh] object-contain bg-[#0B2B26]"
                  data-testid="img-certificate"
                />
              </div>
            ) : (
              <div className="h-64 bg-gradient-to-br from-[#235347] to-[#0B2B26] flex items-center justify-center">
                <div className="text-center">
                  <Award className="w-16 h-16 text-[#8EB69B]/40 mx-auto mb-4" />
                  <p className="text-muted-foreground">No image available</p>
                </div>
              </div>
            )}

            <div className="p-6">
              <h3 
                className="text-2xl font-bold text-[#DAF1DE] mb-2"
                data-testid="text-certificate-name"
              >
                {certificate.name}
              </h3>
              <p 
                className="text-[#8EB69B] mb-1"
                data-testid="text-certificate-org"
              >
                {certificate.issuingOrganization}
              </p>
              <p 
                className="text-muted-foreground text-sm mb-4"
                data-testid="text-certificate-date"
              >
                {certificate.issueDate}
              </p>

              {certificate.link && (
                <a
                  href={certificate.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-verify-certificate"
                >
                  <Button variant="secondary" size="sm" className="gap-2">
                    Verify Certificate
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
