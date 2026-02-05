import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { ProjectCard } from "./project-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Project } from "@shared/schema.ts";

import staticProjects from "@/data/projects.json";

export function ProjectsSection() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
    initialData: staticProjects as Project[],
  });

  return (
    <section id="projects" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gradient mb-4">
            PROJECTS
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            A collection of blockchain applications, smart contracts, and decentralized solutions.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-card rounded-xl overflow-hidden">
                <Skeleton className="h-40 w-full bg-[#235347]/30" />
                <div className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2 bg-[#235347]/30" />
                  <Skeleton className="h-4 w-1/2 mb-4 bg-[#235347]/30" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16 bg-[#235347]/30" />
                    <Skeleton className="h-6 w-16 bg-[#235347]/30" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                size={index === 0 ? "large" : index < 3 ? "medium" : "small"}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full glass-card flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-[#8EB69B]/20" />
            </div>
            <p className="text-muted-foreground text-lg">No projects yet.</p>
            <p className="text-muted-foreground/60 text-sm mt-2">
              Projects will appear here once added from the admin panel.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
