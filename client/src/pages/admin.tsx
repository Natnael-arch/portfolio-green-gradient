import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "wouter";
import { z } from "zod";
import {
  FolderOpen,
  Award,
  Plus,
  Trash2,
  ArrowLeft,
  Lock,
  Eye,
  EyeOff,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Project, Certificate } from "@shared/schema";

const loginSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  hackathonName: z.string().optional(),
  hackathonPlacement: z.string().optional(),
  githubLink: z.string().url().optional().or(z.literal("")),
  techStack: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal("")),
});

const certificateSchema = z.object({
  name: z.string().min(1, "Certificate name is required"),
  issuingOrganization: z.string().min(1, "Organization is required"),
  issueDate: z.string().min(1, "Date is required"),
  link: z.string().url().optional().or(z.literal("")),
});

type LoginFormData = z.infer<typeof loginSchema>;
type ProjectFormData = z.infer<typeof projectSchema>;
type CertificateFormData = z.infer<typeof certificateSchema>;

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { password: "" },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await apiRequest("POST", "/api/admin/login", data);
      return response;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Logged in successfully!",
      });
      onSuccess();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Invalid password",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md glass-card border-[#235347]/30">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#8EB69B]/10 flex items-center justify-center">
              <Lock className="w-8 h-8 text-[#8EB69B]" />
            </div>
            <CardTitle className="text-2xl text-gradient">Admin Access</CardTitle>
            <p className="text-muted-foreground mt-2">
              Enter your password to access the admin panel
            </p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((data) => loginMutation.mutate(data))}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter admin password"
                            className="bg-[#0B2B26]/50 border-[#235347]/50 pr-10"
                            data-testid="input-password"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
                            onClick={() => setShowPassword(!showPassword)}
                            data-testid="button-toggle-password"
                          >
                            {showPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loginMutation.isPending}
                  data-testid="button-login"
                >
                  {loginMutation.isPending ? "Logging in..." : "Login"}
                </Button>
              </form>
            </Form>
            <div className="mt-6 text-center">
              <Link href="/">
                <Button variant="ghost" className="gap-2 text-muted-foreground">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Portfolio
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: projects } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const { data: certificates } = useQuery<Certificate[]>({
    queryKey: ["/api/certificates"],
  });

  const projectForm = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      hackathonName: "",
      hackathonPlacement: "",
      githubLink: "",
      techStack: "",
      imageUrl: "",
    },
  });

  const certificateForm = useForm<CertificateFormData>({
    resolver: zodResolver(certificateSchema),
    defaultValues: {
      name: "",
      issuingOrganization: "",
      issueDate: "",
      link: "",
    },
  });

  const createProjectMutation = useMutation({
    mutationFn: async (data: ProjectFormData) => {
      const payload = {
        name: data.name,
        hackathonName: data.hackathonName || null,
        hackathonPlacement: data.hackathonPlacement || null,
        githubLink: data.githubLink || null,
        techStack: data.techStack
          ? data.techStack.split(",").map((s) => s.trim())
          : [],
        imageUrl: data.imageUrl || null,
      };
      return apiRequest("POST", "/api/projects", payload);
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Project added!" });
      projectForm.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add project",
        variant: "destructive",
      });
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/projects/${id}`);
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Project deleted!" });
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    },
  });

  const createCertificateMutation = useMutation({
    mutationFn: async (data: CertificateFormData) => {
      const payload = {
        name: data.name,
        issuingOrganization: data.issuingOrganization,
        issueDate: data.issueDate,
        link: data.link || null,
      };
      return apiRequest("POST", "/api/certificates", payload);
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Certificate added!" });
      certificateForm.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/certificates"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add certificate",
        variant: "destructive",
      });
    },
  });

  const deleteCertificateMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/certificates/${id}`);
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Certificate deleted!" });
      queryClient.invalidateQueries({ queryKey: ["/api/certificates"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete certificate",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gradient">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your portfolio projects and certificates
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                View Portfolio
              </Button>
            </Link>
            <Button
              variant="secondary"
              className="gap-2"
              onClick={onLogout}
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <Card className="glass-card border-[#235347]/30">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#8EB69B]/10 flex items-center justify-center">
                  <FolderOpen className="w-5 h-5 text-[#8EB69B]" />
                </div>
                <div>
                  <CardTitle className="text-xl text-[#DAF1DE]">
                    Add Project
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {projects?.length || 0} projects total
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <Form {...projectForm}>
                  <form
                    onSubmit={projectForm.handleSubmit((data) =>
                      createProjectMutation.mutate(data)
                    )}
                    className="space-y-4"
                  >
                    <FormField
                      control={projectForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Name *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="DeFi Swap Protocol"
                              className="bg-[#0B2B26]/50 border-[#235347]/50"
                              data-testid="input-project-name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={projectForm.control}
                        name="hackathonName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Hackathon Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="ETHGlobal 2024"
                                className="bg-[#0B2B26]/50 border-[#235347]/50"
                                data-testid="input-hackathon-name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={projectForm.control}
                        name="hackathonPlacement"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Placement</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="1st Place"
                                className="bg-[#0B2B26]/50 border-[#235347]/50"
                                data-testid="input-hackathon-placement"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={projectForm.control}
                      name="githubLink"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GitHub Link</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://github.com/username/repo"
                              className="bg-[#0B2B26]/50 border-[#235347]/50"
                              data-testid="input-github-link"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={projectForm.control}
                      name="techStack"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tech Stack (comma separated)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Solidity, React, Ethers.js"
                              className="bg-[#0B2B26]/50 border-[#235347]/50"
                              data-testid="input-tech-stack"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={projectForm.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image URL</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://example.com/image.png"
                              className="bg-[#0B2B26]/50 border-[#235347]/50"
                              data-testid="input-image-url"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full gap-2"
                      disabled={createProjectMutation.isPending}
                      data-testid="button-add-project"
                    >
                      <Plus className="w-4 h-4" />
                      {createProjectMutation.isPending
                        ? "Adding..."
                        : "Add Project"}
                    </Button>
                  </form>
                </Form>

                {projects && projects.length > 0 && (
                  <div className="mt-6 space-y-3">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Existing Projects
                    </h4>
                    {projects.map((project) => (
                      <div
                        key={project.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-[#0B2B26]/30 border border-[#235347]/20"
                      >
                        <span className="text-sm text-[#DAF1DE] truncate flex-1">
                          {project.name}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive/90 flex-shrink-0"
                          onClick={() => deleteProjectMutation.mutate(project.id)}
                          disabled={deleteProjectMutation.isPending}
                          data-testid={`button-delete-project-${project.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card className="glass-card border-[#235347]/30">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#8EB69B]/10 flex items-center justify-center">
                  <Award className="w-5 h-5 text-[#8EB69B]" />
                </div>
                <div>
                  <CardTitle className="text-xl text-[#DAF1DE]">
                    Add Certificate
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {certificates?.length || 0} certificates total
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <Form {...certificateForm}>
                  <form
                    onSubmit={certificateForm.handleSubmit((data) =>
                      createCertificateMutation.mutate(data)
                    )}
                    className="space-y-4"
                  >
                    <FormField
                      control={certificateForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Certificate Name *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Blockchain Developer Certification"
                              className="bg-[#0B2B26]/50 border-[#235347]/50"
                              data-testid="input-certificate-name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={certificateForm.control}
                      name="issuingOrganization"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Issuing Organization *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ethereum Foundation"
                              className="bg-[#0B2B26]/50 border-[#235347]/50"
                              data-testid="input-issuing-org"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={certificateForm.control}
                      name="issueDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Issue Date *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="January 2024"
                              className="bg-[#0B2B26]/50 border-[#235347]/50"
                              data-testid="input-issue-date"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={certificateForm.control}
                      name="link"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Verification Link</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://verify.example.com/cert/123"
                              className="bg-[#0B2B26]/50 border-[#235347]/50"
                              data-testid="input-certificate-link"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full gap-2"
                      disabled={createCertificateMutation.isPending}
                      data-testid="button-add-certificate"
                    >
                      <Plus className="w-4 h-4" />
                      {createCertificateMutation.isPending
                        ? "Adding..."
                        : "Add Certificate"}
                    </Button>
                  </form>
                </Form>

                {certificates && certificates.length > 0 && (
                  <div className="mt-6 space-y-3">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Existing Certificates
                    </h4>
                    {certificates.map((cert) => (
                      <div
                        key={cert.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-[#0B2B26]/30 border border-[#235347]/20"
                      >
                        <span className="text-sm text-[#DAF1DE] truncate flex-1">
                          {cert.name}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive/90 flex-shrink-0"
                          onClick={() => deleteCertificateMutation.mutate(cert.id)}
                          disabled={deleteCertificateMutation.isPending}
                          data-testid={`button-delete-certificate-${cert.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <LoginForm onSuccess={() => setIsLoggedIn(true)} />;
  }

  return <AdminDashboard onLogout={() => setIsLoggedIn(false)} />;
}
