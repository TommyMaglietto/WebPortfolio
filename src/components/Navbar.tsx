import { useEffect, useRef, useState } from 'react';

export type TabKey = 'about' | 'projects' | 'contact';

const HOME_IDLE_SRC = '/HomeButton.png';
const HOME_GIF_SRC = '/HomeButton.gif';
const HOME_HOVER_SRC = '/HoverHome.png';
const PROJECTS_IDLE_SRC = '/ProjectsButton.png';
const PROJECTS_GIF_SRC = '/ProjectsButton.gif';
const PROJECTS_HOVER_SRC = '/HoverProjects.png';
const EXPERIENCE_IDLE_SRC = '/ExperienceButton.png';
const EXPERIENCE_GIF_SRC = '/ExperienceButton.gif';
const EXPERIENCE_HOVER_SRC = '/HoverExperience.png';
const BUTTON_AUDIO_SRC = '/ButtonPress.mp3';
const BUTTON_GIF_DURATION_MS = 300;
const BUTTON_NAV_DELAY_MS = 100;

interface NavbarProps {
  active: TabKey;
  onChange: (tab: TabKey) => void;
}

const TABS: {
  key: TabKey;
  label: string;
  icon: string;
  stacked?: { top: string; bottom: string };
  variant?: 'home' | 'projects' | 'experience';
}[] = [
  { key: 'projects', label: 'Projects & Skills', stacked: { top: 'Projects ', bottom: '& Skills' }, icon: '*', variant: 'projects' },
  { key: 'about', label: 'Home', icon: 'O', variant: 'home' },
  { key: 'contact', label: 'Experience', icon: '+', variant: 'experience' },
];

