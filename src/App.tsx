import { useEffect, useRef, useState } from 'react';
import './styles/app.css';
import Container from './components/Container';
import RetroBackground from './components/RetroBackground';
import Navbar, { type TabKey } from './components/Navbar';
import About from './sections/About';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import useScrollLock from './hooks/useScrollLock';

const TAB_STORAGE_KEY = 'activeTab';

const isTabKey = (value: string | null): value is TabKey =>
  value === 'about' || value === 'projects' || value === 'experience';

const getInitialTab = (): TabKey => {
  if (typeof window === 'undefined') {
    return 'about';
  }
  try {
    const stored = window.localStorage.getItem(TAB_STORAGE_KEY);
    return isTabKey(stored) ? stored : 'about';
  } catch {
    return 'about';
  }
};

export default function App() {
  const [active, setActive] = useState<TabKey>(getInitialTab);
  const [avatarOk, setAvatarOk] = useState(true);
  const mainRef = useRef<HTMLElement | null>(null);

  useScrollLock({ enabled: active === 'about', mainRef });

  useEffect(() => {
    try {
      window.localStorage.setItem(TAB_STORAGE_KEY, active);
    } catch {
      // Ignore storage write failures (private mode, disabled storage).
    }
  }, [active]);

  return (
    <div className="site-shell">
      <RetroBackground />

      <header className="site-header">
        <Container className="header-inner">
          <h1 className="brand">Thomas Maglietto</h1>
        </Container>
        <Navbar active={active} onChange={setActive} />
      </header>

      <main className="content" role="main" ref={mainRef}>
        {active === 'about' && (
          <>
            <Container>
              <section className="profile-hero">
                <div className="avatar pixel-border">
                  {avatarOk ? (
                    <img
                      src="/profile.jpg"
                      alt="Your profile"
                      onError={() => setAvatarOk(false)}
                      decoding="async"
                      draggable={false}
                    />
                  ) : (
                    <span className="fallback" aria-hidden="true">TM</span>
                  )}
                </div>
              </section>
            </Container>
            <About />
          </>
        )}
        {active === 'projects' && (
          <>
            <Projects />
          </>
        )}
        {active === 'experience' && (
          <>
            <Experience />
            <Skills />
          </>
        )}
      </main>

      <footer className="site-footer">
        <Container>
          <small>(c) {new Date().getFullYear()} Thomas Maglietto</small>
        </Container>
      </footer>
    </div>
  );
}
