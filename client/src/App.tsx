import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Portfolio from "@/pages/portfolio";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  sepolia,
} from 'wagmi/chains';

const config = getDefaultConfig({
  appName: 'Web3 Portfolio',
  projectId: 'YOUR_PROJECT_ID', // Placeholder, user should replace with their own from Cloud.WalletConnect
  chains: [mainnet, sepolia],
  ssr: true,
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={Portfolio} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme({
          accentColor: '#8EB69B',
          accentColorForeground: '#051F20',
          borderRadius: 'large',
        })}>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
