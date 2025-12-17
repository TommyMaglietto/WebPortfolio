import { useState } from 'react';
import type React from 'react';
import Container from '../components/Container';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const to = 'magliettothomas@gmail.com';
    const subject = encodeURIComponent(`Portfolio Contact from ${name || 'Someone'}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  };

  return (
    <Container>
      <section className="pixel-panel">
        <h2 className="section-title">Contact</h2>

        <div className="contact-grid">
          <form className="contact-form pixel-border" onSubmit={submit}>
            <label>
              <span>Name</span>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
            </label>
            <label>
              <span>Email</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            </label>
            <label className="full">
              <span>Message</span>
              <textarea rows={5} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="How can I help?" />
            </label>
            <button className="btn pixel-border pixel-pressed" type="submit">Send &gt;&gt;</button>
          </form>

          <aside className="contact-aside">
            <div className="contact-box pixel-border">
              <ul className="contact-list">
                <li className="contact-item pixel-border">
                  <span className="contact-icon" aria-hidden>[E]</span>
                  <div className="contact-content">
                    <strong>Email</strong>
                    <a className="link" href="mailto:magliettothomas@gmail.com">magliettothomas@gmail.com</a>
                  </div>
                </li>
                <li className="contact-item pixel-border">
                  <span className="contact-icon" aria-hidden>[P]</span>
                  <div className="contact-content">
                    <strong>Phone</strong>
                    <a className="link" href="tel:+17049099760">(704) 909-9760</a>
                  </div>
                </li>
                <li className="contact-item pixel-border">
                  <span className="contact-icon" aria-hidden>[L]</span>
                  <div className="contact-content">
                    <strong>Location</strong>
                    <span>Huntersville, NC</span>
                  </div>
                </li>
              </ul>
              <div className="socials">
                <a
                  className="chip social-chip"
                  href="https://github.com/TommyMaglietto"
                  aria-label="GitHub"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a
                  className="chip social-chip"
                  href="https://www.linkedin.com/in/thomas-maglietto-426395324/"
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </Container>
  );
}
