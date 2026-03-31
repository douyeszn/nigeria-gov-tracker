import { useState } from 'react'
import { RESEARCH_PAPERS } from '../data.js'
import { SectionHeading, PageShell, ShareButton } from '../components/Shared.jsx'

const RELEVANCE_CONFIG = {
  critical: { bg: '#FFF2F2', border: '#F5AAAA', text: '#B50000', label: '▲ CRITICAL' },
  high:     { bg: '#FFF8EC', border: '#F5C97A', text: '#C97400', label: '● HIGH' },
  medium:   { bg: '#EEF3FC', border: '#A3BCEE', text: '#1B4FC4', label: '◆ MEDIUM' },
}

const TYPE_COLORS = {
  'Government Commission Report': '#008751',
  'Academic Thesis':              '#1B4FC4',
  'Peer-Reviewed Journal Article':'#6B3FA0',
  'Academic Paper':               '#C97400',
}

const ALL_TAGS = [...new Set(RESEARCH_PAPERS.flatMap(p => p.tags))]

function PaperCard({ paper }) {
  const rel = RELEVANCE_CONFIG[paper.relevance] || RELEVANCE_CONFIG.medium
  const typeColor = TYPE_COLORS[paper.type] || '#7A8799'

  return (
    <article style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 'var(--r-lg)', padding: '20px', boxShadow: 'var(--shadow-sm)',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Type + Year row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, flexWrap: 'wrap', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            fontSize: 9, fontFamily: 'var(--ff-mono)', letterSpacing: '0.09em',
            padding: '2px 7px', borderRadius: 3, textTransform: 'uppercase',
            background: `${typeColor}15`, border: `1px solid ${typeColor}30`, color: typeColor,
          }}>{paper.type}</span>
          <span style={{ fontFamily: 'var(--ff-mono)', fontSize: 11, color: 'var(--text-3)' }}>{paper.year}</span>
        </div>
        <span style={{
          fontSize: 9, fontFamily: 'var(--ff-mono)', letterSpacing: '0.09em',
          padding: '2px 7px', borderRadius: 3,
          background: rel.bg, border: `1px solid ${rel.border}`, color: rel.text,
        }}>{rel.label}</span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'var(--ff-serif)', fontSize: 16, color: 'var(--navy)',
        margin: '0 0 8px', lineHeight: 1.35, flex: 1,
      }}>
        {paper.title}
      </h3>

      {/* Authors */}
      <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 12, fontStyle: 'italic' }}>
        {paper.authors}
      </div>

      {/* Summary */}
      <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.7, marginBottom: 14 }}>
        {paper.summary}
      </div>

      {/* Key finding */}
      <div style={{
        background: 'var(--surface-2)', borderLeft: '3px solid var(--navy)',
        borderRadius: '0 var(--r) var(--r) 0', padding: '10px 14px',
        marginBottom: 14, fontSize: 12, color: 'var(--text-1)', lineHeight: 1.6,
      }}>
        <strong style={{ fontSize: 10, fontFamily: 'var(--ff-mono)', color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>
          Key Finding
        </strong>
        {paper.keyFinding}
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
        {paper.tags.map(tag => (
          <span key={tag} style={{
            fontSize: 10, fontFamily: 'var(--ff-mono)', letterSpacing: '0.06em',
            padding: '2px 8px', borderRadius: 3,
            background: 'var(--navy-tint)', color: 'var(--navy)',
            border: '1px solid var(--border)',
          }}>{tag}</span>
        ))}
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: 4 }}>
        <a href={paper.url} target="_blank" rel="noopener noreferrer"
          style={{
            fontSize: 11, fontFamily: 'var(--ff-mono)', color: '#1B4FC4',
            letterSpacing: '0.06em', textDecoration: 'none',
            padding: '6px 12px', border: '1px solid #A3BCEE',
            borderRadius: 4, background: '#EEF3FC',
          }}>
          READ PAPER ↗
        </a>
        <ShareButton label={paper.title} text={`Research: "${paper.title}" — Key finding: ${paper.keyFinding}`} />
      </div>
    </article>
  )
}

