import { useState } from 'react'
import { PROJECTS } from '../data.js'
import { SectionHeading, PageShell, ShareButton } from '../components/Shared.jsx'

const STATUS_STYLES = {
  ongoing:   { bg: '#EEF3FC', border: '#A3BCEE', text: '#1B4FC4', label: 'ONGOING' },
  stalled:   { bg: '#FFF2F2', border: '#F5AAAA', text: '#B50000', label: '⚠ STALLED' },
  completed: { bg: '#E8F5EE', border: '#8ACBA8', text: '#006B41', label: '✓ COMPLETED' },
}

function MilestoneTimeline({ milestones }) {
  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ fontSize: 10, fontFamily: 'var(--ff-mono)', color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
        Milestones
      </div>
      {milestones.map((m, i) => (
        <div key={i} style={{ display: 'flex', gap: 10, paddingBottom: 10, alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 12, flexShrink: 0 }}>
            <div style={{
              width: 9, height: 9, borderRadius: '50%', marginTop: 3, flexShrink: 0,
              background: m.done ? '#008751' : '#D9DEE8',
              border: m.done ? '2px solid #006B41' : '2px solid #C0CAD8',
            }} />
            {i < milestones.length - 1 && <div style={{ flex: 1, width: 1, background: 'var(--border)', marginTop: 2 }} />}
          </div>
          <div style={{ flex: 1 }}>
            <span style={{
              fontSize: 10, fontFamily: 'var(--ff-mono)', letterSpacing: '0.04em',
              color: m.done ? '#008751' : 'var(--text-3)',
            }}>{m.date} — </span>
            <span style={{ fontSize: 12, color: m.done ? 'var(--text-1)' : 'var(--text-3)' }}>{m.label}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false)
  const ss = STATUS_STYLES[project.status]

  return (
    <article style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 'var(--r-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden',
    }}>
      {/* Completion bar at top */}
      <div style={{ height: 4, background: '#E8EBF2', position: 'relative' }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, height: '100%',
          width: `${project.completion}%`,
          background: project.status === 'stalled' ? '#B50000' : project.status === 'completed' ? '#008751' : '#1B4FC4',
        }} />
      </div>

      <div style={{ padding: '18px 20px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, gap: 10 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', flex: 1 }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>{project.icon}</span>
            <div>
              <h3 style={{ fontFamily: 'var(--ff-serif)', fontSize: 16, color: 'var(--navy)', margin: '0 0 3px', lineHeight: 1.2 }}>
                {project.name}
              </h3>
              <div style={{ fontSize: 11, color: 'var(--text-3)' }}>📍 {project.location}</div>
            </div>
          </div>
          <span style={{
            fontSize: 9, fontFamily: 'var(--ff-mono)', letterSpacing: '0.1em',
            padding: '3px 8px', borderRadius: 3, flexShrink: 0,
            background: ss.bg, border: `1px solid ${ss.border}`, color: ss.text,
          }}>{ss.label}</span>
        </div>

        {/* Completion */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{ flex: 1, height: 5, background: '#E8EBF2', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{
              height: '100%', width: `${project.completion}%`,
              background: project.status === 'stalled' ? '#B50000' : project.status === 'completed' ? '#008751' : '#1B4FC4',
              borderRadius: 3,
            }} />
          </div>
          <span style={{ fontFamily: 'var(--ff-mono)', fontSize: 12, fontWeight: 600, color: 'var(--text-1)', flexShrink: 0 }}>
            {project.completion}%
          </span>
        </div>

        {/* Meta row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12, fontSize: 11 }}>
          <div><span style={{ color: 'var(--text-3)' }}>Budget: </span><strong>{project.budget}</strong></div>
          <div><span style={{ color: 'var(--text-3)' }}>Sector: </span><strong>{project.sector}</strong></div>
          <div><span style={{ color: 'var(--text-3)' }}>Started: </span><strong>{project.startDate}</strong></div>
          <div>
            <span style={{ color: 'var(--text-3)' }}>Target: </span>
            <strong style={{ color: project.revisedDate === 'STALLED' ? '#B50000' : 'inherit' }}>
              {project.revisedDate !== project.targetDate ? project.revisedDate : project.targetDate}
            </strong>
          </div>
        </div>

        {/* Contractor */}
        <div style={{ fontSize: 11, color: 'var(--text-2)', marginBottom: 12 }}>
          <span style={{ color: 'var(--text-3)' }}>Contractor: </span>
          <span style={{ color: project.contractor === 'DISPUTED' ? '#B50000' : 'var(--text-1)', fontWeight: 500 }}>
            {project.contractor}
          </span>
        </div>

        {/* Toggle details */}
        <button onClick={() => setExpanded(e => !e)}
          aria-expanded={expanded}
          style={{
            background: 'var(--surface-2)', border: '1px solid var(--border)',
            borderRadius: 4, padding: '6px 12px', cursor: 'pointer', width: '100%',
            fontSize: 11, fontFamily: 'var(--ff-mono)', color: 'var(--text-2)',
            letterSpacing: '0.06em', marginBottom: expanded ? 0 : 0,
          }}>
          {expanded ? '▲ HIDE DETAILS' : '▼ SHOW DETAILS & MILESTONES'}
        </button>

        {expanded && (
          <div style={{ marginTop: 14 }}>
            <div style={{
              background: 'var(--surface-2)', borderRadius: 'var(--r)',
              padding: '12px 14px', marginBottom: 12,
              fontSize: 12, color: 'var(--text-2)', lineHeight: 1.7,
            }}>
              {project.description}
            </div>
            <MilestoneTimeline milestones={project.milestones} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
              <span style={{ fontSize: 10, color: 'var(--text-4)', fontFamily: 'var(--ff-mono)' }}>
                Source: {project.source}
              </span>
              <ShareButton label={project.name} />
            </div>
          </div>
        )}
      </div>
    </article>
  )
}

const FILTERS = [
  { value: 'all',       label: 'All Projects' },
  { value: 'ongoing',   label: 'Ongoing' },
  { value: 'stalled',   label: '⚠ Stalled' },
  { value: 'completed', label: '✓ Completed' },
]

export default function Projects() {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.status === filter)

  const ongoing   = PROJECTS.filter(p => p.status === 'ongoing').length
  const stalled   = PROJECTS.filter(p => p.status === 'stalled').length
  const completed = PROJECTS.filter(p => p.status === 'completed').length
  const totalBudget = '₦270B+'

  return (
    <PageShell>
      <SectionHeading
        label="Infrastructure Accountability"
        title="Projects Tracker"
      >
        {PROJECTS.length} major projects tracked — from groundbreakings to commissioning.
        Milestone data sourced from Bayelsa State Govt, BudgIT, and independent reporting.
      </SectionHeading>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Total Projects', value: PROJECTS.length, color: 'var(--navy)' },
          { label: 'Ongoing',        value: ongoing,   color: '#1B4FC4' },
          { label: 'Stalled',        value: stalled,   color: '#B50000' },
          { label: 'Completed',      value: completed, color: '#008751' },
          { label: 'Total Budget',   value: totalBudget, color: 'var(--navy)' },
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

      {/* Stalled warning */}
      {stalled > 0 && (
        <div style={{
          background: '#FFF2F2', border: '1px solid #F5AAAA',
          borderRadius: 'var(--r)', padding: '12px 16px', marginBottom: 24,
          fontSize: 13, color: '#B50000',
        }}>
          <strong>▲ {stalled} project{stalled > 1 ? 's' : ''} stalled</strong>
          {' — '}representing significant public expenditure with no delivery.
          The Bayelsa Power Company (₦8B+ consumed) has been stalled since August 2022.
        </div>
      )}

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {FILTERS.map(opt => (
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
        {filtered.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-3)', fontSize: 14 }}>
          No projects in this category.
        </div>
      )}
    </PageShell>
  )
}
