const skills = {
  Languages: [
    'C',
    'C#',
    'C++',
    'Haskell',
    'HTML',
    'Java',
    'Lua',
    'R',
    'SQL',
    'Swift',
  ],
  'Soft Skills': [
    'Case Management',
    'Mediation',
    'Problem-Solving',
    'Quick Learning',
    'Relationship Building',
    'Sales Techniques',
    'Team Player',
  ],
  Tools: [
    'Blender',
    'Git',
    'GitHub',
    'MySQL',
    'Roblox Studio',
    'VS Code',
    'Visual Studio',
    'Xcode',
  ],
  Methodologies: [
    'Agile',
    'Cntinuous Integration',
    'Design thinking',
    'Object-Oriented Design',
    'Pair Programming',
    'Test-Driven Development',
  ],
  Technical: [
    '3D Animation',
    '3D Modeling',
    '3D Texturing',
    'Algorithms',
    'Data Structures', 
    'Prompt Engineering',
  ],
  Frameworks: [
    'React',
    'SwiftUI',
    'Unity',
  ],
};

export default function Skills() {
  return (
    <section className="pixel-panel">
      <h2 className="section-title">Skills</h2>
      <div className="stats-grid">
        {Object.entries(skills).map(([group, items]) => (
          <div key={group} className="stat-card pixel-border">
            <h3 className="stat-title">{group}</h3>
            <ul className="stat-list">
              {items.map((s) => (
                <li key={s} className="stat-item">
                  <span className="stat-name">{s}</span>
                  <span className="stat-bar"><i /></span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
