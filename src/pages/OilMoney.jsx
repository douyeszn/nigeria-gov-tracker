import { OIL_REVENUE_FLOW, NNPC_BOARD, OIL_COMPANIES } from '../data.js'
import { SectionHeading, StatBlock, PageShell, ShareButton } from '../components/Shared.jsx'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const ZONE_COLORS = {
  'South-South':   '#B50000',
  'South-West':    '#1B4FC4',
  'South-East':    '#6B3FA0',
  'North-West':    '#C97400',
  'North-East':    '#7A8799',
  'North-Central': '#008751',
  'North':         '#0D132D',
}

export default function OilMoney() {
  const southSouthReps = NNPC_BOARD.filter(m => m.zone === 'South-South').length
  const totalMembers = NNPC_BOARD.filter(m => m.type === 'executive' || m.type === 'non-exec').length

  return (
    <PageShell>
      <SectionHeading
        label="Oil Revenue Accountability"
        title="Who Gets the Oil?"
      >
        Bayelsa produces 23.4% of Nigeria's oil. Yet only ~8 cents of every ₦1 extracted
        returns to the state. This page tracks the money trail — and the governance gap.
      </SectionHeading>

      {/* Headline callout */}
      <div style={{
        background: 'var(--navy)', borderRadius: 'var(--r-lg)',
        padding: '24px 28px', marginBottom: 32, boxShadow: 'var(--shadow)',
      }}>
        <div style={{ fontSize: 10, fontFamily: 'var(--ff-mono)', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>
          The Core Injustice
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
          {[
            { label: 'Bayelsa produces', value: '23.4%', sub: 'of Nigeria\'s total oil', color: '#fca5a5' },
            { label: 'Returns to Bayelsa', value: '~8%',  sub: 'of value extracted',     color: '#fbbf24' },
            { label: 'South-South NNPC seats', value: '1 of 8', sub: 'covering 6 oil states', color: '#f87171' },
            { label: 'Confirmed Ijaw on board', value: '0', sub: 'zero Bayelsa/Ijaw reps', color: '#ef4444' },
          ].map(item => (
            <div key={item.label} style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 6, padding: '14px 16px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: 9, fontFamily: 'var(--ff-mono)', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>{item.label}</div>
              <div style={{ fontFamily: 'var(--ff-serif)', fontStyle: 'italic', fontSize: 26, color: item.color, lineHeight: 1 }}>{item.value}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>{item.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue waterfall */}
      <div style={{ marginBottom: 36 }}>
        <SectionHeading label="Revenue Flow" title="The Oil Money Waterfall" />
        <p style={{ fontSize: 13, color: 'var(--text-2)', marginTop: -16, marginBottom: 20, lineHeight: 1.6 }}>
          Where every ₦1 extracted from Bayelsa's oil goes — before any of it returns to the state.
        </p>

        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--r-lg)', padding: '20px', boxShadow: 'var(--shadow-sm)', marginBottom: 20,
        }}>
          <div style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={OIL_REVENUE_FLOW} margin={{ top: 10, right: 20, bottom: 60, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8EBF2" />
                <XAxis dataKey="stage" tick={{ fontSize: 9, fontFamily: 'var(--ff-mono)', fill: '#7A8799' }}
                  angle={-35} textAnchor="end" interval={0} />
                <YAxis tick={{ fontSize: 10, fontFamily: 'var(--ff-mono)', fill: '#7A8799' }}
                  tickFormatter={v => `${v}¢`} domain={[0, 110]} />
                <Tooltip
                  formatter={(v, n, props) => [`${v}¢ of every ₦1`, '']}
                  labelFormatter={(label) => label}
                  contentStyle={{ fontSize: 12 }}
                />
                <Bar dataKey="value" radius={[3, 3, 0, 0]}>
                  {OIL_REVENUE_FLOW.map((entry, i) => (
                    <Cell key={i} fill={i === OIL_REVENUE_FLOW.length - 1 ? '#008751' : i < 3 ? '#1B4FC4' : '#C97400'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Step-by-step breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {OIL_REVENUE_FLOW.map((step, i) => {
            const isLast = i === OIL_REVENUE_FLOW.length - 1
            return (
              <div key={i} style={{ display: 'flex', gap: 14, paddingBottom: 14, alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 24, flexShrink: 0 }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%',
                    background: isLast ? '#008751' : '#E8EBF2',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, fontFamily: 'var(--ff-mono)', fontWeight: 700,
                    color: isLast ? '#fff' : 'var(--text-3)',
                    flexShrink: 0,
                  }}>{i + 1}</div>
                  {!isLast && <div style={{ flex: 1, width: 1, background: 'var(--border)', minHeight: 20, marginTop: 2 }} />}
                </div>
                <div style={{
                  flex: 1, background: isLast ? '#E8F5EE' : 'var(--surface)',
                  border: `1px solid ${isLast ? '#8ACBA8' : 'var(--border)'}`,
                  borderRadius: 'var(--r)', padding: '10px 14px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 6, marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: isLast ? '#006B41' : 'var(--navy)' }}>{step.stage}</span>
                    <span style={{ fontFamily: 'var(--ff-mono)', fontSize: 14, fontWeight: 700, color: isLast ? '#008751' : '#C97400' }}>
                      {step.value}¢
                    </span>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-2)' }}>{step.note}</div>
                </div>
              </div>
            )
          })}
        </div>

        <div style={{
          marginTop: 16, background: '#FFF2F2', border: '1px solid #F5AAAA',
          borderRadius: 'var(--r)', padding: '14px 16px', fontSize: 13,
        }}>
          <strong style={{ color: '#B50000' }}>▲ Bottom line:</strong>{' '}
          For every ₦100 extracted from Bayelsa's land,{' '}
          <strong>approximately ₦92 leaves the state entirely</strong>.
          Only ~₦8 returns through FAAC, derivation, and LGA allocations combined.
          Meanwhile, oil companies extract an estimated $6–8 billion annually from Bayelsa assets.
        </div>
      </div>

      {/* NNPC Board */}
      <div style={{ marginBottom: 36 }}>
        <SectionHeading label="Governance Gap" title="NNPC Board — Who Represents Bayelsa?" />
        <p style={{ fontSize: 13, color: 'var(--text-2)', marginTop: -16, marginBottom: 20, lineHeight: 1.6 }}>
          The NNPC board controls decisions about Nigeria's oil sector — including pricing, production quotas,
          and revenue distribution. South-South states produce <strong>~90% of Nigeria's oil</strong> but have
          <strong> 1 of 8 board seats</strong>, representing 6 states. No confirmed Ijaw or Bayelsa-indigene holds a seat.
        </p>

        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--r-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr style={{ background: 'var(--navy)' }}>
                  {['Name', 'Role', 'Zone', 'State / Ethnicity'].map(h => (
                    <th key={h} style={{
                      padding: '10px 14px', textAlign: 'left',
                      fontFamily: 'var(--ff-mono)', fontSize: 9, letterSpacing: '0.1em',
                      textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)',
                      fontWeight: 600, whiteSpace: 'nowrap',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {NNPC_BOARD.map((member, i) => {
                  const isSS = member.zone === 'South-South'
                  const isMinistry = member.type === 'ministry'
                  return (
                    <tr key={i} style={{
                      background: isSS ? '#FFF8EC' : isMinistry ? 'var(--surface-2)' : 'var(--surface)',
                      borderBottom: '1px solid var(--border)',
                    }}>
                      <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--navy)' }}>
                        {member.name}
                        {isSS && <span style={{ marginLeft: 6, fontSize: 9, fontFamily: 'var(--ff-mono)', color: '#C97400', background: '#FFF8EC', border: '1px solid #F5C97A', borderRadius: 3, padding: '1px 5px' }}>ONLY SS REP</span>}
                      </td>
                      <td style={{ padding: '10px 14px', color: 'var(--text-2)' }}>{member.role}</td>
                      <td style={{ padding: '10px 14px' }}>
                        <span style={{
                          fontSize: 10, fontFamily: 'var(--ff-mono)', padding: '2px 7px', borderRadius: 3,
                          background: `${ZONE_COLORS[member.zone] || '#7A8799'}18`,
                          color: ZONE_COLORS[member.zone] || '#7A8799',
                          border: `1px solid ${ZONE_COLORS[member.zone] || '#7A8799'}40`,
                        }}>{member.zone}</span>
                      </td>
                      <td style={{ padding: '10px 14px', color: 'var(--text-2)' }}>
                        {member.state}{member.ethnic && member.ethnic !== 'N/A' ? ` / ${member.ethnic}` : ''}
                        {member.note && (
                          <div style={{ fontSize: 10, color: '#C97400', marginTop: 2 }}>{member.note}</div>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{
          marginTop: 16, background: '#FFF2F2', border: '1px solid #F5AAAA',
          borderRadius: 'var(--r)', padding: '14px 16px',
        }}>
          <strong style={{ color: '#B50000', fontSize: 13 }}>▲ Representation Deficit</strong>
          <p style={{ margin: '6px 0 0', fontSize: 12, color: 'var(--text-1)', lineHeight: 1.6 }}>
            Austin Avuru (Rivers State, Ijaw-Kalabari) is the sole South-South representative on the NNPC board —
            one seat covering 6 states that produce 90% of Nigeria's oil. No confirmed Bayelsa-indigene or
            mainstream Ijaw-Bayelsa representative holds a seat. The communities bearing the environmental
            cost of oil extraction have no voice in how the industry is governed.
          </p>
        </div>
      </div>

      {/* Oil companies */}
      <div>
        <SectionHeading label="Who Operates in Bayelsa" title="Major Oil Companies" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {OIL_COMPANIES.map((company, i) => (
            <div key={i} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-lg)', padding: '20px', boxShadow: 'var(--shadow-sm)',
            }}>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontFamily: 'var(--ff-serif)', fontSize: 18, color: 'var(--navy)', marginBottom: 2 }}>{company.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{company.fullName}</div>
              </div>

              {/* Ownership breakdown */}
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 10, fontFamily: 'var(--ff-mono)', color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
                  JV Ownership
                </div>
                {company.ownership.map((own, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: own.color, flexShrink: 0 }} />
                    <span style={{ flex: 1, fontSize: 12, color: 'var(--text-2)' }}>{own.entity}</span>
                    <span style={{ fontFamily: 'var(--ff-mono)', fontSize: 12, fontWeight: 600, color: 'var(--text-1)' }}>{own.pct}%</span>
                  </div>
                ))}
              </div>

              <div style={{ fontSize: 11, marginBottom: 8 }}>
                <span style={{ color: 'var(--text-3)' }}>Bayelsa share: </span>
                <strong>{company.nigeriaPct}</strong>
              </div>
              <div style={{ fontSize: 11, marginBottom: 12 }}>
                <span style={{ color: 'var(--text-3)' }}>Annual est.: </span>
                <strong>{company.annualRevEstimate}</strong>
              </div>
              <div style={{
                background: '#FFF2F2', border: '1px solid #F5AAAA',
                borderRadius: 'var(--r)', padding: '10px 12px',
                fontSize: 12, color: 'var(--text-1)', lineHeight: 1.6,
              }}>
                <strong style={{ color: '#B50000', fontSize: 10, fontFamily: 'var(--ff-mono)' }}>▲ KEY ISSUE: </strong>
                {company.keyIssue}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
