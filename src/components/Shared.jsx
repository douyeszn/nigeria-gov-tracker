import { useState, useEffect, useCallback } from 'react'

export const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// ── Helpers ──────────────────────────────────────────────────────────────────

export const scoreColor = (s) => s >= 70 ? '#008751' : s >= 50 ? '#C97400' : '#B50000'
export const scoreLabel = (s) => s >= 80 ? 'GOOD' : s >= 65 ? 'FAIR' : s >= 50 ? 'POOR' : s >= 35 ? 'WEAK' : 'FAILING'

export const SEVERITY = {
  red:   { bg: '#FFF2F2', border: '#F5AAAA', text: '#B50000', icon: '▲' },
  amber: { bg: '#FFF8EC', border: '#F5C97A', text: '#C97400', icon: '●' },
  green: { bg: '#E8F5EE', border: '#8ACBA8', text: '#006B41', icon: '✓' },
  blue:  { bg: '#EEF3FC', border: '#A3BCEE', text: '#1B4FC4', icon: '◆' },
}

// ── ScoreRing ─────────────────────────────────────────────────────────────────

export function ScoreRing({ score, size = 140, strokeWidth = 11 }) {
  const [animated, setAnimated] = useState(prefersReducedMotion ? score : 0)
  const r    = (size - strokeWidth) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (animated / 100) * circ
  const color  = scoreColor(score)

  useEffect(() => {
    if (prefersReducedMotion) { setAnimated(score); return }
    let raf
    const start = performance.now(), dur = 900
    const tick = now => {
      const t = Math.min((now - start) / dur, 1)
      const e = 1 - Math.pow(1 - t, 3)
      setAnimated(Math.floor(e * score))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    const timer = setTimeout(() => { raf = requestAnimationFrame(tick) }, 300)
    return () => { clearTimeout(timer); cancelAnimationFrame(raf) }
  }, [score])

  return (
    <svg width={size} height={size}
      role="img" aria-label={`Score: ${score}/100 — ${scoreLabel(score)}`}
      style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#E8EBF2" strokeWidth={strokeWidth} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={strokeWidth}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition: prefersReducedMotion ? 'none' : 'stroke-dashoffset 0.05s linear' }} />
    </svg>
  )
}

// ── AnimatedNumber ────────────────────────────────────────────────────────────

export function AnimatedNumber({ value, duration = 800 }) {
  const target = parseInt(value, 10) || 0
  const [display, setDisplay] = useState(prefersReducedMotion ? target : 0)
  useEffect(() => {
    if (prefersReducedMotion) { setDisplay(target); return }
    let raf
    const start = performance.now()
    const tick = now => {
      const t = Math.min((now - start) / duration, 1)
      setDisplay(Math.floor((1 - Math.pow(1 - t, 3)) * target))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    const timer = setTimeout(() => { raf = requestAnimationFrame(tick) }, 300)
    return () => { clearTimeout(timer); cancelAnimationFrame(raf) }
  }, [target, duration])
  return <>{display}</>
}

// ── ProgressBar ───────────────────────────────────────────────────────────────

export function ProgressBar({ label, value, target, progress }) {
  const [w, setW] = useState(prefersReducedMotion ? progress : 0)
  const color = scoreColor(progress)
  useEffect(() => {
    if (prefersReducedMotion) { setW(progress); return }
    const t = setTimeout(() => setW(progress), 400)
    return () => clearTimeout(t)
  }, [progress])

  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: 12 }}>
        <span style={{ color: 'var(--text-2)' }}>{label}</span>
        <span style={{ fontFamily: 'var(--ff-mono)', fontWeight: 600, color }}>
          {value} <span style={{ color: 'var(--text-4)', fontWeight: 400 }}>/ {target}</span>
        </span>
      </div>
      <div style={{ height: 5, background: '#E8EBF2', borderRadius: 3, overflow: 'hidden' }}
        role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
        <div style={{
          height: '100%', width: `${w}%`, borderRadius: 3, background: color,
          transition: prefersReducedMotion ? 'none' : 'width 1.2s cubic-bezier(0.4,0,0.2,1)',
        }} />
      </div>
    </div>
  )
}

// ── ShareButton ───────────────────────────────────────────────────────────────

export function ShareButton({ label, text }) {
  const [copied, setCopied] = useState(false)
  const handleShare = useCallback(() => {
    const url = window.location.href
    const shareText = text || `Bayelsa State Accountability Tracker — ${label}`
    if (navigator.share) {
      navigator.share({ title: `Bayelsa — ${label}`, text: shareText, url }).catch(() => {})
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(`${shareText} ${url}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [label, text])

  return (
    <button onClick={handleShare} aria-label={`Share ${label}`}
      style={{
        background: 'transparent', border: '1px solid var(--border)',
        color: copied ? 'var(--green)' : 'var(--text-3)',
        borderRadius: 'var(--r)', padding: '4px 10px',
        fontFamily: 'var(--ff-mono)', fontSize: 10, letterSpacing: '0.06em',
        cursor: 'pointer', minHeight: 28,
        transition: 'color 0.2s, border-color 0.2s',
        outline: 'none',
      }}
      onFocus={e => { e.currentTarget.style.boxShadow = '0 0 0 2px #1B4FC4' }}
      onBlur={e  => { e.currentTarget.style.boxShadow = 'none' }}
    >
      {copied ? '✓ COPIED' : '↗ SHARE'}
    </button>
  )
}

// ── SectionHeading ────────────────────────────────────────────────────────────

export function SectionHeading({ label, title, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      {label && (
        <div style={{
          fontSize: 10, fontFamily: 'var(--ff-mono)', letterSpacing: '0.12em',
          textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 6,
        }}>{label}</div>
      )}
      <h2 style={{
        fontFamily: 'var(--ff-serif)', fontSize: 26, fontWeight: 400,
        color: 'var(--navy)', margin: 0, lineHeight: 1.2,
      }}>{title}</h2>
      {children && <div style={{ marginTop: 8, color: 'var(--text-2)', fontSize: 13, lineHeight: 1.6 }}>{children}</div>}
    </div>
  )
}

// ── StatBlock ─────────────────────────────────────────────────────────────────

export function StatBlock({ label, value, sub, color }) {
  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 'var(--r-lg)', padding: '18px 20px',
      boxShadow: 'var(--shadow-sm)',
    }}>
      <div style={{
        fontSize: 10, fontFamily: 'var(--ff-mono)', letterSpacing: '0.1em',
        textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 8,
      }}>{label}</div>
      <div style={{
        fontFamily: 'var(--ff-serif)', fontStyle: 'italic',
        fontSize: 28, color: color || 'var(--navy)', lineHeight: 1,
      }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 6 }}>{sub}</div>}
    </div>
  )
}

// ── PageShell ─────────────────────────────────────────────────────────────────

export function PageShell({ children }) {
  return (
    <main style={{
      maxWidth: 1100, margin: '0 auto',
      padding: '36px 20px 64px',
    }}>
      {children}
    </main>
  )
}
