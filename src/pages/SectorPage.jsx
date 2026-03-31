import { useParams, Link, Navigate } from 'react-router-dom'
import { SECTORS, SECTOR_DETAILS } from '../data.js'
import { ProgressBar, PageShell, scoreColor, scoreLabel, SEVERITY } from '../components/Shared.jsx'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, Legend, Cell,
} from 'recharts'

const STATUS_STYLE = {
  completed:   { bg: '#E8F5EE', border: '#8ACBA8', text: '#006B41', dot: '#008751' },
  ongoing:     { bg: '#EEF3FC', border: '#A3BCEE', text: '#1B4FC4', dot: '#1B4FC4' },
  partial:     { bg: '#FFF8EC', border: '#F5C97A', text: '#C97400', dot: '#C97400' },
  stalled:     { bg: '#FFF2F2', border: '#F5AAAA', text: '#B50000', dot: '#B50000' },
  'not started':{ bg: '#F8F9FC', border: '#D9DEE8', text: '#7A8799', dot: '#B0BACA' },
}

function Card({ children, style = {} }) {
  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 'var(--r-lg)', padding: '20px', boxShadow: 'var(--shadow-sm)',
      ...style,
    }}>{children}</div>
  )
}

function SectionLabel({ children }) {
  return (
    <div style={{
      fontSize: 10, fontFamily: 'var(--ff-mono)', letterSpacing: '0.12em',
      textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 14,
    }}>{children}</div>
  )
}

