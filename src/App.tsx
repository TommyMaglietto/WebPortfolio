import { useEffect, useRef, useState } from 'react';
import './App.css';
import Container from './components/Container';
import RetroBackground from './components/RetroBackground';
import Navbar, { type TabKey } from './components/Navbar';
import About from './sections/About';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Contact from './sections/Contact';

export default function App() {
  const [active, setActive] = useState<TabKey>('about');
  const [avatarOk, setAvatarOk] = useState(true);
  const mainRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    const headerEl = document.querySelector('.site-header');
    const footerEl = document.querySelector('.site-footer');
    let rafId = 0;

    const updateScrollLock = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(() => {
        const headerHeight = headerEl?.getBoundingClientRect().height ?? 0;
        const footerHeight = footerEl?.getBoundingClientRect().height ?? 0;
        const mainHeight = mainRef.current?.scrollHeight ?? 0;
        const availableHeight = Math.max(window.innerHeight - headerHeight - footerHeight, 0);
        if (mainRef.current) {
          mainRef.current.style.setProperty('--main-available-height', `${availableHeight}px`);
        }
        const fitsViewport = mainHeight <= availableHeight + 2;
        if (active === 'about' && fitsViewport) {
          body.style.overflowY = 'hidden';
          html.style.overflowY = 'hidden';
        } else {
          body.style.overflowY = '';
          html.style.overflowY = '';
        }
      });
    };

    updateScrollLock();

    const resizeObserver = new ResizeObserver(updateScrollLock);
    if (mainRef.current) {
      resizeObserver.observe(mainRef.current);
    }
    if (headerEl) {
      resizeObserver.observe(headerEl);
    }
    if (footerEl) {
      resizeObserver.observe(footerEl);
    }

    window.addEventListener('resize', updateScrollLock);
    return () => {
      window.removeEventListener('resize', updateScrollLock);
      resizeObserver.disconnect();
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      body.style.overflowY = '';
      html.style.overflowY = '';
    };
  }, [active]);

  return (
    <div className="site-shell">
      <RetroBackground active={active} />

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
        {active === 'contact' && (
          <>
            <Contact />
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
