export type TabKey = 'about' | 'projects' | 'contact';

interface NavbarProps {
  active: TabKey;
  onChange: (tab: TabKey) => void;
}

const TABS: {
  key: TabKey;
  label: string;
  icon: string;
  stacked?: { top: string; bottom: string };
}[] = [
  { key: 'about', label: 'About', icon: 'O' },
  { key: 'projects', label: 'Projects & Skills', stacked: { top: 'Projects ', bottom: '& Skills' }, icon: '*' },
  { key: 'contact', label: 'Contact', icon: '+' },
];

export function Navbar({ active, onChange }: NavbarProps) {
  return (
    <nav className="nav-shell">
      <div className="page-container">
        <div className="nav-bar pixel-border">
          {TABS.map(({ key, label, icon, stacked }) => (
            <button
              key={key}
              className={
                'nav-tab ' +
                (stacked ? 'has-stacked ' : '') +
                (active === key ? 'active pixel-pressed' : 'pixel-hover')
              }
              aria-current={active === key ? 'page' : undefined}
              onClick={() => onChange(key)}
            >
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
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
