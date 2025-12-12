export type TabKey = 'about' | 'projects' | 'contact';

interface NavbarProps {
  active: TabKey;
  onChange: (tab: TabKey) => void;
}

const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: 'about', label: 'About', icon: '⌂' },
  { key: 'projects', label: 'Projects & Skills', icon: '✦' },
  { key: 'contact', label: 'Contact', icon: '✉' },
];

export function Navbar({ active, onChange }: NavbarProps) {
  return (
    <nav className="nav-bar pixel-border">
      {TABS.map(({ key, label, icon }) => (
        <button
          key={key}
          className={
            'nav-tab ' + (active === key ? 'active pixel-pressed' : 'pixel-hover')
          }
          aria-current={active === key ? 'page' : undefined}
          onClick={() => onChange(key)}
        >
          <span className="tab-icon" aria-hidden>
            {icon}
          </span>
          <span className="tab-label">{label}</span>
        </button>
      ))}
    </nav>
  );
}

export default Navbar;
