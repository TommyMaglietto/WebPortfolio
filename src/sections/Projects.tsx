import Container from '../components/Container';
import { projects } from '../data/projects';
import { approvedGithubProjects } from '../data/githubCatalog';
import type { Project } from '../types/portfolio';

const toSingleSentence = (text: string) => {
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (!normalized) {
    return '';
  }
  const sentenceMatch = normalized.match(/^.*?[.!?](?=\s|$)/);
  return sentenceMatch ? sentenceMatch[0].trim() : normalized;
};

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

const renderProjectCard = (project: Project) => (
  <article
    key={project.id}
    className="card project-card project-grid-card pixel-border"
    data-project-id={project.id}
  >
    <header className="project-tab">
      <h4 className="project-tab-title">{project.title}</h4>
      <p className="project-tab-subtext">{toSingleSentence(project.blurb)}</p>
    </header>

    <div className="project-media" aria-hidden={project.screenshot ? undefined : true}>
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

    <div className="card-details">
      <p className="project-description">{project.details}</p>
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
);

export default function Projects() {
  const curatedGitHubUrls = new Set(
    projects
      .map((project) => project.github?.toLowerCase())
      .filter((url): url is string => Boolean(url)),
  );

  const approvedGitHubOnly = approvedGithubProjects.filter(
    (project) => !project.github || !curatedGitHubUrls.has(project.github.toLowerCase()),
  );

  const allProjects = [...projects, ...approvedGitHubOnly];
  const openSourceProjects = allProjects.filter((project) => project.source === 'open');
  const closedSourceProjects = allProjects.filter((project) => project.source === 'closed');

  return (
    <Container>
      <section className="pixel-panel">
        <h2 className="section-title">Projects</h2>
        <div className="projects-groups">
          <section className="project-group" aria-label="Open source projects">
            <h3 className="project-group-title">Open Source</h3>
            <div className="cards project-grid">
              {openSourceProjects.map(renderProjectCard)}
            </div>
          </section>

          {closedSourceProjects.length > 0 && (
            <section className="project-group" aria-label="Closed source projects">
              <h3 className="project-group-title">Closed Source</h3>
              <div className="cards project-grid">
                {closedSourceProjects.map(renderProjectCard)}
              </div>
            </section>
          )}
        </div>
      </section>
    </Container>
  );
}
