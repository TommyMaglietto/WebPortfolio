import { useState } from 'react';
import Container from '../components/Container';
import ProjectOverlay from '../components/ProjectOverlay';

type Project = {
  id: string;
  title: string;
  blurb: string;
  details: string;
  skills: string[];
  github?: string;
  screenshot?: string; // path in public/
};

const projects: Project[] = [
  {
    id: 'one-of-us',
    title: 'One Of Us',
    blurb: 'Fast-paced multiplayer horror in the woods—repair, find keys, and escape while a Skinwalker hides among you.',
    details:
      'Players must repair generators, find keys, and work together to escape—all while a terrifying Skinwalker lurks among them, disguised as one of their own. Paranoia spreads as trust crumbles: anyone could be the monster. Armed with flashlights and the occasional shotgun, survivors can expose or fight back—but hesitation means death.\n\n "Trust no one. Not even your closest friend."',
    skills: ['Roblox Studio', 'Lua', 'Multiplayer', 'Game Design', 'Horror', 'Networking'],
    screenshot: '/One-Of-Us.png',
  },
  {
    id: 'hunger-health',
    title: 'Hunger and Health iOS App',
    blurb: 'Team-built iOS app addressing food insecurity and health resources.',
    details:
      'Contributed to UI flows and data handling; focused on resource discovery and accessibility features.',
    skills: ['SwiftUI', 'iOS', 'Teamwork'],
    screenshot: '/HHC.jpg',
  },
  {
    id: 'y86-64',
    title: 'Y86-64 Simulator',
    blurb: 'Instruction set architecture simulator built for coursework.',
    details:
      'Implemented instruction decoding, pipeline stages, and a basic debugger; wrote unit tests for correctness.',
    skills: ['C', 'Computer Architecture', 'Testing'],
    screenshot: '/Y86.png'
  },
  {
    id: 'haskell-blackjack',
    title: 'BlackJack in Haskell',
    blurb: 'Terminal-based, fully functional BlackJack game.',
    details:
      'Purely functional design with monadic IO; modularized deck and hand evaluation logic.',
    skills: ['Haskell', 'Functional Programming'],
    screenshot: '/Haskel.png',
  },
  {
    id: 'blender-3d',
    title: '3D Blender Models',
    blurb: 'Selection of hobbyist 3D models created in Blender.',
    details:
      'Practiced modeling, texturing, and lighting; exported renders for portfolio presentation.',
    skills: ['Blender', '3D Modeling', 'Design'],
    screenshot: '/Blender.png',
  },
];

export default function Projects() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [open, setOpen] = useState<Project | null>(null);
  const featured = projects.find((p) => p.id === 'one-of-us') || null;
  const rest = projects.filter((p) => p.id !== 'one-of-us');

  return (
    <Container>
      <section className="pixel-panel">
        <h2 className="section-title">Projects</h2>
        {/* Featured horizontal card */}
        {featured && (
          <article
            className={'card project-featured pixel-border ' + (expanded === featured.id ? 'expanded' : '')}
            onClick={() => {
              setExpanded(expanded === featured.id ? null : featured.id);
              setOpen(featured);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setExpanded(expanded === featured.id ? null : featured.id);
                setOpen(featured);
              }
            }}
            role="button"
            tabIndex={0}
            aria-expanded={expanded === featured.id}
          >
            <div className="featured-thumb" aria-hidden={featured.screenshot ? undefined : true}>
              {featured.screenshot ? (
                <img src={featured.screenshot} alt={`${featured.title} screenshot`} />
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
                  {featured.skills.map((s) => (
                    <span key={s} className="chip">{s}</span>
                  ))}
                </div>
                {featured.github && (
                  <p>
                  <a className="link" href={featured.github} target="_blank" rel="noreferrer">GitHub →</a>
                  </p>
                )}
              </div>
            </div>
          </article>
        )}

        {/* Remaining projects stacked vertically */}
        <div className="cards cards-vertical">
          {rest.map((p) => (
            <article
              key={p.id}
              className={'card pixel-border ' + (expanded === p.id ? 'expanded' : '')}
              onClick={() => {
                setExpanded(expanded === p.id ? null : p.id);
                setOpen(p);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setExpanded(expanded === p.id ? null : p.id);
                  setOpen(p);
                }
              }}
              role="button"
              tabIndex={0}
              aria-expanded={expanded === p.id}
            >
              <div className="card-header">
                <div className="card-thumb" aria-hidden={p.screenshot ? undefined : true}>
                  {p.screenshot ? (
                    <img src={p.screenshot} alt={`${p.title} screenshot`} />
                  ) : (
                    <div className="pixel-thumb" />
                  )}
                </div>
                <div>
                  <h3 className="card-title">{p.title}</h3>
                  <p className="card-blurb">{p.blurb}</p>
                </div>
              </div>
              <div className="card-details">
                <p>{p.details}</p>
                <div className="chips">
                  {p.skills.map((s) => (
                    <span key={s} className="chip">{s}</span>
                  ))}
                </div>
                {p.github && (
                  <p>
                  <a className="link" href={p.github} target="_blank" rel="noreferrer">GitHub →</a>
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
        {open && (
          <ProjectOverlay project={open} onClose={() => setOpen(null)} />
        )}
      </section>
    </Container>
  );
}
