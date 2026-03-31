import { useState } from 'react'
import { Link } from 'react-router-dom'
import { GOVERNOR, SECTORS, PROJECTS, TIMELINE, BRIGHT_SPOTS, GOVERNOR_WINS, PRIORITIES } from '../data.js'
import { ScoreRing, StatBlock, SectionHeading, PageShell, scoreColor, scoreLabel, SEVERITY } from '../components/Shared.jsx'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts'

const RADAR_DATA = SECTORS.map(s => ({ subject: s.name.split(' ')[0], score: s.score }))

const PAGE_CARDS = [
  { to: '/sectors',    icon: '📊', color: '#1B4FC4', title: 'Sector Scorecards',
    desc: 'All 8 sectors: Education, Roads, Economy, Flood, Health, Environment, Industry, Electricity' },
  { to: '/projects',   icon: '🏗', color: '#C97400', title: 'Projects Tracker',
    desc: 'Ongoing, stalled, and completed infrastructure — with milestone timelines' },
  { to: '/revenue',    icon: '₦',  color: '#008751', title: 'Revenue & Economy',
    desc: 'How Bayelsa earns money — FAAC, derivation, IGR, expenditure breakdown' },
  { to: '/oil-money',  icon: '⛽', color: '#B50000', title: 'Who Gets the Oil?',
    desc: 'Oil revenue flow, NNPC board composition, Ijaw representation gap' },
  { to: '/research',   icon: '📄', color: '#0D132D', title: 'Research Papers',
    desc: '7 peer-reviewed studies and reports on Bayelsa governance, oil, and environment' },
]

const ALERT_ITEMS = [
  { text: 'Bayelsa Power Company (300MW) stalled 2+ years. ₦8B consumed. No resolution.', sev: 'red' },
  { text: '47 active oil spill sites — zero remediated. Fishing economy collapsed in 6 LGAs.', sev: 'red' },
  { text: '91% of residents lack basic water or sanitation (WASH access: 9% vs 39% national).', sev: 'red' },
  { text: '₦45B+ unspent across Roads, Economy, and Environment in FY2024.', sev: 'red' },
  { text: 'Diri administration attempted to block ICPC investigation in 2022 — court ruled against.', sev: 'amber' },
]

