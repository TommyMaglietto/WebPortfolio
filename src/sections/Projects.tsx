import Container from '../components/Container';
import { projects } from '../data/projects';
import type { Project } from '../types/portfolio';

const renderProjectActions = (project: Project) => {
  if (!project.github && !project.live) {
    return null;
  }

  return (
    <div className="project-actions">
      {project.live && (
        <a
          className="project-action"
          href={project.live}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${project.title} live site`}
        >
          <span className="project-action-text">LIVE</span>
        </a>
      )}
      {project.github && (
        <a
          className="project-action"
          href={project.github}
          target="_blank"
          rel="noreferrer"
          aria-label={`View ${project.title} on GitHub`}
        >
          <img src="/Git.png" alt="" aria-hidden="true" />
        </a>
      )}
    </div>
  );
};

export default function Projects() {
  const featured = projects.find((project) => project.id === 'one-of-us') ?? null;
  const rest = projects.filter((project) => project.id !== 'one-of-us');

  return (
    <Container>
      <section className="pixel-panel">
        <h2 className="section-title">Projects</h2>
        {featured && (
          <article className="card project-card project-featured pixel-border">
            <div className="featured-thumb" aria-hidden={featured.screenshot ? undefined : true}>
              {featured.screenshot ? (
                <img
                  src={featured.screenshot}
                  alt={`${featured.title} screenshot`}
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="pixel-thumb" />
              )}
            </div>
            <div className="featured-body">
              <h3 className="card-title">{featured.title}</h3>
              <p className="card-blurb">{featured.blurb}</p>
              <div className="card-details">
                <p>{featured.details}</p>
                <div className="project-footer">
                  <div className="chips">
                    {featured.skills.map((skill) => (
                      <span key={skill} className="chip">{skill}</span>
                    ))}
                  </div>
                  {renderProjectActions(featured)}
                </div>
              </div>
            </div>
          </article>
        )}

        <div className="cards cards-vertical">
          {rest.map((project) => (
            <article key={project.id} className="card project-card pixel-border">
              <div className="card-header">
                <div className="card-thumb" aria-hidden={project.screenshot ? undefined : true}>
                  {project.screenshot ? (
                    <img
                      src={project.screenshot}
                      alt={`${project.title} screenshot`}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="pixel-thumb" />
                  )}
                </div>
                <div>
                  <h3 className="card-title">{project.title}</h3>
                  <p className="card-blurb">{project.blurb}</p>
                </div>
              </div>
              <div className="card-details">
                <p>{project.details}</p>
                <div className="project-footer">
                  <div className="chips">
                    {project.skills.map((skill) => (
                      <span key={skill} className="chip">{skill}</span>
                    ))}
                  </div>
                  {renderProjectActions(project)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Container>
  );
}
