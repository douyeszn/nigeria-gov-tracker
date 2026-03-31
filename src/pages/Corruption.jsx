import { useState } from 'react'
import { CORRUPTION_CASES } from '../data.js'
import { SectionHeading, PageShell, ShareButton, SEVERITY } from '../components/Shared.jsx'

const STATUS_CONFIG = {
  convicted:    { bg: '#E8F5EE', border: '#8ACBA8', text: '#006B41', label: '✓ CONVICTED' },
  prosecution:  { bg: '#FFF8EC', border: '#F5C97A', text: '#C97400', label: '● PROSECUTION' },
  investigation:{ bg: '#EEF3FC', border: '#A3BCEE', text: '#1B4FC4', label: '◆ INVESTIGATION' },
  systemic:     { bg: '#FFF2F2', border: '#F5AAAA', text: '#B50000', label: '▲ SYSTEMIC' },
}

const FILTER_OPTIONS = [
  { value: 'all',         label: 'All Cases' },
  { value: 'convicted',   label: '✓ Convicted' },
  { value: 'prosecution', label: '● Prosecution' },
  { value: 'investigation', label: '◆ Investigation' },
  { value: 'systemic',    label: '▲ Systemic' },
]

function CaseCard({ cas }) {
  const [expanded, setExpanded] = useState(false)
  const ss = STATUS_CONFIG[cas.status] || STATUS_CONFIG.investigation
  const sev = SEVERITY[cas.severity] || SEVERITY.amber

  return (
    <article style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 'var(--r-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden',
    }}>
      <div style={{ height: 4, background: sev.text }} />
      <div style={{ padding: '18px 20px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, gap: 10 }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontFamily: 'var(--ff-serif)', fontSize: 16, color: 'var(--navy)', margin: '0 0 4px', lineHeight: 1.2 }}>
              {cas.governor}
            </h3>
            <div style={{ fontSize: 11, color: 'var(--text-3)' }}>Term: {cas.term}</div>
          </div>
          <span style={{
            fontSize: 9, fontFamily: 'var(--ff-mono)', letterSpacing: '0.09em',
            padding: '3px 8px', borderRadius: 3, flexShrink: 0, whiteSpace: 'nowrap',
            background: ss.bg, border: `1px solid ${ss.border}`, color: ss.text,
          }}>{ss.label}</span>
        </div>

        {/* Amount */}
        <div style={{
          background: sev.bg, border: `1px solid ${sev.border}`,
          borderRadius: 'var(--r)', padding: '10px 14px', marginBottom: 12,
        }}>
          <div style={{ fontSize: 9, fontFamily: 'var(--ff-mono)', color: sev.text, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
            Amount at Issue
          </div>
          <div style={{ fontFamily: 'var(--ff-serif)', fontStyle: 'italic', fontSize: 18, color: sev.text }}>
            {cas.amount}
          </div>
        </div>

        {/* Agency & Charge */}
        <div style={{ fontSize: 12, marginBottom: 8 }}>
          <span style={{ color: 'var(--text-3)' }}>Agency: </span>
          <strong style={{ color: 'var(--text-1)' }}>{cas.agency}</strong>
        </div>
        <div style={{ fontSize: 12, marginBottom: 12, color: 'var(--text-2)', lineHeight: 1.5 }}>
          <span style={{ color: 'var(--text-3)' }}>Charge: </span>
          {cas.charge}
        </div>

        {/* Outcome summary */}
        <div style={{
          background: 'var(--surface-2)', borderRadius: 'var(--r)',
          padding: '10px 12px', marginBottom: 12, fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6,
        }}>
          <strong style={{ color: 'var(--text-1)' }}>Outcome: </strong>
          {cas.outcome}
        </div>

        {/* Toggle detail */}
        <button onClick={() => setExpanded(e => !e)}
          aria-expanded={expanded}
          style={{
            background: 'var(--surface-2)', border: '1px solid var(--border)',
            borderRadius: 4, padding: '6px 12px', cursor: 'pointer', width: '100%',
            fontSize: 11, fontFamily: 'var(--ff-mono)', color: 'var(--text-2)', letterSpacing: '0.06em',
          }}>
          {expanded ? '▲ HIDE DETAIL' : '▼ FULL DETAIL'}
        </button>

        {expanded && (
          <div style={{ marginTop: 12 }}>
            <div style={{
              background: 'var(--surface-2)', borderRadius: 'var(--r)',
              padding: '12px 14px', fontSize: 12, color: 'var(--text-1)', lineHeight: 1.7,
              marginBottom: 10,
            }}>
              {cas.detail}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 10, color: 'var(--text-4)', fontFamily: 'var(--ff-mono)' }}>
                Source: {cas.source}
              </span>
              <ShareButton label={`Corruption case: ${cas.governor}`} />
            </div>
          </div>
        )}
      </div>
    </article>
  )
}

