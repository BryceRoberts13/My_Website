export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  link?: string;
  repo?: string;
  image?: string;
}

export const projects: Project[] = [
  {
    id: "sample-project",
    title: "Sample Project",
    description: "A sample project demonstrating the projects data structure.",
    longDescription:
      "This is a placeholder project to showcase how the Project interface and projects array work. Replace with real project data.",
    tags: ["TypeScript", "Astro", "Web"],
    link: "https://example.com",
    repo: "https://github.com/example/sample-project",
    image: "/images/sample-project.png",
  },
];