export default function Research() {
  const [tagFilter, setTagFilter] = useState(null)
  const [relevanceFilter, setRelevanceFilter] = useState('all')

  const filtered = RESEARCH_PAPERS.filter(p => {
    if (tagFilter && !p.tags.includes(tagFilter)) return false
    if (relevanceFilter !== 'all' && p.relevance !== relevanceFilter) return false
    return true
  })

  const criticalCount = RESEARCH_PAPERS.filter(p => p.relevance === 'critical').length

  return (
    <PageShell>
      <SectionHeading
        label="Academic & Policy Research"
        title="Research Papers"
      >
        Peer-reviewed studies, government commissions, and academic theses documenting
        Bayelsa's governance, environment, and oil justice challenges.
        All papers are publicly accessible — links go to primary sources.
      </SectionHeading>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Papers Indexed', value: RESEARCH_PAPERS.length, color: 'var(--navy)' },
          { label: 'Critical Relevance', value: criticalCount, color: '#B50000' },
          { label: 'Date Range', value: '2006–2025', color: 'var(--text-2)' },
          { label: 'Topics', value: ALL_TAGS.length, color: '#1B4FC4' },
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

      {/* Journalist callout */}
      <div style={{
        background: '#EEF3FC', border: '1px solid #A3BCEE',
        borderRadius: 'var(--r)', padding: '14px 18px', marginBottom: 24,
        fontSize: 13, color: 'var(--text-1)', lineHeight: 1.6,
      }}>
        <strong style={{ color: '#1B4FC4' }}>◆ For journalists and CSO researchers:</strong>{' '}
        These papers provide peer-reviewed citations for accountability reporting.
        The Bayelsa State Oil and Environmental Commission report (2006) and the 2025
        ScienceDirect paper on land dispossession are particularly relevant for current oil spill reporting.
      </div>

      {/* Relevance filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        {[
          { value: 'all',      label: 'All' },
          { value: 'critical', label: '▲ Critical' },
          { value: 'high',     label: '● High' },
          { value: 'medium',   label: '◆ Medium' },
        ].map(opt => (
          <button key={opt.value} onClick={() => setRelevanceFilter(opt.value)}
            aria-pressed={relevanceFilter === opt.value}
            style={{
              padding: '5px 12px', border: '1px solid',
              borderColor: relevanceFilter === opt.value ? 'var(--navy)' : 'var(--border)',
              borderRadius: 4, cursor: 'pointer', fontSize: 12, fontFamily: 'var(--ff-sans)',
              background: relevanceFilter === opt.value ? 'var(--navy)' : 'var(--surface)',
              color: relevanceFilter === opt.value ? '#fff' : 'var(--text-2)',
            }}>{opt.label}</button>
        ))}
      </div>

      {/* Tag filter */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
        <span style={{ fontSize: 11, color: 'var(--text-3)', alignSelf: 'center', marginRight: 4 }}>Filter by topic:</span>
        {ALL_TAGS.map(tag => (
          <button key={tag} onClick={() => setTagFilter(t => t === tag ? null : tag)}
            aria-pressed={tagFilter === tag}
            style={{
              fontSize: 10, fontFamily: 'var(--ff-mono)', letterSpacing: '0.06em',
              padding: '3px 8px', borderRadius: 3, cursor: 'pointer',
              background: tagFilter === tag ? 'var(--navy)' : 'var(--navy-tint)',
              color: tagFilter === tag ? '#fff' : 'var(--navy)',
              border: `1px solid ${tagFilter === tag ? 'var(--navy)' : 'var(--border)'}`,
            }}>{tag}</button>
        ))}
        {tagFilter && (
          <button onClick={() => setTagFilter(null)} style={{
            fontSize: 10, fontFamily: 'var(--ff-mono)', padding: '3px 8px', borderRadius: 3,
            cursor: 'pointer', background: 'transparent', border: '1px solid var(--border)',
            color: 'var(--text-3)',
          }}>× Clear</button>
        )}
      </div>

      {/* Papers grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
        {filtered.map(paper => (
          <PaperCard key={paper.id} paper={paper} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-3)', fontSize: 14 }}>
          No papers match your current filters.
        </div>
      )}
    </PageShell>
  )
}
