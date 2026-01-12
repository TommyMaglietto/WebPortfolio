import Container from '../components/Container';
import { skillGroups } from '../data/skills';

export default function Skills() {
  return (
    <Container>
      <section className="pixel-panel">
        <h2 className="section-title">Skills</h2>
        <div className="stats-grid">
          {skillGroups.map(({ title, items }) => (
            <div key={title} className="stat-card pixel-border">
              <h3 className="stat-title">{title}</h3>
              <ul className="stat-list">
                {[...items].sort((a, b) => b.level - a.level).map(({ name, level }) => (
                  <li key={name} className="stat-item">
                    <span className="stat-name">{name}</span>
                    <span className="stat-bar">
                      <span className="stat-bar-track" aria-hidden>
                        <i style={{ width: `${level}%` }} />
                      </span>
                      <span className="stat-level">{level}%</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
