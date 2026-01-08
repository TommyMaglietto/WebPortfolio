import { useEffect, useRef, useState } from 'react';
import Container from '../components/Container';

type QuestStatus = 'Completed' | 'Active';
interface Quest {
  id: string;
  title: string;
  guild: string;
  region: string;
  season: string;
  status: QuestStatus;
  objectives: string[];
  iconSrc: string;
}

const BIRTHDAY = { year: 2003, month: 4, day: 15 };

const getLevelAndXp = (today = new Date()) => {
  const birthdayThisYear = new Date(today.getFullYear(), BIRTHDAY.month - 1, BIRTHDAY.day);
  const hasHadBirthday = today >= birthdayThisYear;
  const level = today.getFullYear() - BIRTHDAY.year - (hasHadBirthday ? 0 : 1);
  const lastBirthday = hasHadBirthday
    ? birthdayThisYear
    : new Date(today.getFullYear() - 1, BIRTHDAY.month - 1, BIRTHDAY.day);
  const nextBirthday = hasHadBirthday
    ? new Date(today.getFullYear() + 1, BIRTHDAY.month - 1, BIRTHDAY.day)
    : birthdayThisYear;
  const elapsed = today.getTime() - lastBirthday.getTime();
  const total = nextBirthday.getTime() - lastBirthday.getTime();
  const xpPercent = Math.max(0, Math.min(100, Math.floor((elapsed / total) * 100)));
  return { level, xpPercent };
};

const STAT_CHIPS = ['Quest Driven', 'Full-Stack Build', 'Collaborator', 'Growth Mindset'];

const QUESTS: Quest[] = [
  {
    id: 'midwood-smokehouse',
    title: 'Server',
    guild: 'Midwood Smokehouse',
    region: 'Huntersville, NC',
    season: '05/2025 - Current',
    status: 'Active',
    iconSrc: '/bbq.png',
    objectives: [
      'Deliver guest-first service with speed and accuracy',
      'Coordinate with the kitchen to keep orders flowing smoothly',
      'Maintain a welcoming, upbeat dining experience',
    ],
  },
  {
    id: 'remix-counselor',
    title: 'Remix Counselor',
    guild: 'Lake Forest Church',
    region: 'Huntersville, NC',
    season: '11/2025 - Current',
    status: 'Active',
    iconSrc: '/Remix.png',
    objectives: [
      'Guide freshmen in high school to grow in Mind and Spirit',
      'Helped run group counseling sessions that supported honest conversation and mutual support',
    ],
  },
  {
    id: 'volunteer',
    title: 'Volunteer',
    guild: 'Volunteer',
    region: 'Todd, NC',
    season: '09/2024 - 11/2024',
    status: 'Completed',
    iconSrc: '/Volounteer.png',
    objectives: [
      'Assisted with debris clean up and distributing supplies',
    ],
  },
  {
    id: 'camp-counselor',
    title: 'Camp Counselor',
    guild: 'Mecklenburg County Recreation',
    region: 'Huntersville, NC',
    season: '06/2024 - 08/2024',
    status: 'Completed',
    iconSrc: '/Camp.png',
    objectives: [
      'Supervised energetic children ages 6 to 8 during crafts and field trips',
      'Acted as a role model through consistent enthusiasm',
    ],
  },
  {
    id: 'resident-assistant',
    title: 'Resident Assistant',
    guild: 'Appalachian State University Housing',
    region: 'Boone, NC',
    season: '01/2023 - 06/2024',
    status: 'Completed',
    iconSrc: '/Resident.png',
    objectives: [
      'Brought residents together through community events that encouraged connection',
      'Helped mediate resident conflicts by guiding conversations toward respectful solutions',
      'Created and led programs designed to support residents\' personal growth and academic success',
    ],
  },
  {
    id: '131-main-server',
    title: 'Server',
    guild: '131 Main',
    region: 'Huntersville, NC',
    season: '08/2019 - 08/2021',
    status: 'Completed',
    iconSrc: '/server.png',
    objectives: [
      'Provided attentive table service in a high-volume setting',
      'Collaborated with the team to keep service smooth and on-time',
      'Kept guests informed and ensured orders were accurate',
    ],
  },
];

const ACHIEVEMENTS = [
  'System Thinker',
  'Debug Duelist',
  'API Crafter',
  'UX Ally',
  'Conflict Mediator',
  'Team Amplifier',
  'Mentor Spark',
  'Service Mindset',
];

