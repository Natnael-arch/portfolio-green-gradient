import { motion } from "framer-motion";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";

export function Header() {
  const [location] = useLocation();
  const isAdmin = location === "/admin";

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="glass-card rounded-full px-6 py-3 flex items-center justify-between">
          <Link href="/">
            <motion.span
              className="text-xl font-bold text-gradient cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              PORTFOLIO
            </motion.span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/#projects">
              <span className="text-sm text-muted-foreground hover:text-[#8EB69B] transition-colors cursor-pointer">
                Projects
              </span>
            </Link>
            <Link href="/#certificates">
              <span className="text-sm text-muted-foreground hover:text-[#8EB69B] transition-colors cursor-pointer">
                Certificates
              </span>
            </Link>
            <Link href="/#about">
              <span className="text-sm text-muted-foreground hover:text-[#8EB69B] transition-colors cursor-pointer">
                About
              </span>
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {!isAdmin && (
              <Link href="/admin">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-[#8EB69B]"
                  data-testid="link-admin"
                >
                  Admin
                </Button>
              </Link>
            )}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-[#8EB69B] to-[#235347] rounded-full opacity-0 group-hover:opacity-70 blur-md transition-opacity duration-300" />
              <Button
                size="sm"
                className="relative gap-2 rounded-full bg-[#235347] hover:bg-[#163832] border border-[#8EB69B]/30 group-hover:border-[#8EB69B]/60 transition-all"
                data-testid="button-connect-wallet-header"
              >
                <Wallet className="w-4 h-4" />
                <span className="hidden sm:inline">Connect Wallet</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
