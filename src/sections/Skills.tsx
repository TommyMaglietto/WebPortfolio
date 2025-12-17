import Container from '../components/Container';

type SkillGroup = {
  title: string;
  items: { name: string; level: number }[];
};

const skillGroups: SkillGroup[] = [
  {
    title: 'Soft Skills',
    items: [
      { name: 'Case Management', level: 85 },
      { name: 'Mediation', level: 85 },
      { name: 'Problem-Solving', level: 76 },
      { name: 'Quick Learning', level: 75},
      { name: 'Relationship Building', level: 85 },
      { name: 'Sales Techniques', level: 72 },
      { name: 'Team Player', level: 85 },
    ],
  },
  {
    title: 'Languages',
    items: [
      { name: 'JavaScript/CSS/HTML', level: 55 },
      { name: 'C/C#/C++', level: 60 },
      { name: 'Haskell', level: 38},
      { name: 'Java', level: 72 },
      { name: 'Lua', level: 85 },
      { name: 'SQL', level: 40 },
      { name: 'Swift', level: 45 },
    ],
  },
  {
    title: 'Technical',
    items: [
      { name: '3D Animation', level: 50 },
      { name: '3D Modeling', level: 68 },
      { name: '3D Texturing', level: 48 },
      { name: 'Algorithms', level: 82 },
      { name: 'Data Structures', level: 70 },
      { name: 'Prompt Engineering', level: 76 },
      { name: 'Game Design', level: 60 },
    ],
  },
  {
    title: 'Tools',
    items: [
      { name: 'Blender', level: 65 },
      { name: 'Git', level: 70 },
      { name: 'GitHub', level: 84 },
      { name: 'MySQL', level: 40 },
      { name: 'Roblox Studio', level: 90 },
      { name: 'VS Code', level: 85 },
      { name: 'Xcode', level: 50 },
    ],
  },
];

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
