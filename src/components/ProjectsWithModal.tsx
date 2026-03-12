import { useState } from 'react';
import type { Project } from '../data/projects';
import { ProjectModal } from './ProjectModal';

interface ProjectsWithModalProps {
  projects: Project[];
}

export default function ProjectsWithModal({ projects }: ProjectsWithModalProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <div className="projects-grid">
        {projects.map((project) => (
          <article
            key={project.id}
            className="card"
            onClick={() => setSelectedProject(project)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedProject(project);
              }
            }}
          >
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tags">
              {project.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