export default function Corruption() {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all'
    ? CORRUPTION_CASES
    : CORRUPTION_CASES.filter(c => c.status === filter)

  const totalAmount = '$55M+ · ₦8.77B+ documented · ₦45B unspent FY2024 · ₦1.5T NDDC'

  return (
    <PageShell>
      <SectionHeading
        label="Accountability · Bayelsa State"
        title="Corruption Tracker"
      >
        Documented corruption cases across Bayelsa administrations — from EFCC prosecutions
        to systemic budget failures. Data sourced from EFCC, ICPC, BudgIT, and court records.
      </SectionHeading>

      {/* Warning banner */}
      <div style={{
        background: 'var(--navy)', borderRadius: 'var(--r-lg)',
        padding: '20px 24px', marginBottom: 28, boxShadow: 'var(--shadow)',
      }}>
        <div style={{ fontSize: 10, fontFamily: 'var(--ff-mono)', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
          Scale of Documented Corruption
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 14 }}>
          {[
            { label: 'Cases Tracked', value: CORRUPTION_CASES.length, color: '#fff' },
            { label: 'Governors Implicated', value: '4', color: '#f87171' },
            { label: 'Agencies Involved', value: 'EFCC, ICPC, NASS', color: '#fbbf24' },
            { label: 'FY2024 Unspent', value: '₦45B+', color: '#fca5a5' },
          ].map(s => (
            <div key={s.label} style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 6, padding: '12px 14px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: 9, fontFamily: 'var(--ff-mono)', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontFamily: 'var(--ff-serif)', fontStyle: 'italic', fontSize: 20, color: s.color, lineHeight: 1 }}>{s.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ICPC Alert */}
      <div style={{
        background: '#FFF2F2', border: '1px solid #F5AAAA',
        borderRadius: 'var(--r)', padding: '14px 18px', marginBottom: 24,
        display: 'flex', gap: 10, alignItems: 'flex-start',
      }}>
        <span style={{ fontSize: 18, flexShrink: 0 }}>⚠</span>
        <div>
          <strong style={{ color: '#B50000', fontSize: 13 }}>Current Administration Alert — Diri (2020–present)</strong>
          <p style={{ margin: '6px 0 0', fontSize: 12, color: 'var(--text-1)', lineHeight: 1.6 }}>
            In April 2022, the Diri administration went to Federal High Court to <strong>block ICPC from accessing
            Bayelsa's financial records</strong>. The court dismissed the challenge and ruled in favour of ICPC.
            The attempted obstruction itself is a serious accountability red flag — independent of whether
            the underlying investigation finds wrongdoing.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {FILTER_OPTIONS.map(opt => (
          <button key={opt.value} onClick={() => setFilter(opt.value)}
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

      {/* Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
        {filtered.map(cas => (
          <CaseCard key={cas.id} cas={cas} />
        ))}
      </div>

      {/* Disclaimer */}
      <div style={{
        marginTop: 32, padding: '14px 16px',
        background: 'var(--surface-2)', border: '1px solid var(--border)',
        borderRadius: 'var(--r)', fontSize: 11, color: 'var(--text-3)', lineHeight: 1.7,
      }}>
        <strong style={{ color: 'var(--text-2)' }}>Note on sources:</strong>{' '}
        All cases are drawn from public records — EFCC press releases, court filings,
        National Assembly committee reports, BudgIT budget analysis, and credible journalism
        (Premium Times, Vanguard, Sahara Reporters). Cases marked "prosecution" or "investigation"
        are ongoing legal proceedings; individuals are presumed innocent until convicted.
        Systemic entries represent documented fiscal failures, not criminal allegations against individuals.
      </div>
    </PageShell>
  )
}