export function Navbar({ active, onChange }: NavbarProps) {
  const [homeGifPlaying, setHomeGifPlaying] = useState(false);
  const [homeGifVersion, setHomeGifVersion] = useState(0);
  const [homeHovered, setHomeHovered] = useState(false);
  const homeGifTimeoutRef = useRef<number | null>(null);
  const homeSwitchTimeoutRef = useRef<number | null>(null);
  const [projectsGifPlaying, setProjectsGifPlaying] = useState(false);
  const [projectsGifVersion, setProjectsGifVersion] = useState(0);
  const [projectsHovered, setProjectsHovered] = useState(false);
  const projectsGifTimeoutRef = useRef<number | null>(null);
  const projectsSwitchTimeoutRef = useRef<number | null>(null);
  const [experienceGifPlaying, setExperienceGifPlaying] = useState(false);
  const [experienceGifVersion, setExperienceGifVersion] = useState(0);
  const [experienceHovered, setExperienceHovered] = useState(false);
  const experienceGifTimeoutRef = useRef<number | null>(null);
  const experienceSwitchTimeoutRef = useRef<number | null>(null);
  const buttonAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const idleImg = new Image();
    idleImg.src = HOME_IDLE_SRC;
    const hoverImg = new Image();
    hoverImg.src = HOME_HOVER_SRC;
    const projectsIdleImg = new Image();
    projectsIdleImg.src = PROJECTS_IDLE_SRC;
    const projectsHoverImg = new Image();
    projectsHoverImg.src = PROJECTS_HOVER_SRC;
    const experienceIdleImg = new Image();
    experienceIdleImg.src = EXPERIENCE_IDLE_SRC;
    const experienceHoverImg = new Image();
    experienceHoverImg.src = EXPERIENCE_HOVER_SRC;
    buttonAudioRef.current = new Audio(BUTTON_AUDIO_SRC);
    buttonAudioRef.current.preload = 'auto';
    return () => {
      if (homeGifTimeoutRef.current !== null) {
        window.clearTimeout(homeGifTimeoutRef.current);
      }
      if (homeSwitchTimeoutRef.current !== null) {
        window.clearTimeout(homeSwitchTimeoutRef.current);
      }
      if (projectsGifTimeoutRef.current !== null) {
        window.clearTimeout(projectsGifTimeoutRef.current);
      }
      if (projectsSwitchTimeoutRef.current !== null) {
        window.clearTimeout(projectsSwitchTimeoutRef.current);
      }
      if (experienceGifTimeoutRef.current !== null) {
        window.clearTimeout(experienceGifTimeoutRef.current);
      }
      if (experienceSwitchTimeoutRef.current !== null) {
        window.clearTimeout(experienceSwitchTimeoutRef.current);
      }
    };
  }, []);

  const playHomeGif = () => {
    if (homeGifPlaying) {
      return;
    }
    setHomeGifPlaying(true);
    setHomeGifVersion((value) => value + 1);
    if (homeGifTimeoutRef.current !== null) {
      window.clearTimeout(homeGifTimeoutRef.current);
    }
    homeGifTimeoutRef.current = window.setTimeout(() => {
      setHomeGifPlaying(false);
    }, BUTTON_GIF_DURATION_MS);
  };

  const playProjectsGif = () => {
    if (projectsGifPlaying) {
      return;
    }
    setProjectsGifPlaying(true);
    setProjectsGifVersion((value) => value + 1);
    if (projectsGifTimeoutRef.current !== null) {
      window.clearTimeout(projectsGifTimeoutRef.current);
    }
    projectsGifTimeoutRef.current = window.setTimeout(() => {
      setProjectsGifPlaying(false);
    }, BUTTON_GIF_DURATION_MS);
  };

  const playExperienceGif = () => {
    if (experienceGifPlaying) {
      return;
    }
    setExperienceGifPlaying(true);
    setExperienceGifVersion((value) => value + 1);
    if (experienceGifTimeoutRef.current !== null) {
      window.clearTimeout(experienceGifTimeoutRef.current);
    }
    experienceGifTimeoutRef.current = window.setTimeout(() => {
      setExperienceGifPlaying(false);
    }, BUTTON_GIF_DURATION_MS);
  };

  const playButtonAudio = () => {
    const audio = buttonAudioRef.current;
    if (!audio) {
      return;
    }
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  const handleTabClick = (key: TabKey, variant?: 'home' | 'projects' | 'experience') => {
    if (variant === 'home') {
      if (homeGifPlaying) {
        return;
      }
      playButtonAudio();
      playHomeGif();
      if (homeSwitchTimeoutRef.current !== null) {
        window.clearTimeout(homeSwitchTimeoutRef.current);
      }
      homeSwitchTimeoutRef.current = window.setTimeout(() => {
        onChange(key);
      }, BUTTON_NAV_DELAY_MS);
      return;
    }
    if (variant === 'projects') {
      if (projectsGifPlaying) {
        return;
      }
      playButtonAudio();
      playProjectsGif();
      if (projectsSwitchTimeoutRef.current !== null) {
        window.clearTimeout(projectsSwitchTimeoutRef.current);
      }
      projectsSwitchTimeoutRef.current = window.setTimeout(() => {
        onChange(key);
      }, BUTTON_NAV_DELAY_MS);
      return;
    }
    if (variant === 'experience') {
      if (experienceGifPlaying) {
        return;
      }
      playButtonAudio();
      playExperienceGif();
      if (experienceSwitchTimeoutRef.current !== null) {
        window.clearTimeout(experienceSwitchTimeoutRef.current);
      }
      experienceSwitchTimeoutRef.current = window.setTimeout(() => {
        onChange(key);
      }, BUTTON_NAV_DELAY_MS);
      return;
    }
    onChange(key);
  };

  return (
    <nav className="nav-shell">
      <div className="page-container">
        <div className="nav-bar pixel-border">
          {TABS.map(({ key, label, icon, stacked, variant }) => {
            const isHome = variant === 'home';
            const isProjects = variant === 'projects';
            const isExperience = variant === 'experience';
            const isMediaTab = isHome || isProjects || isExperience;
            const isPlaying = isHome
              ? homeGifPlaying
              : isProjects
                ? projectsGifPlaying
                : isExperience
                  ? experienceGifPlaying
                  : false;
            const isHovered = isHome
              ? homeHovered
              : isProjects
                ? projectsHovered
                : isExperience
                  ? experienceHovered
                  : false;
            const showHover = isMediaTab && isHovered && !isPlaying;
            const gifSrc = isHome
              ? HOME_GIF_SRC
              : isProjects
                ? PROJECTS_GIF_SRC
                : EXPERIENCE_GIF_SRC;
            const idleSrc = isHome
              ? HOME_IDLE_SRC
              : isProjects
                ? PROJECTS_IDLE_SRC
                : EXPERIENCE_IDLE_SRC;
            const hoverSrc = isHome
              ? HOME_HOVER_SRC
              : isProjects
                ? PROJECTS_HOVER_SRC
                : EXPERIENCE_HOVER_SRC;
            const gifVersion = isHome
              ? homeGifVersion
              : isProjects
                ? projectsGifVersion
                : experienceGifVersion;
            return (
              <button
                key={key}
                className={
                  'nav-tab ' +
                  (stacked ? 'has-stacked ' : '') +
                  (active === key ? 'active pixel-pressed' : 'pixel-hover') +
                  (isHome ? ' home-tab' : '') +
                  (isProjects ? ' projects-tab' : '') +
                  (isExperience ? ' experience-tab' : '')
                }
                aria-current={active === key ? 'page' : undefined}
                aria-label={isMediaTab ? label : undefined}
                onClick={() => handleTabClick(key, variant)}
                onMouseEnter={
                  isMediaTab
                    ? () => (
                        isHome
                          ? setHomeHovered(true)
                          : isProjects
                            ? setProjectsHovered(true)
                            : setExperienceHovered(true)
                      )
                    : undefined
                }
                onMouseLeave={
                  isMediaTab
                    ? () => (
                        isHome
                          ? setHomeHovered(false)
                          : isProjects
                            ? setProjectsHovered(false)
                            : setExperienceHovered(false)
                      )
                    : undefined
                }
              >
              {isMediaTab ? (
                isPlaying ? (
                  <img
                    className="home-gif"
                    src={`${gifSrc}?play=${gifVersion}`}
                    alt=""
                    aria-hidden
                    draggable={false}
                  />
                ) : showHover ? (
                  <img className="home-gif" src={hoverSrc} alt="" aria-hidden draggable={false} />
                ) : (
                  <img className="home-gif" src={idleSrc} alt="" aria-hidden draggable={false} />
                )
              ) : (
                <>
                  <span className="tab-icon" aria-hidden>
                    {icon}
                  </span>
                  {stacked ? (
                    <>
                      <span className="tab-label">{label}</span>
                      <span className="tab-label stacked">
                        <span className="tab-line">{stacked.top}</span>
                        <span className="tab-line">{stacked.bottom}</span>
                      </span>
                    </>
                  ) : (
                    <span className="tab-label">{label}</span>
                  )}
                </>
              )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
