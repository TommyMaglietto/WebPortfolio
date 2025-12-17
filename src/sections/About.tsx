import type { MouseEvent } from 'react';
import Container from '../components/Container';

const resumePdf = '/Thomas_Maglietto_Resume.pdf';

function handleResumeDownload(e: MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  const href = resumePdf;
  (async () => {
    try {
      const res = await fetch(href, { cache: 'no-cache' });
      if (!res.ok) {
        window.location.href = href;
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Thomas_Maglietto_Resume.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      window.location.href = href;
    }
  })();
}

export default function About() {
  return (
    <Container>
      <section className="pixel-panel about-panel">
        <header className="section-header">
          <h1 className="title">Thomas Maglietto</h1>
          <p className="subtitle">Game Developer & Software Engineer</p>
          <p className="summary">
            Passionate and motivated Game Developer and aspiring Software Engineer who
            strives to make positive impacts on the world one project, one dream, and
            one person at a time. Dedicated to continuous growth, innovation, and
            creating meaningful change through technology, while embracing challenges
            as opportunities for improvement with persistence and the love of
            overcoming.
          </p>
          <p className="contact-line">
            <a href="mailto:magliettothomas@gmail.com">magliettothomas@gmail.com</a>
            <span className="separator">|</span>
            <a href="tel:+17049099760">(704) 909-9760</a>
            <span className="separator">|</span>
            <span className="contact-text">Huntersville, NC</span>
          </p>
          <div className="resume-cta">
            <a
              className="btn resume-btn pixel-border pixel-hover"
              href={resumePdf}
              download
              onClick={handleResumeDownload}
            >
              Download Resume
            </a>
          </div>
        </header>

        <div className="split">
          <div>
            <h3>Education</h3>
            <p>
              <strong>B.S. in Computer Science</strong>
              <br />
              Appalachian State University, Boone, NC
              <br />
            </p>
          </div>
          <div>
            <h3>Highlights</h3>
            <ul className="bullets">
              <li>Creative • Tenacious • Impactful</li>
              <li>Challenge Seeker • Team player • Problem solver</li>
            </ul>
          </div>
        </div>
      </section>
    </Container>
  );
}
