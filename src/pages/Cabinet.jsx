import { useState } from 'react'
import { OFFICIALS } from '../data.js'
import { SectionHeading, PageShell, scoreColor, SEVERITY } from '../components/Shared.jsx'

const FIT_CONFIG = {
  QUALIFIED:   { bg: '#E8F5EE', border: '#8ACBA8', text: '#006B41', icon: '✓' },
  PARTIAL:     { bg: '#FFF8EC', border: '#F5C97A', text: '#C97400', icon: '●' },
  UNQUALIFIED: { bg: '#FFF2F2', border: '#F5AAAA', text: '#B50000', icon: '▲' },
}

const PORTFOLIO_ICONS = {
  'Administration': '🏛', 'Finance': '💰', 'Justice': '⚖',
  'Infrastructure': '🏗', 'Health': '🏥', 'Education': '📚',
  'Environment': '🌿', 'Agriculture': '🌾', 'Information': '📡',
  'Executive Office': '🗂', 'Economy': '📊', 'Electricity': '⚡',
}

function FitMeter({ score }) {
  const color = scoreColor(score)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ flex: 1, height: 6, background: '#E8EBF2', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${score}%`, background: color, borderRadius: 3,
          transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)',
        }} />
      </div>
      <span style={{ fontFamily: 'var(--ff-mono)', fontSize: 13, fontWeight: 700, color, flexShrink: 0 }}>
        {score}
      </span>
    </div>
  )
}

function OfficialCard({ official }) {
  const [expanded, setExpanded] = useState(false)
  const fit = FIT_CONFIG[official.fitLabel] || FIT_CONFIG.PARTIAL
  const scoreC = scoreColor(official.fitScore)

  return (
    <article style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 'var(--r-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)',
    }}>
      <div style={{ height: 4, background: scoreC }} />
      <div style={{ padding: '18px 20px' }}>

        {/* Header */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 14 }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: `${scoreC}18`, border: `2px solid ${scoreC}40`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, flexShrink: 0,
          }}>{official.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 4 }}>
              <h3 style={{ fontFamily: 'var(--ff-serif)', fontSize: 17, color: 'var(--navy)', margin: 0, lineHeight: 1.2 }}>
                {official.name}
              </h3>
              <span style={{
                fontSize: 9, fontFamily: 'var(--ff-mono)', letterSpacing: '0.09em',
                padding: '3px 8px', borderRadius: 3, flexShrink: 0,
                background: fit.bg, border: `1px solid ${fit.border}`, color: fit.text,
              }}>{fit.icon} {official.fitLabel}</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 3 }}>{official.position}</div>
          </div>
        </div>

        {/* Fit score meter */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 10, fontFamily: 'var(--ff-mono)', color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
            Fit-for-Role Score
          </div>
          <FitMeter score={official.fitScore} />
        </div>

        {/* Education & background summary */}
        <div style={{
          background: 'var(--surface-2)', borderRadius: 'var(--r)',
          padding: '10px 14px', marginBottom: 12, fontSize: 12,
          borderLeft: `3px solid ${scoreC}`,
        }}>
          <div style={{ fontSize: 10, fontFamily: 'var(--ff-mono)', color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>
            Credentials
          </div>
          <div style={{ color: 'var(--text-1)', lineHeight: 1.6 }}>{official.education}</div>
        </div>

        {/* Concerns summary */}
        {official.concerns.length > 0 && (
          <div style={{
            background: '#FFF2F2', border: '1px solid #F5AAAA',
            borderRadius: 'var(--r)', padding: '10px 14px', marginBottom: 12,
            fontSize: 12, color: 'var(--text-1)', lineHeight: 1.6,
          }}>
            <strong style={{ color: '#B50000', fontSize: 10, fontFamily: 'var(--ff-mono)', letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
              ▲ Concerns ({official.concerns.length})
            </strong>
            <ul style={{ margin: 0, paddingLeft: 16 }}>
              {official.concerns.slice(0, expanded ? official.concerns.length : 2).map((c, i) => (
                <li key={i} style={{ marginBottom: 3 }}>{c}</li>
              ))}
              {!expanded && official.concerns.length > 2 && (
                <li style={{ color: 'var(--text-3)', listStyle: 'none', marginLeft: -16 }}>+{official.concerns.length - 2} more…</li>
              )}
            </ul>
          </div>
        )}

        {/* Toggle */}
        <button onClick={() => setExpanded(e => !e)}
          aria-expanded={expanded}
          style={{
            background: 'var(--surface-2)', border: '1px solid var(--border)',
            borderRadius: 4, padding: '6px 12px', cursor: 'pointer', width: '100%',
            fontSize: 11, fontFamily: 'var(--ff-mono)', color: 'var(--text-2)', letterSpacing: '0.06em',
          }}>
          {expanded ? '▲ LESS' : '▼ FULL PROFILE'}
        </button>

        {expanded && (
          <div style={{ marginTop: 14 }}>
            {/* Background */}
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 10, fontFamily: 'var(--ff-mono)', color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
                Background
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.7 }}>{official.background}</div>
            </div>

            {/* Required profile */}
            <div style={{
              background: '#EEF3FC', border: '1px solid #A3BCEE',
              borderRadius: 'var(--r)', padding: '10px 14px', marginBottom: 12,
              fontSize: 12, color: 'var(--text-1)', lineHeight: 1.6,
            }}>
              <strong style={{ color: '#1B4FC4', fontSize: 10, fontFamily: 'var(--ff-mono)', letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>
                ◆ Required Profile
              </strong>
              {official.requiredProfile}
            </div>

            {/* Strengths */}
            {official.strengths.length > 0 && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 10, fontFamily: 'var(--ff-mono)', color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
                  Strengths
                </div>
                {official.strengths.map((s, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: 8, fontSize: 12, color: 'var(--text-2)',
                    marginBottom: 4, lineHeight: 1.5,
                  }}>
                    <span style={{ color: '#008751', flexShrink: 0 }}>✓</span>
                    {s}
                  </div>
                ))}
              </div>
            )}

            {/* All concerns */}
            {official.concerns.length > 0 && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 10, fontFamily: 'var(--ff-mono)', color: '#B50000', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
                  All Concerns
                </div>
                {official.concerns.map((c, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: 8, fontSize: 12, color: 'var(--text-2)',
                    marginBottom: 4, lineHeight: 1.5,
                  }}>
                    <span style={{ color: '#B50000', flexShrink: 0 }}>▲</span>
                    {c}
                  </div>
                ))}
              </div>
            )}

            {/* Verification */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, fontSize: 10,
              fontFamily: 'var(--ff-mono)', color: 'var(--text-4)',
            }}>
              <span style={{
                padding: '2px 7px', borderRadius: 3,
                background: official.verified ? '#E8F5EE' : '#FFF8EC',
                border: `1px solid ${official.verified ? '#8ACBA8' : '#F5C97A'}`,
                color: official.verified ? '#006B41' : '#C97400',
              }}>
                {official.verified ? '✓ VERIFIED' : '⚠ UNVERIFIED'}
              </span>
              <span>Source: {official.source}</span>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}

const FILTERS = [
  { value: 'all',         label: 'All Officials' },
  { value: 'QUALIFIED',   label: '✓ Qualified' },
  { value: 'PARTIAL',     label: '● Partial Fit' },
  { value: 'UNQUALIFIED', label: '▲ Unqualified' },
]

export default function Cabinet() {
  const [filter, setFilter] = useState('all')
  const [portfolioFilter, setPortfolioFilter] = useState('all')

  const portfolios = ['all', ...new Set(OFFICIALS.map(o => o.portfolio))]

  const filtered = OFFICIALS.filter(o => {
    if (filter !== 'all' && o.fitLabel !== filter) return false
    if (portfolioFilter !== 'all' && o.portfolio !== portfolioFilter) return false
    return true
  })

  const qualified   = OFFICIALS.filter(o => o.fitLabel === 'QUALIFIED').length
  const partial     = OFFICIALS.filter(o => o.fitLabel === 'PARTIAL').length
  const unqualified = OFFICIALS.filter(o => o.fitLabel === 'UNQUALIFIED').length
  const avgFit      = Math.round(OFFICIALS.reduce((a, o) => a + o.fitScore, 0) / OFFICIALS.length)
  const unverified  = OFFICIALS.filter(o => !o.verified).length

  return (
    <PageShell>
      <SectionHeading
        label="Cabinet Accountability"
        title="Are the Right People in the Right Seats?"
      >
        Commissioners and senior officials assessed against the professional requirements
        of their roles. Fit scores reflect published credentials vs. what the job demands —
        not political loyalty, ethnicity, or seniority.
      </SectionHeading>

      {/* Disclaimer */}
      <div style={{
        background: '#FFF8EC', border: '1px solid #F5C97A',
        borderRadius: 'var(--r)', padding: '12px 16px', marginBottom: 24,
        fontSize: 12, color: 'var(--text-1)', lineHeight: 1.6,
      }}>
        <strong style={{ color: '#C97400' }}>⚠ Data note:</strong>{' '}
        {unverified} of {OFFICIALS.length} officials are marked <em>unverified</em> — credentials sourced from
        publicly available information only. We call on the Bayelsa State Government to publish
        full CVs and academic qualifications for all commissioners and senior officials as a
        basic transparency requirement.
      </div>

      {/* Summary stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Officials Tracked', value: OFFICIALS.length, color: 'var(--navy)' },
          { label: 'Qualified',          value: qualified,   color: '#008751' },
          { label: 'Partial Fit',        value: partial,     color: '#C97400' },
          { label: 'Unqualified',        value: unqualified, color: '#B50000' },
          { label: 'Avg. Fit Score',     value: `${avgFit}/100`, color: scoreColor(avgFit) },
        ].map(s => (
          <div key={s.label} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 'var(--r-lg)', padding: '14px 16px', boxShadow: 'var(--shadow-sm)',
          }}>
            <div style={{ fontSize: 9, fontFamily: 'var(--ff-mono)', color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontFamily: 'var(--ff-serif)', fontStyle: 'italic', fontSize: 22, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Fit filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        {FILTERS.map(opt => (
          <button key={opt.value} onClick={() => setFilter(opt.value)}
            aria-pressed={filter === opt.value}
            style={{
              padding: '6px 14px', border: '1px solid',
              borderColor: filter === opt.value ? 'var(--navy)' : 'var(--border)',
              borderRadius: 4, cursor: 'pointer', fontSize: 12, fontFamily: 'var(--ff-sans)',
              background: filter === opt.value ? 'var(--navy)' : 'var(--surface)',
              color: filter === opt.value ? '#fff' : 'var(--text-2)',
            }}>{opt.label}</button>
        ))}
      </div>

      {/* Portfolio filter */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 24, flexWrap: 'wrap' }}>
        {portfolios.map(p => (
          <button key={p} onClick={() => setPortfolioFilter(p)}
            aria-pressed={portfolioFilter === p}
            style={{
              padding: '4px 10px', border: '1px solid',
              borderColor: portfolioFilter === p ? 'var(--navy)' : 'var(--border)',
              borderRadius: 4, cursor: 'pointer', fontSize: 11, fontFamily: 'var(--ff-mono)',
              background: portfolioFilter === p ? 'var(--navy)' : 'var(--surface)',
              color: portfolioFilter === p ? '#fff' : 'var(--text-2)',
            }}>
            {p === 'all' ? 'All Portfolios' : `${PORTFOLIO_ICONS[p] || ''} ${p}`}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
        {filtered.map(official => (
          <OfficialCard key={official.id} official={official} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-3)', fontSize: 14 }}>
          No officials match your current filters.
        </div>
      )}
    </PageShell>
  )
}
