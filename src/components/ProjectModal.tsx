import { useEffect } from 'react';
import type { Project } from '../data/projects';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="modal-title" className="modal-title">{project.title}</h2>
        <p className="modal-description">
          {project.longDescription ?? project.description}
        </p>
        <div className="modal-links">
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="modal-link">
              View
            </a>
          )}
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noopener noreferrer" className="modal-link">
              Repo
            </a>
          )}
        </div>
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
      </div>
    </div>
  );
}
