import { useCallback, useEffect, useRef, useState } from 'react';

const GITHUB_URL = 'https://github.com/TommyMaglietto';
const LINKEDIN_URL = 'https://www.linkedin.com/in/thomas-maglietto-426395324/';

type SocialStat = {
  label: string;
  value: number;
};

type SocialItem = {
  id: 'github' | 'linkedin';
  name: string;
  rarity: string;
  rarityTone: 'legendary' | 'epic';
  flavor: string;
  url: string;
  hotkey: string;
  ariaLabel: string;
  stats: SocialStat[];
  icon: JSX.Element;
};

const LOG_LINES = [
  '> Equipped: Code Forge',
  '> Equipped: Guild Network',
  '> Tip: Press [G] or [L] to travel',
];

const HOTKEYS_TEXT = 'HOTKEYS: [G] GitHub  [L] LinkedIn';

function CodeForgeIcon() {
  return (
    <img src="/Git.png" alt="" aria-hidden="true" />
  );
}

function GuildNetworkIcon() {
  return (
    <img src="/linked.png" alt="" aria-hidden="true" />
  );
}

const SOCIALS: SocialItem[] = [
  {
    id: 'github',
    name: 'Code Forge',
    rarity: 'Legendary Tool',
    rarityTone: 'legendary',
    flavor: 'Smelt commits into glowing builds.',
    url: GITHUB_URL,
    hotkey: 'G',
    ariaLabel: "Open Thomas's GitHub",
    stats: [
      { label: 'Repos +', value: 7 },
      { label: 'Commits +', value: 6 },
    ],
    icon: <CodeForgeIcon />,
  },
  {
    id: 'linkedin',
    name: 'Guild Network',
    rarity: 'Epic Relic',
    rarityTone: 'epic',
    flavor: 'Summon allies across the realm.',
    url: LINKEDIN_URL,
    hotkey: 'L',
    ariaLabel: "Open Thomas's LinkedIn",
    stats: [
      { label: 'Connections +', value: 6 },
      { label: 'Allies +', value: 5 },
    ],
    icon: <GuildNetworkIcon />,
  },
];

function isTypingElement(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }
  const tag = target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
    return true;
  }
  return target.isContentEditable;
}

