import { motion } from "framer-motion";
import { Code2, Blocks, Trophy, Rocket } from "lucide-react";

export function AboutSection() {
  const stats = [
    { icon: Rocket, label: "dApps Deployed", value: "10+" },
    { icon: Code2, label: "Projects Built", value: "10+" },
    { icon: Blocks, label: "Protocols", value: "5+" },
  ];

  return (
    <section id="about" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gradient mb-4">
            ABOUT ME
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-card rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8EB69B] to-[#235347] flex items-center justify-center text-2xl font-bold text-[#051F20]">
                  NB
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#DAF1DE]">Natnael Beshane</h3>
                  <p className="text-[#8EB69B]">AI & Blockchain Developer</p>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">
                I am a developer focused on the intersection of AI and Blockchain.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-6">
                I specialize in building intelligent decentralized systems and high-performance blockchain solutions.
                My work involves leveraging AI to enhance smart contract security, optimize DeFi protocols,
                and create smarter dApps that push the boundaries of Web3.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                My tech stack includes Mezo (Bitcoin), Solana, Movement, ICP Fusion, Zora, Celestia, and
                Ethereum Smart Contracts. I'm constantly exploring new protocols and integrating AI
                models into the decentralized ecosystem.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="glass-card-hover rounded-xl p-6 text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#8EB69B]/10 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-[#8EB69B]" />
                </div>
                <p className="text-3xl font-bold text-gradient mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