export default function Contact() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [xpActive, setXpActive] = useState(false);
  const xpRef = useRef<HTMLDivElement | null>(null);
  const characterRef = useRef<HTMLElement | null>(null);
  const questLogRef = useRef<HTMLElement | null>(null);
  const { level, xpPercent } = getLevelAndXp();

  useEffect(() => {
    const target = xpRef.current;
    if (!target) {
      return;
    }
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setXpActive(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setXpActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const characterEl = characterRef.current;
    const questLogEl = questLogRef.current;
    if (!characterEl || !questLogEl) {
      return;
    }
    let rafId = 0;

    const updateQuestHeight = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(() => {
        if (window.matchMedia('(max-width: 900px)').matches) {
          questLogEl.style.removeProperty('--quest-log-height');
          return;
        }
        const height = Math.ceil(characterEl.getBoundingClientRect().height);
        questLogEl.style.setProperty('--quest-log-height', `${height}px`);
      });
    };

    updateQuestHeight();
    const resizeObserver = new ResizeObserver(updateQuestHeight);
    resizeObserver.observe(characterEl);
    window.addEventListener('resize', updateQuestHeight);
    return () => {
      window.removeEventListener('resize', updateQuestHeight);
      resizeObserver.disconnect();
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const toggleQuest = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Container>
      <section id="contact" className="pixel-panel experience-panel" aria-labelledby="experience-title">
        <div className="hud-scanlines" aria-hidden="true" />
        <div className="hud-particles" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="experience-content">
          <header className="experience-header">
            <h2 id="experience-title" className="section-title">Experience</h2>
            <p className="experience-subtitle">RPG character screen and quest log</p>
          </header>

          <div className="experience-grid">
            <section className="hud-panel character-card pixel-border" aria-label="Character card" ref={characterRef}>
              <div className="character-top">
                <div className="pixel-avatar pixel-border">
                  <img src="/PixelMe.png" alt="Pixel avatar of Thomas Maglietto" draggable={false} />
                </div>
                <div className="character-meta">
                  <div className="character-name">Thomas Maglietto</div>
                  <div className="stat-chips" role="list">
                    {STAT_CHIPS.map((chip) => (
                      <span className="stat-chip" role="listitem" key={chip}>{chip}</span>
                    ))}
                  </div>
                </div>
              </div>

                <div className="level-row">
                  <div className="level-label">Level</div>
                  <div className="level-value" aria-label={`Level ${level}`}>{level}</div>
                </div>

              <div className="xp-block" ref={xpRef}>
                <div className="xp-label">XP: Growth Grind</div>
                <div className="xp-bar" role="progressbar" aria-label="XP Growth Grind" aria-valuemin={0} aria-valuemax={100} aria-valuenow={xpPercent}>
                  <span className="xp-fill" style={{ width: xpActive ? `${xpPercent}%` : '0%' }} />
                </div>
                <div className="xp-percent">{xpPercent}%</div>
              </div>

              <div className="achievements">
                <h4 className="achievements-title">Achievements Unlocked</h4>
                <div className="achievement-row" role="list">
                  {ACHIEVEMENTS.map((achievement) => (
                    <div className="achievement-badge" role="listitem" key={achievement}>
                      {achievement}
                    </div>
                  ))}
                </div>
              </div>

              <div className="passive-buff">
                <span className="passive-label">Passive Buff:</span>
                <span className="passive-text">
                  <span className="buff-detail">When challenged</span>
                  <span className="buff-amount">+10</span>
                  <span className="buff-name">Persistence</span>
                </span>
                <span className="passive-text">
                  <span className="buff-detail">To new idea discovery</span>
                  <span className="buff-amount">+5</span>
                  <span className="buff-name">Curiosity Spark</span>
                </span>
                <span className="passive-text">
                  <span className="buff-detail">When collaborating</span>
                  <span className="buff-amount">+8</span>
                  <span className="buff-name">Team Sync</span>
                </span>
              </div>
            </section>

            <section className="hud-panel quest-log pixel-border" aria-label="Quest log" ref={questLogRef}>
              <div className="quest-log-header">
                <h3 className="quest-log-title">Quest Log</h3>
              </div>

              <div className="quest-list">
                {QUESTS.map((quest) => {
                  const isOpen = !!expanded[quest.id];
                  const contentId = `quest-${quest.id}`;
                  return (
                    <article
                      key={quest.id}
                      className="quest-card pixel-border"
                      data-expanded={isOpen ? 'true' : 'false'}
                    >
                      <div className={`quest-status-bar ${quest.status.toLowerCase()}`}>
                        {quest.status}
                      </div>
                      <button
                        type="button"
                        className="quest-toggle"
                        onClick={() => toggleQuest(quest.id)}
                        aria-expanded={isOpen}
                        aria-controls={contentId}
                      >
                        <span className="quest-icon-wrap" aria-hidden="true">
                          <img
                            className={
                              `quest-icon${quest.id === 'remix-counselor' ? ' remix-icon' : ''}` +
                              `${quest.id === '131-main-server' ? ' server-icon' : ''}` +
                              `${quest.id === 'midwood-smokehouse' ? ' bbq-icon' : ''}`
                            }
                            src={quest.iconSrc}
                            alt=""
                            aria-hidden
                            draggable={false}
                          />
                        </span>
                        <span className="quest-main">
                          <span className="quest-title">{quest.title}</span>
                          <span className="quest-guild">{quest.guild}</span>
                          <span className="quest-meta">
                            <span>{quest.season}</span>
                            <span>{quest.region}</span>
                          </span>
                        </span>
                      </button>
                      <div id={contentId} className="quest-content" role="region" aria-label={`${quest.title} objectives`}>
                        <div className="quest-content-inner">
                          <ul className="quest-objectives">
                            {quest.objectives.map((objective) => (
                              <li key={objective}>{objective}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

            </section>
          </div>
        </div>
      </section>
    </Container>
  );
}
