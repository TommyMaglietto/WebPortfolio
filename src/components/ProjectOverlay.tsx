import { useEffect, useRef } from 'react';

export type Project = {
  id: string;
  title: string;
  blurb?: string;
  details?: string;
  skills?: string[];
  screenshot?: string;
  images?: string[];
  sections?: { title: string; content: string }[];
  github?: string;
};

interface ProjectOverlayProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectOverlay({ project, onClose }: ProjectOverlayProps) {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // basic focus and escape handling
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <section
        className="overlay-panel pixel-border"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`proj-title-${project.id}`}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="overlay-header">
          <h2 id={`proj-title-${project.id}`} className="section-title">{project.title}</h2>
          <button ref={closeBtnRef} className="overlay-close nav-tab pixel-border" onClick={onClose} aria-label="Close">✕</button>
        </header>
        {project.blurb && <p className="muted">{project.blurb}</p>}
        {project.details && <p>{project.details}</p>}

        {project.skills && project.skills.length > 0 && (
          <div className="chips" aria-label="Skills used">
            {project.skills.map((s) => (
              <span key={s} className="chip">{s}</span>
            ))}
          </div>
        )}

        {project.sections && project.sections.length > 0 && (
          <div className="overlay-sections">
            {project.sections.map((sec, i) => (
              <section key={i} className="overlay-subsection">
                <h3 className="stat-title">{sec.title}</h3>
                <p>{sec.content}</p>
              </section>
            ))}
          </div>
        )}

        {(project.images?.length || project.screenshot) && (
          <div className="overlay-images">
            {project.screenshot && (
              <img src={project.screenshot} alt={`${project.title} screenshot`} />
            )}
            {project.images?.map((src, i) => (
              <img key={i} src={src} alt={`${project.title} image ${i + 1}`} />
            ))}
          </div>
        )}

        {project.github && (
          <p style={{ marginTop: '0.6rem' }}>
            <a className="link" href={project.github} target="_blank" rel="noreferrer">View on GitHub ↗</a>
          </p>
        )}
      </section>
    </div>
  );
}
