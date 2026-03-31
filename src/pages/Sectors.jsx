import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SECTORS } from '../data.js'
import { ProgressBar, ShareButton, SectionHeading, PageShell, scoreColor, scoreLabel, SEVERITY } from '../components/Shared.jsx'

function SectorCard({ sector }) {
  const execRate = Math.round((sector.budgetSpent / sector.budgetAllocated) * 100)
  const gapBn    = (sector.budgetAllocated - sector.budgetSpent).toFixed(1)
  const sev      = SEVERITY[sector.severity] || SEVERITY.amber
  const scoreC   = scoreColor(sector.score)

  return (
    <article id={sector.id} aria-label={`${sector.name} sector`}
      style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 'var(--r-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden',
      }}>
      <div style={{ height: 4, background: scoreC }} aria-hidden="true" />
      <div style={{ padding: '20px 22px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 20 }} aria-hidden="true">{sector.icon}</span>
            <h3 style={{ fontFamily: 'var(--ff-serif)', fontSize: 17, color: 'var(--navy)', margin: 0, lineHeight: 1.2 }}>
              {sector.name}
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
            <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 26, fontWeight: 600, color: scoreC, lineHeight: 1 }}>
              {sector.score}<span style={{ fontSize: 12, color: 'var(--text-4)', fontWeight: 400 }}>/100</span>
            </div>
            <span style={{
              fontSize: 9, fontFamily: 'var(--ff-mono)', letterSpacing: '0.1em',
              padding: '2px 7px', borderRadius: 3, textTransform: 'uppercase',
              background: sev.bg, border: `1px solid ${sev.border}`, color: sev.text,
            }}>
              {sev.icon} {sector.status}
            </span>
          </div>
        </div>

        {/* Headline stat */}
        <div style={{
          background: 'var(--surface-2)', borderRadius: 'var(--r)',
          padding: '12px 14px', marginBottom: 16,
          borderLeft: `3px solid ${scoreC}`,
        }}>
          <div style={{ fontFamily: 'var(--ff-serif)', fontStyle: 'italic', fontSize: 22, color: scoreC, lineHeight: 1 }}>
            {sector.headline}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {sector.headlineLabel}
          </div>
        </div>

        {/* Metrics */}
        <div style={{ marginBottom: 16 }}>
          {sector.metrics.map((m, i) => (
            <ProgressBar key={i} label={m.label} value={m.value} target={m.target} progress={m.progress} />
          ))}
        </div>

        {/* Budget execution */}
        <div style={{
          background: 'var(--surface-2)', borderRadius: 'var(--r)',
          padding: '10px 14px', border: '1px solid var(--border)', marginBottom: 14,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 11 }}>
            <span style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              FY2024 Budget Execution
            </span>
            <span style={{ fontFamily: 'var(--ff-mono)', fontWeight: 600, color: execRate < 65 ? '#B50000' : '#C97400' }}>
              {execRate}%
            </span>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ flex: 1, height: 4, background: '#E8EBF2', borderRadius: 2, overflow: 'hidden' }}
              role="progressbar" aria-valuenow={execRate} aria-valuemin={0} aria-valuemax={100}
              aria-label={`Budget execution: ${execRate}%`}>
              <div style={{
                height: '100%', width: `${execRate}%`, borderRadius: 2,
                background: execRate < 65 ? '#B50000' : '#C97400',
              }} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 11 }}>
            <span style={{ color: 'var(--text-3)' }}>Spent: <strong style={{ color: 'var(--text-1)' }}>₦{sector.budgetSpent}B</strong></span>
            <span style={{ color: '#B50000', fontFamily: 'var(--ff-mono)' }}>₦{gapBn}B unspent</span>
          </div>
        </div>

        {/* Key failure */}
        <div style={{
          background: '#FFF2F2', border: '1px solid #F5AAAA',
          borderRadius: 'var(--r)', padding: '10px 14px', marginBottom: 14,
          fontSize: 12, color: 'var(--text-1)', lineHeight: 1.6,
        }}>
          <strong style={{ color: '#B50000', fontSize: 11, fontFamily: 'var(--ff-mono)', letterSpacing: '0.06em' }}>
            ▲ KEY FAILURE:{' '}
          </strong>
          {sector.keyFailure}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 10, color: 'var(--text-4)', fontFamily: 'var(--ff-mono)' }}>
            Source: {sector.source}
          </span>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <ShareButton label={sector.name} text={`Bayelsa ${sector.name}: score ${sector.score}/100 — ${sector.keyFailure}`} />
            <Link to={`/sectors/${sector.id}`} style={{
              fontSize: 11, fontFamily: 'var(--ff-mono)', color: 'var(--navy)',
              textDecoration: 'none', padding: '4px 10px',
              border: '1px solid var(--navy)', borderRadius: 4,
              whiteSpace: 'nowrap',
            }}>
              Full Report →
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

const FILTER_OPTIONS = [
  { value: 'all',      label: 'All Sectors' },
  { value: 'CRITICAL', label: 'Critical Only' },
  { value: 'POOR',     label: 'Poor Only' },
]

export default function Sectors() {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all'
    ? SECTORS
    : SECTORS.filter(s => s.status === filter)

  const avgScore = Math.round(SECTORS.reduce((a, s) => a + s.score, 0) / SECTORS.length)
  const totalGap = SECTORS.reduce((a, s) => a + (s.budgetAllocated - s.budgetSpent), 0).toFixed(1)
  const criticalCount = SECTORS.filter(s => s.status === 'CRITICAL').length

  return (
    <PageShell>
      <SectionHeading
        label="Accountability · Bayelsa State"
        title="Sector Scorecards"
      >
        Performance across all 8 sectors tracked in the {new Date().getFullYear()} accountability cycle.
        Scores are composite indices based on target vs. actual delivery, budget execution, and outcome metrics.
      </SectionHeading>

      {/* Summary stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Sectors Tracked', value: SECTORS.length, color: 'var(--navy)' },
          { label: 'Critical', value: criticalCount, color: '#B50000' },
          { label: 'Average Score', value: `${avgScore}/100`, color: scoreColor(avgScore) },
          { label: 'Budget Gap FY2024', value: `₦${totalGap}B`, color: '#B50000' },
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

      {/* Filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {FILTER_OPTIONS.map(opt => (
          <button key={opt.value}
            onClick={() => setFilter(opt.value)}
            aria-pressed={filter === opt.value}
            style={{
              padding: '6px 14px', border: '1px solid',
              borderColor: filter === opt.value ? 'var(--navy)' : 'var(--border)',
              borderRadius: 4, cursor: 'pointer', fontSize: 12,
              fontFamily: 'var(--ff-sans)',
              background: filter === opt.value ? 'var(--navy)' : 'var(--surface)',
              color: filter === opt.value ? '#fff' : 'var(--text-2)',
            }}>
            {opt.label}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
        {filtered.map(sector => (
          <SectorCard key={sector.id} sector={sector} />
        ))}
      </div>
    </PageShell>
  )
}
