import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-[#235347]/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-gradient mb-2">PORTFOLIO</h3>
            <p className="text-muted-foreground text-sm">
              Building the decentralized future.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-[#8EB69B] hover:border-[#8EB69B]/30 transition-colors"
                data-testid={`link-social-${link.label.toLowerCase()}`}
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-8 pt-8 border-t border-[#235347]/20 text-center"
        >
          <p className="text-muted-foreground/60 text-sm">
            {currentYear} Web3 Developer Portfolio. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
