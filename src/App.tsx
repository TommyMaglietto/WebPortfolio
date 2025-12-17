import { useState } from 'react';
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

  return (
    <div className="site-shell">
      <RetroBackground active={active} />

      <header className="site-header">
        <Container className="header-inner">
          <h1 className="brand">Thomas Maglietto</h1>
        </Container>
        <Navbar active={active} onChange={setActive} />
      </header>

      <main className="content" role="main">
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
            <Skills />
          </>
        )}
        {active === 'contact' && <Contact />}
      </main>

      <footer className="site-footer">
        <Container>
          <small>(c) {new Date().getFullYear()} Thomas Maglietto</small>
        </Container>
      </footer>
    </div>
  );
}
