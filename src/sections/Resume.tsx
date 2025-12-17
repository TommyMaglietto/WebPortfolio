import type { MouseEvent } from 'react';
import Container from '../components/Container';

const pdfPath = '/Thomas_Maglietto_Resume.pdf';

function handleDownload(e: MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  const href = pdfPath;
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

export default function Resume() {
  return (
    <Container>
      <section className="pixel-panel">
        <h2 className="section-title">Resume</h2>
        <p>
          Downloadable PDF: {' '}
          <a className="link" href={pdfPath} download onClick={handleDownload}>
            Thomas_Maglietto_Resume
          </a>
        </p>

        <h3>Education</h3>
        <p>
          <strong>B.S. in Computer Science</strong><br />
          Appalachian State University, Boone, NC - 3.04 GPA<br />
        </p>

        <h3>Work Experience</h3>
        <div className="resume-block">
          <h4>Resident Assistant - Appalachian State University</h4>
          <em>Jan 2023 - Current</em>
          <ul>
            <li>Guided and supported first-year students through the transition to college life.</li>
            <li>Used mediation and conflict management for problem resolution.</li>
            <li>Responded to and managed emergency situations.</li>
            <li>Coordinated personal development initiatives (study, time, stress management).</li>
          </ul>
        </div>
        <div className="resume-block">
          <h4>Server - 131 Main, Cornelius, NC</h4>
          <em>Jun 2021 - Aug 2022</em>
          <ul>
            <li>Delivered exceptional guest service with strong menu knowledge.</li>
            <li>Collaborated across hosts, bussers, and kitchen for smooth service.</li>
          </ul>
        </div>

        <h3>Volunteer</h3>
        <p>
          <strong>Todd, NC</strong> - Sep 2024 - Nov 2024<br />
          Assisted debris cleanup and helped wherever needed.
        </p>
      </section>
    </Container>
  );
}
