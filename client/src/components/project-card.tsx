import { motion } from "framer-motion";
import { ExternalLink, Github, Trophy, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
  index: number;
  size?: "large" | "medium" | "small";
}

export function ProjectCard({ project, index, size = "medium" }: ProjectCardProps) {
  const sizeClasses = {
    large: "col-span-2 row-span-2",
    medium: "col-span-1 row-span-1",
    small: "col-span-1 row-span-1",
  };

  const imageHeights = {
    large: "h-48 md:h-64",
    medium: "h-32 md:h-40",
    small: "h-24 md:h-32",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className={`${sizeClasses[size]} glass-card-hover rounded-xl overflow-hidden group`}
      data-testid={`card-project-${project.id}`}
    >
      <div className={`relative ${imageHeights[size]} overflow-hidden`}>
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#235347] to-[#0B2B26] flex items-center justify-center">
            <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-[#8EB69B]/10 flex items-center justify-center">
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-[#8EB69B]/20" />
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#051F20] via-transparent to-transparent" />

        {project.hackathonPlacement && (
          <div className="absolute top-3 right-3">
            <Badge className="gap-1 font-semibold">
              <Trophy className="w-3 h-3" />
              {project.hackathonPlacement}
            </Badge>
          </div>
        )}
      </div>

      <div className="p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-bold text-[#DAF1DE] mb-2 group-hover:text-[#8EB69B] transition-colors">
          {project.name}
        </h3>

        {project.hackathonName && (
          <p className="text-[#8EB69B] text-sm mb-3">{project.hackathonName}</p>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.slice(0, size === "large" ? 6 : 4).map((tech, i) => (
            <Badge
              key={i}
              variant="outline"
            >
              {tech}
            </Badge>
          ))}
          {project.techStack.length > (size === "large" ? 6 : 4) && (
            <Badge variant="outline">
              +{project.techStack.length - (size === "large" ? 6 : 4)}
            </Badge>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`link-live-${project.id}`}
            >
              <Button size="sm" className="gap-2">
                <Globe className="w-3 h-3" />
                View Live
              </Button>
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`link-github-${project.id}`}
            >
              <Button size="sm" variant="ghost" className="gap-2">
                <Github className="w-4 h-4" />
                GitHub
                <ExternalLink className="w-3 h-3" />
              </Button>
            </a>
          )}
          {project.contractAddress && (
            <div className="flex items-center gap-1 ml-auto">
              <Badge variant="secondary" className="bg-[#8EB69B]/10 text-[#8EB69B] border-[#8EB69B]/20 gap-1 px-2 py-0.5 pointer-events-none">
                <ExternalLink className="w-3 h-3" />
                Verified
              </Badge>
              {project.explorerLink && (
                <a
                  href={project.explorerLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-[#8EB69B] transition-colors"
                  aria-label="View on Block Explorer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
