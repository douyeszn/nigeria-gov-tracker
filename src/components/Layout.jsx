import { useState, useEffect } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/',           label: 'Overview',    end: true },
  { to: '/sectors',    label: 'Sectors'               },
  { to: '/projects',   label: 'Projects'              },
  { to: '/revenue',    label: 'Revenue'               },
  { to: '/oil-money',  label: 'Oil Money'             },
  { to: '/research',   label: 'Research'              },
  { to: '/cabinet',    label: 'Cabinet'               },
]

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  return (
    <>
      <style>{`
        .nav-link-desktop {
          display: flex; align-items: center;
          padding: 0 16px; height: 44px;
          font-size: 13px; font-family: var(--ff-sans); font-weight: 500;
          color: rgba(255,255,255,0.65);
          text-decoration: none; white-space: nowrap;
          border-bottom: 3px solid transparent;
          transition: color 0.15s, border-color 0.15s;
        }
        .nav-link-desktop:hover { color: #fff; }
        .nav-link-desktop.active { color: #fff; border-bottom-color: #008751; }

        .nav-link-mobile {
          display: flex; align-items: center; gap: 10px;
          padding: 13px 20px;
          font-size: 15px; font-family: var(--ff-sans); font-weight: 500;
          color: rgba(255,255,255,0.7); text-decoration: none;
          border-left: 3px solid transparent;
          transition: background 0.1s, color 0.1s;
        }
        .nav-link-mobile.active { color: #fff; background: rgba(255,255,255,0.07); border-left-color: #008751; }

        @media (max-width: 720px) { .desktop-links { display: none !important; } }
        @media (min-width: 721px) { .hamburger-btn { display: none !important; } }
      `}</style>

      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

        {/* ── BRAND ROW ── */}
        <div style={{
          background: 'var(--navy)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{
            maxWidth: 1100, margin: '0 auto',
            padding: '0 20px', height: 52,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            {/* Logo + name */}
            <NavLink to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{
                width: 32, height: 32, background: '#008751',
                borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 800, color: '#fff', letterSpacing: '0.02em',
                flexShrink: 0,
              }}>BY</span>
              <div>
                <div style={{ fontFamily: 'var(--ff-serif)', fontSize: 16, color: '#fff', lineHeight: 1.1 }}>
                  Bayelsa State
                </div>
                <div style={{ fontSize: 9, fontFamily: 'var(--ff-mono)', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Accountability Tracker
                </div>
              </div>
            </NavLink>

            {/* Hamburger (mobile only) */}
            <button className="hamburger-btn"
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              style={{
                background: 'transparent', border: 'none',
                cursor: 'pointer', padding: '8px', display: 'flex', flexDirection: 'column', gap: 5,
              }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display: 'block', width: 22, height: 2, background: '#fff', borderRadius: 1,
                  transition: 'transform 0.2s, opacity 0.2s',
                  transform:
                    menuOpen && i === 0 ? 'translateY(7px) rotate(45deg)' :
                    menuOpen && i === 2 ? 'translateY(-7px) rotate(-45deg)' : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }} />
              ))}
            </button>
          </div>
        </div>

        {/* ── NAV LINKS ROW (sticky, desktop) ── */}
        <nav aria-label="Main navigation" style={{
          position: 'sticky', top: 0, zIndex: 200,
          background: '#111B3D',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 2px 10px rgba(13,19,45,0.4)',
        }}>
          <div className="desktop-links" style={{
            maxWidth: 1100, margin: '0 auto', padding: '0 20px',
            display: 'flex', alignItems: 'stretch',
          }}>
            {NAV_LINKS.map(link => (
              <NavLink key={link.to} to={link.to} end={link.end}
                className={({ isActive }) => `nav-link-desktop${isActive ? ' active' : ''}`}>
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile dropdown */}
          {menuOpen && (
            <div style={{
              background: '#0D132D',
              borderTop: '1px solid rgba(255,255,255,0.08)',
            }}>
              {NAV_LINKS.map(link => (
                <NavLink key={link.to} to={link.to} end={link.end}
                  className={({ isActive }) => `nav-link-mobile${isActive ? ' active' : ''}`}>
                  {link.label}
                </NavLink>
              ))}
            </div>
          )}
        </nav>

        {/* ── PAGE CONTENT ── */}
        <div style={{ flex: 1 }}>
          <Outlet />
        </div>

        {/* ── FOOTER ── */}
        <footer style={{
          background: 'var(--navy)', color: 'rgba(255,255,255,0.4)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          padding: '18px 20px', textAlign: 'center',
          fontSize: 11, fontFamily: 'var(--ff-mono)', lineHeight: 1.9,
        }}>
          Bayelsa State Accountability Tracker<br />
          Data: BudgIT · NBS · NERC · UNICEF · Amnesty International · Bayelsa State Govt · open sources<br />
          Values are realistic approximations for civic accountability purposes
        </footer>
      </div>
    </>
  )
}