export default function SectorPage() {
  const { sectorId } = useParams()
  const sector  = SECTORS.find(s => s.id === sectorId)
  const details = SECTOR_DETAILS[sectorId]

  if (!sector || !details) return <Navigate to="/sectors" replace />

  const scoreC  = scoreColor(sector.score)
  const sev     = SEVERITY[sector.severity] || SEVERITY.amber
  const execRate = Math.round((sector.budgetSpent / sector.budgetAllocated) * 100)
  const gapBn   = (sector.budgetAllocated - sector.budgetSpent).toFixed(1)

  // figure out which LGA table columns to show
  const lgaSample = details.lgaData[0]
  const lgaKeys = Object.keys(lgaSample).filter(k => k !== 'lga' && k !== 'mainActivity' && k !== 'sezStatus' && k !== 'gridConnected')

  const LGA_LABELS = {
    enrolled: 'Enrollment %', outOfSchool: 'Out-of-School', schoolsRehabbed: 'Schools Rehabbed',
    washFacilities: 'WASH Facilities %', roadsKm: 'Roads (km)', condition: 'Road Condition %',
    riverineAccess: 'Riverine Access %', majorProjects: 'Major Projects', youthUnemployment: 'Youth Unemployment %',
    smes: 'SMEs Registered', avgIncome: 'Avg Monthly Income (₦)', floodMonths: 'Flood Months/Year',
    displaced2022: 'Displaced (2022)', earlyWarning: 'Early Warning', damageNbn: 'Damage ₦B (2022)',
    washAccess: 'WASH Access %', functionalFacilities: 'Functional Facilities %',
    skilledBirth: 'Skilled Birth %', malariaCases: 'Malaria Cases/yr',
    spillSites: 'Oil Spill Sites', fishingImpact: 'Fishing Impact %', farmsAffected: 'Farms Affected',
    remediated: 'Sites Remediated', oilOutput: 'Oil Output %', gasOutput: 'Gas Output %',
    industrialJobs: 'Industrial Jobs', avgHours: 'Avg Power (hrs)', solarProjects: 'Solar Projects',
    generatorDependency: 'Generator Dependency %',
  }

  // pick a relevant LGA chart column
  const chartCol = lgaKeys[0]

  return (
    <PageShell>
      {/* Back link */}
      <Link to="/sectors" style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        fontSize: 12, fontFamily: 'var(--ff-mono)', color: 'var(--text-3)',
        textDecoration: 'none', marginBottom: 20,
        letterSpacing: '0.06em',
      }}>← ALL SECTORS</Link>

      {/* ── HERO ── */}
      <div style={{
        background: 'var(--navy)', borderRadius: 'var(--r-lg)',
        padding: '28px', marginBottom: 28, boxShadow: 'var(--shadow)',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 40 }}>{sector.icon}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, fontFamily: 'var(--ff-mono)', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6 }}>
              Sector Deep-Dive · Bayelsa State
            </div>
            <h1 style={{ fontFamily: 'var(--ff-serif)', fontSize: 28, color: '#fff', margin: '0 0 10px', fontWeight: 400 }}>
              {sector.name}
            </h1>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{
                fontFamily: 'var(--ff-mono)', fontSize: 32, fontWeight: 700,
                color: scoreC, lineHeight: 1,
              }}>{sector.score}<span style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}>/100</span></div>
              <span style={{
                fontSize: 9, fontFamily: 'var(--ff-mono)', letterSpacing: '0.1em',
                padding: '3px 9px', borderRadius: 3,
                background: sev.bg, border: `1px solid ${sev.border}`, color: sev.text,
              }}>{sev.icon} {sector.status}</span>
            </div>
          </div>
          {/* Headline stat */}
          <div style={{
            background: 'rgba(255,255,255,0.08)', borderRadius: 8, padding: '14px 18px',
            borderLeft: `3px solid ${scoreC}`, minWidth: 160,
          }}>
            <div style={{ fontFamily: 'var(--ff-serif)', fontStyle: 'italic', fontSize: 26, color: scoreC, lineHeight: 1 }}>
              {sector.headline}
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {sector.headlineLabel}
            </div>
          </div>
        </div>

        {/* Overview text */}
        <div style={{
          marginTop: 20, fontSize: 14, color: 'rgba(255,255,255,0.7)',
          lineHeight: 1.75, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 18,
        }}>
          {details.overview}
        </div>
      </div>

      {/* ── KEY METRICS ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 28 }}>
        <Card>
          <SectionLabel>Performance Metrics vs Targets</SectionLabel>
          {sector.metrics.map((m, i) => (
            <ProgressBar key={i} label={m.label} value={m.value} target={m.target} progress={m.progress} />
          ))}
        </Card>

        <Card>
          <SectionLabel>FY2024 Budget Execution</SectionLabel>
          <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, fontFamily: 'var(--ff-mono)', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Allocated</div>
              <div style={{ fontFamily: 'var(--ff-serif)', fontStyle: 'italic', fontSize: 24, color: 'var(--navy)' }}>₦{sector.budgetAllocated}B</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, fontFamily: 'var(--ff-mono)', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Spent</div>
              <div style={{ fontFamily: 'var(--ff-serif)', fontStyle: 'italic', fontSize: 24, color: scoreColor(execRate) }}>₦{sector.budgetSpent}B</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, fontFamily: 'var(--ff-mono)', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Unspent</div>
              <div style={{ fontFamily: 'var(--ff-serif)', fontStyle: 'italic', fontSize: 24, color: '#B50000' }}>₦{gapBn}B</div>
            </div>
          </div>
          <div style={{ height: 6, background: '#E8EBF2', borderRadius: 3, overflow: 'hidden', marginBottom: 8 }}>
            <div style={{ height: '100%', width: `${execRate}%`, background: scoreColor(execRate), borderRadius: 3 }} />
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-3)', textAlign: 'right' }}>
            <span style={{ fontFamily: 'var(--ff-mono)', fontWeight: 700, color: scoreColor(execRate), fontSize: 18 }}>{execRate}%</span> execution rate
          </div>

          {/* Key failure */}
          <div style={{
            marginTop: 16, background: '#FFF2F2', border: '1px solid #F5AAAA',
            borderRadius: 'var(--r)', padding: '10px 14px',
            fontSize: 12, color: 'var(--text-1)', lineHeight: 1.6,
          }}>
            <strong style={{ color: '#B50000', fontSize: 10, fontFamily: 'var(--ff-mono)', letterSpacing: '0.06em', display: 'block', marginBottom: 4 }}>▲ KEY FAILURE</strong>
            {sector.keyFailure}
          </div>
          <div style={{ marginTop: 10, fontSize: 10, color: 'var(--text-4)', fontFamily: 'var(--ff-mono)' }}>
            Source: {sector.source}
          </div>
        </Card>
      </div>

      {/* ── NATIONAL COMPARISON ── */}
      {details.nationComparison && (
        <Card style={{ marginBottom: 28 }}>
          <SectionLabel>Bayelsa vs National Average</SectionLabel>
          <div style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 16 }}>{details.nationComparison.label}</div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            {[
              { label: 'Bayelsa', value: details.nationComparison.bayelsa, color: scoreColor(details.nationComparison.bayelsa < details.nationComparison.national ? 20 : 75) },
              { label: 'National Avg', value: details.nationComparison.national, color: '#1B4FC4' },
            ].map(item => (
              <div key={item.label} style={{ flex: 1, minWidth: 140 }}>
                <div style={{ fontFamily: 'var(--ff-serif)', fontStyle: 'italic', fontSize: 36, color: item.color, lineHeight: 1 }}>
                  {item.value}<span style={{ fontSize: 14, color: 'var(--text-3)', fontStyle: 'normal' }}>{details.nationComparison.unit}</span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4, fontFamily: 'var(--ff-mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.label}</div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* ── TREND CHART ── */}
      {details.trend && (
        <Card style={{ marginBottom: 28 }}>
          <SectionLabel>5-Year Trend (2020–2024)</SectionLabel>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={details.trend} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8EBF2" />
                <XAxis dataKey="year" tick={{ fontSize: 11, fontFamily: 'var(--ff-mono)', fill: '#7A8799' }} />
                <YAxis tick={{ fontSize: 11, fontFamily: 'var(--ff-mono)', fill: '#7A8799' }} />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11, fontFamily: 'var(--ff-mono)' }} />
                {Object.keys(details.trend[0]).filter(k => k !== 'year').map((key, i) => {
                  const colors = ['#008751', '#1B4FC4', '#C97400', '#B50000', '#6B3FA0']
                  return <Line key={key} type="monotone" dataKey={key} stroke={colors[i % colors.length]} strokeWidth={2} dot={{ r: 3 }} />
                })}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}

      {/* ── PROGRAMS / INITIATIVES ── */}
      {details.programs && (
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 10, fontFamily: 'var(--ff-mono)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 14 }}>
            Key Programmes & Initiatives
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
            {details.programs.map((prog, i) => {
              const ss = STATUS_STYLE[prog.status] || STATUS_STYLE.partial
              return (
                <div key={i} style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: 'var(--r-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)',
                }}>
                  <div style={{ height: 3, background: ss.dot }} />
                  <div style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, gap: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)', lineHeight: 1.3, flex: 1 }}>{prog.name}</span>
                      <span style={{
                        fontSize: 9, fontFamily: 'var(--ff-mono)', letterSpacing: '0.08em',
                        padding: '2px 6px', borderRadius: 3, flexShrink: 0, textTransform: 'uppercase',
                        background: ss.bg, border: `1px solid ${ss.border}`, color: ss.text,
                      }}>{prog.status}</span>
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 8 }}>
                      Budget: <strong style={{ color: 'var(--text-1)' }}>{prog.budget}</strong>
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                      <div style={{ flex: 1, height: 4, background: '#E8EBF2', borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${prog.progress}%`, background: ss.dot, borderRadius: 2 }} />
                      </div>
                      <span style={{ fontFamily: 'var(--ff-mono)', fontSize: 12, fontWeight: 600, color: ss.dot }}>{prog.progress}%</span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6 }}>{prog.detail}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ── LGA BREAKDOWN ── */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 10, fontFamily: 'var(--ff-mono)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 14 }}>
          LGA Breakdown — All 8 Local Government Areas
        </div>

        {/* Bar chart of first numeric column */}
        <Card style={{ marginBottom: 16 }}>
          <SectionLabel>{LGA_LABELS[chartCol] || chartCol} by LGA</SectionLabel>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={details.lgaData} margin={{ top: 5, right: 10, bottom: 30, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8EBF2" />
                <XAxis dataKey="lga" tick={{ fontSize: 9, fontFamily: 'var(--ff-mono)', fill: '#7A8799' }}
                  angle={-35} textAnchor="end" interval={0} />
                <YAxis tick={{ fontSize: 10, fontFamily: 'var(--ff-mono)', fill: '#7A8799' }} />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Bar dataKey={chartCol} radius={[3, 3, 0, 0]} name={LGA_LABELS[chartCol] || chartCol}>
                  {details.lgaData.map((_, i) => (
                    <Cell key={i} fill={scoreC} fillOpacity={0.6 + (i * 0.04)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Table */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--r-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr style={{ background: 'var(--navy)' }}>
                  <th style={{ padding: '10px 14px', textAlign: 'left', fontFamily: 'var(--ff-mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>LGA</th>
                  {lgaKeys.map(k => (
                    <th key={k} style={{ padding: '10px 14px', textAlign: 'right', fontFamily: 'var(--ff-mono)', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', fontWeight: 600, whiteSpace: 'nowrap' }}>
                      {LGA_LABELS[k] || k}
                    </th>
                  ))}
                  {lgaSample.mainActivity && <th style={{ padding: '10px 14px', textAlign: 'left', fontFamily: 'var(--ff-mono)', fontSize: 9, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>Main Activity</th>}
                </tr>
              </thead>
              <tbody>
                {details.lgaData.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'var(--surface)' : 'var(--surface-2)' }}>
                    <td style={{ padding: '9px 14px', fontWeight: 600, color: 'var(--navy)', whiteSpace: 'nowrap' }}>{row.lga}</td>
                    {lgaKeys.map(k => {
                      const val = row[k]
                      const isNum = typeof val === 'number'
                      const isBool = typeof val === 'boolean'
                      return (
                        <td key={k} style={{ padding: '9px 14px', textAlign: 'right', fontFamily: isNum ? 'var(--ff-mono)' : 'inherit', color: isBool ? (val ? '#008751' : '#B50000') : 'var(--text-1)' }}>
                          {isBool ? (val ? '✓' : '✗') : typeof val === 'number' ? val.toLocaleString() : val}
                        </td>
                      )
                    })}
                    {row.mainActivity && <td style={{ padding: '9px 14px', color: 'var(--text-2)', fontSize: 11 }}>{row.mainActivity}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── KEY FACTS ── */}
      {details.keyFacts && (
        <Card style={{ marginBottom: 28 }}>
          <SectionLabel>Key Facts</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {details.keyFacts.map((fact, i) => (
              <div key={i} style={{
                display: 'flex', gap: 10, fontSize: 13,
                color: 'var(--text-1)', lineHeight: 1.6,
                padding: '8px 0', borderBottom: i < details.keyFacts.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <span style={{ color: scoreC, fontFamily: 'var(--ff-mono)', flexShrink: 0, marginTop: 1 }}>▸</span>
                {fact}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* ── SECTOR-SPECIFIC EXTRAS ── */}

      {/* Benchmarks (education) */}
      {details.benchmarks && (
        <Card style={{ marginBottom: 28 }}>
          <SectionLabel>State Comparison — Education</SectionLabel>
          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={details.benchmarks} layout="vertical" margin={{ top: 0, right: 40, bottom: 0, left: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8EBF2" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fontFamily: 'var(--ff-mono)', fill: '#7A8799' }} />
                <YAxis type="category" dataKey="state" tick={{ fontSize: 11, fontFamily: 'var(--ff-mono)', fill: '#7A8799' }} width={56} />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Bar dataKey="waec" name="WAEC Pass %" radius={[0, 3, 3, 0]}>
                  {details.benchmarks.map((entry, i) => (
                    <Cell key={i} fill={entry.state === 'Bayelsa' ? '#B50000' : '#1B4FC4'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}

      {/* Flood history */}
      {details.floodHistory && (
        <Card style={{ marginBottom: 28 }}>
          <SectionLabel>Flood Displacement History (2020–2024)</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {details.floodHistory.map((yr, i) => (
              <div key={i} style={{
                display: 'flex', gap: 14, padding: '12px 0',
                borderBottom: i < details.floodHistory.length - 1 ? '1px solid var(--border)' : 'none',
                alignItems: 'flex-start',
              }}>
                <div style={{
                  fontFamily: 'var(--ff-mono)', fontSize: 12, fontWeight: 700,
                  color: 'var(--navy)', flexShrink: 0, width: 40,
                }}>{yr.year}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 12, marginBottom: 4, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 12, color: '#B50000', fontFamily: 'var(--ff-mono)' }}>
                      {yr.displaced.toLocaleString()} displaced
                    </span>
                    <span style={{ fontSize: 12, color: '#C97400', fontFamily: 'var(--ff-mono)' }}>
                      ₦{yr.damageNbn}B damage
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5 }}>{yr.govtResponse}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Spill history */}
      {details.spillHistory && (
        <Card style={{ marginBottom: 28 }}>
          <SectionLabel>Oil Spill Record (2020–2024) — Remediated: 0</SectionLabel>
          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={details.spillHistory} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8EBF2" />
                <XAxis dataKey="year" tick={{ fontSize: 11, fontFamily: 'var(--ff-mono)', fill: '#7A8799' }} />
                <YAxis tick={{ fontSize: 11, fontFamily: 'var(--ff-mono)', fill: '#7A8799' }} />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Bar dataKey="newSpills"  name="New Spills"     fill="#B50000" radius={[3,3,0,0]} />
                <Bar dataKey="remediated" name="Remediated"     fill="#008751" radius={[3,3,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={{
            marginTop: 14, padding: '10px 14px', background: '#FFF2F2',
            border: '1px solid #F5AAAA', borderRadius: 'var(--r)',
            fontSize: 12, color: '#B50000', fontFamily: 'var(--ff-mono)', textAlign: 'center', letterSpacing: '0.04em',
          }}>
            TOTAL SPILLS 2020–2024: {details.spillHistory.reduce((a,b) => a + b.newSpills, 0)} · REMEDIATED: 0 · PEOPLE AFFECTED: {details.spillHistory.reduce((a,b) => a + b.affected, 0).toLocaleString()}
          </div>
        </Card>
      )}

      {/* Key institutions (education) */}
      {details.keyInstitutions && (
        <Card style={{ marginBottom: 28 }}>
          <SectionLabel>Key Educational Institutions</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
            {details.keyInstitutions.map((inst, i) => (
              <div key={i} style={{
                border: '1px solid var(--border)', borderRadius: 'var(--r)',
                padding: '12px 14px', background: 'var(--surface-2)',
              }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)', marginBottom: 3 }}>{inst.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 6 }}>
                  {inst.type} · {inst.location} · ~{inst.students} students
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5 }}>{inst.note}</div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Nav to other sectors */}
      <div style={{ marginTop: 8 }}>
        <div style={{ fontSize: 10, fontFamily: 'var(--ff-mono)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 12 }}>
          Other Sectors
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {SECTORS.filter(s => s.id !== sectorId).map(s => {
            const sc = scoreColor(s.score)
            return (
              <Link key={s.id} to={`/sectors/${s.id}`}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '6px 12px', borderRadius: 'var(--r)',
                  border: '1px solid var(--border)', background: 'var(--surface)',
                  textDecoration: 'none', fontSize: 12, color: 'var(--text-2)',
                  transition: 'border-color 0.15s, color 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = sc; e.currentTarget.style.color = sc }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-2)' }}
              >
                <span>{s.icon}</span>
                <span>{s.name.split(' ')[0]}</span>
                <span style={{ fontFamily: 'var(--ff-mono)', fontSize: 11, color: sc, fontWeight: 600 }}>{s.score}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </PageShell>
  )
}
