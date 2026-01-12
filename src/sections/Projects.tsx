import Container from '../components/Container';
import { projects } from '../data/projects';

export default function Projects() {
  const featured = projects.find((project) => project.id === 'one-of-us') ?? null;
  const rest = projects.filter((project) => project.id !== 'one-of-us');

  return (
    <Container>
      <section className="pixel-panel">
        <h2 className="section-title">Projects</h2>
        {featured && (
          <article className="card project-featured pixel-border">
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
                <div className="chips">
                  {featured.skills.map((skill) => (
                    <span key={skill} className="chip">{skill}</span>
                  ))}
                </div>
                {featured.github && (
                  <p>
                    <a className="link" href={featured.github} target="_blank" rel="noreferrer">
                      View on GitHub
                    </a>
                  </p>
                )}
              </div>
            </div>
          </article>
        )}

        <div className="cards cards-vertical">
          {rest.map((project) => (
            <article key={project.id} className="card pixel-border">
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
                <div className="chips">
                  {project.skills.map((skill) => (
                    <span key={skill} className="chip">{skill}</span>
                  ))}
                </div>
                {project.github && (
                  <p>
                    <a className="link" href={project.github} target="_blank" rel="noreferrer">
                      View on GitHub
                    </a>
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </Container>
  );
}
