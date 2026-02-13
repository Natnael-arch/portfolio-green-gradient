import { motion } from "framer-motion";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { ConnectButton } from '@rainbow-me/rainbowkit';

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
        <div className="glass-card rounded-full px-6 py-3 flex items-center justify-between gap-4">
          <Link href="/">
            <motion.span
              className="text-xl font-bold text-gradient cursor-pointer uppercase tracking-wider"
              whileHover={{ scale: 1.02 }}
              data-testid="link-logo"
            >
              Natnael Beshane
            </motion.span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm text-muted-foreground hover:text-[#8EB69B] transition-colors cursor-pointer"
              data-testid="link-nav-projects"
            >
              Projects
            </button>
            <button
              onClick={() => document.getElementById('certificates')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm text-muted-foreground hover:text-[#8EB69B] transition-colors cursor-pointer"
              data-testid="link-nav-certificates"
            >
              Certificates
            </button>
            <button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm text-muted-foreground hover:text-[#8EB69B] transition-colors cursor-pointer"
              data-testid="link-nav-about"
            >
              About
            </button>
            <div className="ml-4">
              <ConnectButton
                label="Sign In"
                showBalance={false}
                chainStatus="icon"
                accountStatus="avatar"
              />
            </div>
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