function PrioritiesSection() {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState(null)

  return (
    <div style={{ marginBottom: 36 }}>
      {/* Collapsed header — always visible */}
      <button onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: open ? 'var(--r-lg) var(--r-lg) 0 0' : 'var(--r-lg)',
          padding: '16px 20px', cursor: 'pointer',
          boxShadow: 'var(--shadow-sm)', textAlign: 'left',
        }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 18 }}>🎯</span>
          <div>
            <div style={{ fontFamily: 'var(--ff-serif)', fontSize: 18, color: 'var(--navy)', lineHeight: 1.1 }}>
              Government Priorities
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>
              {PRIORITIES.length} recommended actions — ranked by urgency
            </div>
          </div>
        </div>
        <span style={{
          fontFamily: 'var(--ff-mono)', fontSize: 11, color: 'var(--text-3)',
          letterSpacing: '0.06em', transition: 'transform 0.2s',
          transform: open ? 'rotate(180deg)' : 'none',
          display: 'inline-block',
        }}>▼</span>
      </button>

      {open && (
        <div style={{
          border: '1px solid var(--border)', borderTop: 'none',
          borderRadius: '0 0 var(--r-lg) var(--r-lg)',
          background: 'var(--surface-2)',
          padding: '4px 0 8px',
        }}>
          {PRIORITIES.map((p, i) => {
            const isOpen = expanded === p.rank
            const urgencyStyle = p.urgency === 'URGENT'
              ? { bg: '#FFF2F2', border: '#F5AAAA', text: '#B50000' }
              : p.urgency === 'HIGH'
              ? { bg: '#FFF8EC', border: '#F5C97A', text: '#C97400' }
              : { bg: '#EEF3FC', border: '#A3BCEE', text: '#1B4FC4' }

            return (
              <div key={p.rank} style={{
                margin: '8px 12px',
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 'var(--r-lg)', overflow: 'hidden',
              }}>
                <div style={{ height: 3, background: p.color }} />
                {/* Row — always visible */}
                <button onClick={() => setExpanded(isOpen ? null : p.rank)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                    padding: '13px 16px', background: 'transparent', border: 'none',
                    cursor: 'pointer', textAlign: 'left',
                  }}>
                  <span style={{
                    width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                    background: `${p.color}18`, border: `1px solid ${p.color}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--ff-mono)', fontSize: 12, fontWeight: 700, color: p.color,
                  }}>{p.rank}</span>
                  <span style={{ fontSize: 15 }}>{p.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--navy)', lineHeight: 1.3 }}>{p.title}</div>
                    <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                      <span style={{
                        fontSize: 9, fontFamily: 'var(--ff-mono)', letterSpacing: '0.08em',
                        padding: '1px 6px', borderRadius: 3,
                        background: urgencyStyle.bg, border: `1px solid ${urgencyStyle.border}`, color: urgencyStyle.text,
                      }}>{p.urgency}</span>
                      <span style={{
                        fontSize: 9, fontFamily: 'var(--ff-mono)', letterSpacing: '0.08em',
                        padding: '1px 6px', borderRadius: 3,
                        background: 'var(--navy-tint)', border: '1px solid var(--border)', color: 'var(--navy)',
                      }}>{p.sector}</span>
                    </div>
                  </div>
                  <span style={{
                    fontFamily: 'var(--ff-mono)', fontSize: 10, color: 'var(--text-4)',
                    transition: 'transform 0.2s', display: 'inline-block',
                    transform: isOpen ? 'rotate(180deg)' : 'none',
                  }}>▼</span>
                </button>

                {/* Expanded detail */}
                {isOpen && (
                  <div style={{ padding: '0 16px 16px', borderTop: '1px solid var(--border)' }}>
                    <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.7, margin: '12px 0 10px' }}>
                      <strong style={{ color: 'var(--text-1)' }}>Why it matters: </strong>{p.why}
                    </div>
                    <div style={{
                      background: 'var(--surface-2)', borderLeft: `3px solid ${p.color}`,
                      borderRadius: '0 var(--r) var(--r) 0',
                      padding: '10px 14px', marginBottom: 10,
                      fontSize: 13, color: 'var(--text-1)', lineHeight: 1.6,
                    }}>
                      <strong style={{ fontSize: 10, fontFamily: 'var(--ff-mono)', color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>
                        Recommended Action
                      </strong>
                      {p.action}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5 }}>
                        <span style={{ fontSize: 10, fontFamily: 'var(--ff-mono)', color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: 3 }}>Expected Impact</span>
                        {p.impact}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5 }}>
                        <span style={{ fontSize: 10, fontFamily: 'var(--ff-mono)', color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: 3 }}>Estimated Cost</span>
                        <strong style={{ color: p.color }}>{p.cost}</strong>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function Report() {
  const scoreC = scoreColor(GOVERNOR.overallScore)
  const sLabel = scoreLabel(GOVERNOR.overallScore)
  const latestTimeline = TIMELINE.slice(-5).reverse()

  const ongoing   = PROJECTS.filter(p => p.status === 'ongoing').length
  const stalled   = PROJECTS.filter(p => p.status === 'stalled').length
  const completed = PROJECTS.filter(p => p.status === 'completed').length
  const criticalSectors = SECTORS.filter(s => s.status === 'CRITICAL').length

  return (
    <PageShell>
      {/* ── BANNER ── */}
      <div style={{
        background: 'var(--navy)', borderRadius: 'var(--r-lg)',
        padding: '28px 28px 24px', marginBottom: 32,
        boxShadow: 'var(--shadow)',
      }}>
        <div style={{
          fontSize: 10, fontFamily: 'var(--ff-mono)', letterSpacing: '0.14em',
          color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', marginBottom: 10,
        }}>Accountability Report · Bayelsa State, Nigeria</div>

        <div style={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start',
          gap: 24, marginBottom: 20,
        }}>
          {/* Score ring */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <ScoreRing score={GOVERNOR.overallScore} size={120} strokeWidth={10} />
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 26, fontWeight: 700, color: scoreC, lineHeight: 1 }}>
                {GOVERNOR.overallScore}
              </div>
              <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--ff-mono)', letterSpacing: '0.08em' }}>
                OUT OF 100
              </div>
            </div>
          </div>

          {/* Governor details */}
          <div style={{ flex: 1, minWidth: 200 }}>
            <h1 style={{
              fontFamily: 'var(--ff-serif)', fontSize: 24, color: '#fff',
              margin: '0 0 4px', fontWeight: 400,
            }}>{GOVERNOR.name}</h1>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 14 }}>
              {GOVERNOR.title} · {GOVERNOR.state} · {GOVERNOR.party} · Since {GOVERNOR.inauguration}
            </div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#FFF8EC', border: '1px solid #F5C97A',
              borderRadius: 4, padding: '4px 12px',
            }}>
              <span style={{ fontFamily: 'var(--ff-mono)', fontSize: 10, color: '#C97400', letterSpacing: '0.1em' }}>
                OVERALL: {sLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Quick stats row */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: 12,
        }}>
          {[
            { label: 'Years in Office', value: GOVERNOR.yearsInOffice, unit: 'years' },
            { label: 'Promises Tracked', value: GOVERNOR.promisesTracked },
            { label: 'Promises Kept',    value: GOVERNOR.promisesKept, color: '#4ade80' },
            { label: 'Promises Broken',  value: GOVERNOR.promisesBroken, color: '#f87171' },
            { label: 'Critical Sectors', value: criticalSectors, color: '#fca5a5' },
          ].map(item => (
            <div key={item.label} style={{
              background: 'rgba(255,255,255,0.06)', borderRadius: 6, padding: '12px 14px',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{ fontSize: 9, fontFamily: 'var(--ff-mono)', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 5 }}>
                {item.label}
              </div>
              <div style={{ fontFamily: 'var(--ff-serif)', fontStyle: 'italic', fontSize: 24, color: item.color || '#fff', lineHeight: 1 }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ALERTS ── */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontSize: 10, fontFamily: 'var(--ff-mono)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 12 }}>
          Critical Alerts
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {ALERT_ITEMS.map((item, i) => {
            const sev = SEVERITY[item.sev]
            return (
              <div key={i} style={{
                background: sev.bg, border: `1px solid ${sev.border}`,
                borderRadius: 'var(--r)', padding: '10px 14px',
                display: 'flex', gap: 10, alignItems: 'flex-start',
                fontSize: 13, color: sev.text,
              }}>
                <span style={{ flexShrink: 0, fontFamily: 'var(--ff-mono)', fontSize: 10 }}>{sev.icon}</span>
                <span style={{ color: 'var(--text-1)', lineHeight: 1.5 }}>{item.text}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── SECTOR RADAR ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 36 }}>
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--r-lg)', padding: '20px', boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{ fontSize: 10, fontFamily: 'var(--ff-mono)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 4 }}>
            Sector Performance Radar
          </div>
          <div style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={RADAR_DATA} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                <PolarGrid stroke="#E8EBF2" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fontFamily: 'var(--ff-mono)', fill: '#7A8799' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Score" dataKey="score" stroke="#008751" fill="#008751" fillOpacity={0.15} strokeWidth={2} />
                <Tooltip formatter={(v) => [`${v}/100`, 'Score']} contentStyle={{ fontSize: 12 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Project status */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--r-lg)', padding: '20px', boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{ fontSize: 10, fontFamily: 'var(--ff-mono)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 16 }}>
            Projects at a Glance
          </div>
          {[
            { label: 'Ongoing', count: ongoing, color: '#1B4FC4', bg: '#EEF3FC' },
            { label: 'Stalled', count: stalled, color: '#B50000', bg: '#FFF2F2' },
            { label: 'Completed', count: completed, color: '#008751', bg: '#E8F5EE' },
          ].map(item => (
            <div key={item.label} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '12px 16px', marginBottom: 8, borderRadius: 6,
              background: item.bg, border: `1px solid ${item.color}22`,
            }}>
              <span style={{ fontSize: 13, color: 'var(--text-1)', fontWeight: 500 }}>{item.label}</span>
              <span style={{ fontFamily: 'var(--ff-mono)', fontSize: 22, color: item.color, fontWeight: 700 }}>{item.count}</span>
            </div>
          ))}
          <Link to="/projects" style={{
            display: 'block', textAlign: 'center', marginTop: 12,
            color: 'var(--navy)', fontSize: 12, fontFamily: 'var(--ff-mono)',
            letterSpacing: '0.08em', textDecoration: 'none',
            padding: '8px', border: '1px solid var(--border)',
            borderRadius: 4, transition: 'background 0.15s',
          }}>
            VIEW ALL PROJECTS →
          </Link>
        </div>
      </div>

      {/* ── SECTOR SUMMARY GRID ── */}
      <div style={{ marginBottom: 36 }}>
        <SectionHeading label="Sector Performance" title="Scorecard Summary" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
          {SECTORS.map(sector => {
            const sev = SEVERITY[sector.severity] || SEVERITY.amber
            const sc = scoreColor(sector.score)
            return (
              <Link key={sector.id} to="/sectors"
                style={{ textDecoration: 'none' }}>
                <div style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: 'var(--r-lg)', overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'box-shadow 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}
                >
                  <div style={{ height: 3, background: sc }} />
                  <div style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{ fontSize: 16 }}>{sector.icon}</span>
                      <span style={{ fontFamily: 'var(--ff-mono)', fontSize: 20, fontWeight: 700, color: sc }}>{sector.score}</span>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)', marginBottom: 4 }}>{sector.name}</div>
                    <span style={{
                      fontSize: 9, fontFamily: 'var(--ff-mono)', letterSpacing: '0.1em',
                      padding: '2px 6px', borderRadius: 3,
                      background: sev.bg, border: `1px solid ${sev.border}`, color: sev.text,
                    }}>{sev.icon} {sector.status}</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* ── PAGE CARDS ── */}
      <div style={{ marginBottom: 36 }}>
        <SectionHeading label="Deep Dives" title="Explore the Full Data" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {PAGE_CARDS.map(card => (
            <Link key={card.to} to={card.to} style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 'var(--r-lg)', padding: '20px',
                boxShadow: 'var(--shadow-sm)', height: '100%',
                transition: 'box-shadow 0.2s, border-color 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow)'; e.currentTarget.style.borderColor = card.color }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; e.currentTarget.style.borderColor = 'var(--border)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{
                    width: 36, height: 36, background: `${card.color}15`,
                    borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, border: `1px solid ${card.color}30`,
                  }}>{card.icon}</div>
                  <div style={{ fontFamily: 'var(--ff-serif)', fontSize: 16, color: 'var(--navy)', lineHeight: 1.2 }}>
                    {card.title}
                  </div>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6 }}>{card.desc}</div>
                <div style={{
                  marginTop: 12, fontSize: 10, fontFamily: 'var(--ff-mono)',
                  color: card.color, letterSpacing: '0.08em',
                }}>EXPLORE →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── PRIORITIES ── */}
      <PrioritiesSection />

      {/* ── BRIGHT SPOTS + WINS ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 36 }}>
        <div>
          <SectionHeading label="What's Going Right" title="Bright Spots" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {BRIGHT_SPOTS.map((spot, i) => (
              <div key={i} style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 'var(--r)', padding: '12px 14px',
                display: 'flex', gap: 12, alignItems: 'flex-start',
                boxShadow: 'var(--shadow-sm)',
              }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>{spot.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: spot.color || 'var(--navy)', marginBottom: 2 }}>{spot.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5 }}>{spot.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <SectionHeading label="Credit Where Due" title="Administration Wins" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {GOVERNOR_WINS.map((win, i) => (
              <div key={i} style={{
                background: '#E8F5EE', border: '1px solid #8ACBA8',
                borderRadius: 'var(--r)', padding: '12px 14px',
                display: 'flex', gap: 10, alignItems: 'flex-start',
              }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>{win.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#006B41', marginBottom: 2 }}>{win.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5 }}>{win.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TIMELINE PREVIEW ── */}
      <div>
        <SectionHeading label="Key Events" title="Recent Timeline" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {latestTimeline.map((item, i) => {
            const colors = { milestone: '#1B4FC4', promise: '#C97400', failure: '#B50000', event: '#008751' }
            const color = colors[item.type] || '#7A8799'
            return (
              <div key={i} style={{ display: 'flex', gap: 14, paddingBottom: 16 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 14, flexShrink: 0 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: color, flexShrink: 0, marginTop: 3 }} />
                  {i < latestTimeline.length - 1 && <div style={{ flex: 1, width: 1, background: 'var(--border)', marginTop: 4 }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 10, fontFamily: 'var(--ff-mono)', color, letterSpacing: '0.06em', marginBottom: 2 }}>
                    {item.date} · {item.type.toUpperCase()}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-1)', lineHeight: 1.5 }}>{item.label}</div>
                </div>
              </div>
            )
          })}
        </div>
        <Link to="/sectors" style={{
          display: 'inline-block', marginTop: 8,
          fontSize: 11, fontFamily: 'var(--ff-mono)', color: 'var(--navy)',
          letterSpacing: '0.08em', textDecoration: 'none',
          padding: '8px 14px', border: '1px solid var(--border)',
          borderRadius: 4,
        }}>
          SEE ALL SECTORS →
        </Link>
      </div>
    </PageShell>
  )
}