export default function SocialLoadout() {
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [hasViewed, setHasViewed] = useState(false);
  const [showHotkeys, setShowHotkeys] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const typingStartedRef = useRef(false);
  const confirmTimeoutRef = useRef<number | null>(null);
  const typingTimeoutRef = useRef<number | null>(null);

  const triggerConfirm = useCallback((id: string) => {
    setConfirmingId(id);
    if (confirmTimeoutRef.current) {
      window.clearTimeout(confirmTimeoutRef.current);
    }
    confirmTimeoutRef.current = window.setTimeout(() => {
      setConfirmingId((prev) => (prev === id ? null : prev));
    }, 180);
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReducedMotion(media.matches);
    update();
    if (media.addEventListener) {
      media.addEventListener('change', update);
    } else {
      media.addListener(update);
    }
    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', update);
      } else {
        media.removeListener(update);
      }
    };
  }, []);

  useEffect(() => {
    const target = terminalRef.current;
    if (!target || hasViewed) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setHasViewed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [hasViewed]);

  useEffect(() => {
    if (!hasViewed) {
      return;
    }
    setShowHotkeys(true);
    const timeout = window.setTimeout(() => setShowHotkeys(false), 4200);
    return () => window.clearTimeout(timeout);
  }, [hasViewed]);

  useEffect(() => {
    if (!hasViewed || typingStartedRef.current) {
      return;
    }
    typingStartedRef.current = true;
    if (prefersReducedMotion) {
      setTypedLines(LOG_LINES);
      setTypingComplete(true);
      return;
    }

    let lineIndex = 0;
    let charIndex = 0;

    const typeNext = () => {
      const activeLineIndex = lineIndex;
      const line = LOG_LINES[activeLineIndex];
      const nextText = line.slice(0, charIndex + 1);
      setTypedLines((prev) => {
        const next = [...prev];
        if (next.length <= activeLineIndex) {
          next.push(nextText);
        } else {
          next[activeLineIndex] = nextText;
        }
        return next;
      });
      charIndex += 1;
      if (charIndex < line.length) {
        typingTimeoutRef.current = window.setTimeout(typeNext, 22);
        return;
      }
      lineIndex += 1;
      charIndex = 0;
      if (lineIndex < LOG_LINES.length) {
        typingTimeoutRef.current = window.setTimeout(typeNext, 160);
        return;
      }
      setTypingComplete(true);
    };

    typeNext();

    return () => {
      if (typingTimeoutRef.current) {
        window.clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [hasViewed, prefersReducedMotion]);

  useEffect(() => {
    return () => {
      if (confirmTimeoutRef.current) {
        window.clearTimeout(confirmTimeoutRef.current);
      }
      if (typingTimeoutRef.current) {
        window.clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey || event.repeat) {
        return;
      }
      if (isTypingElement(event.target)) {
        return;
      }
      const key = event.key.toLowerCase();
      const social = SOCIALS.find((item) => item.hotkey.toLowerCase() === key);
      if (!social) {
        return;
      }
      triggerConfirm(social.id);
      window.open(social.url, '_blank', 'noopener,noreferrer');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerConfirm]);

  return (
    <section className="social-loadout" aria-labelledby="social-loadout-title">
      <header className="social-loadout-header pixel-border">
        <span className="loadout-title" id="social-loadout-title">SOCIAL LOADOUT</span>
        <span className="loadout-status">ONLINE</span>
      </header>

      {showHotkeys && (
        <div className="loadout-hotkeys" role="status" aria-live="polite">
          {HOTKEYS_TEXT}
        </div>
      )}

      <div className="social-loadout-grid">
        {SOCIALS.map((social) => {
          const isConfirming = confirmingId === social.id;
          return (
            <article
              key={social.id}
              className={`social-card pixel-border${isConfirming ? ' confirming' : ''}`}
              data-rarity={social.rarityTone}
            >
              <div className="social-card-top">
                <div className="social-icon" aria-hidden="true">
                  {social.icon}
                </div>
                <div className="social-meta">
                  <div className="social-title">
                    <span className="social-name">{social.name}</span>
                    <span className={`rarity-badge ${social.rarityTone}`}>{social.rarity}</span>
                  </div>
                  <p className="social-flavor">{social.flavor}</p>
                </div>
              </div>

              <div className="loadout-stats" role="list">
                {social.stats.map((stat) => (
                  <div className="loadout-stat" role="listitem" key={stat.label}>
                    <span className="loadout-stat-label">{stat.label}</span>
                    <div className="loadout-meter" aria-hidden="true">
                      {Array.from({ length: 10 }).map((_, index) => (
                        <span
                          key={`${stat.label}-${index}`}
                          className={`loadout-bit${index < stat.value ? ' on' : ''}`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <a
                className={`loadout-cta${isConfirming ? ' confirming' : ''}`}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                aria-label={social.ariaLabel}
                aria-keyshortcuts={social.hotkey}
                onClick={() => triggerConfirm(social.id)}
              >
                PRESS [{social.hotkey}] TO OPEN
              </a>
            </article>
          );
        })}
      </div>

      <div className="loadout-terminal pixel-border" ref={terminalRef} aria-live="polite">
        <div className="terminal-title">SYSTEM LOG</div>
        <div className="terminal-lines">
          {typedLines.map((line, index) => {
            const isLast = index === typedLines.length - 1;
            return (
              <div className="terminal-line" key={`${line}-${index}`}>
                {line}
                {isLast && !typingComplete && !prefersReducedMotion && (
                  <span className="terminal-cursor" aria-hidden="true">|</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
