import { useState, useMemo } from 'react';
import type { Project } from '../data/projects';
import { ProjectModal } from './ProjectModal';

interface ProjectsWithModalProps {
  projects: Project[];
}

export default function ProjectsWithModal({ projects }: ProjectsWithModalProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const uniqueTags = useMemo(
    () => [...new Set(projects.flatMap((p) => p.tags))].sort(),
    [projects]
  );

  const filteredProjects =
    selectedTag === 'All'
      ? projects
      : projects.filter((p) => p.tags.includes(selectedTag));

  return (
    <>
      <div className="project-filter">
        <button
          type="button"
          className={`project-filter-btn ${selectedTag === 'All' ? 'active' : ''}`}
          onClick={() => setSelectedTag('All')}
        >
          All
        </button>
        {uniqueTags.map((tag) => (
          <button
            key={tag}
            type="button"
            className={`project-filter-btn ${selectedTag === tag ? 'active' : ''}`}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="projects-grid">
        {filteredProjects.map((project) => (
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
