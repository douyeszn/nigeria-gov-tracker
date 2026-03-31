import { REVENUE_SOURCES, IGR_BREAKDOWN, REVENUE_TREND, IGR_POTENTIAL, EXPENDITURE_BREAKDOWN } from '../data.js'
import { SectionHeading, StatBlock, PageShell, ShareButton } from '../components/Shared.jsx'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, Legend,
} from 'recharts'

const TOTAL_REVENUE = 380 // ₦380B FY2024

export default function Revenue() {
  const igrPct = ((15.3 / TOTAL_REVENUE) * 100).toFixed(1)

  return (
    <PageShell>
      <SectionHeading
        label="Fiscal Accountability · FY2024"
        title="Revenue & Economy"
      >
        Bayelsa State generates ₦{TOTAL_REVENUE}B annually — but 96% comes from oil.
        This page tracks how money flows in, where it goes, and the massive IGR gap.
      </SectionHeading>

      {/* Key stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 36 }}>
        <StatBlock label="Total Revenue FY2024" value="₦380B" sub="FAAC + Derivation + IGR + Grants" />
        <StatBlock label="Oil Dependency" value="96.2%" sub="Share from oil-related sources" color="#B50000" />
        <StatBlock label="Internally Generated" value="₦15.3B" sub="4% of total — vs ₦28B target" color="#C97400" />
        <StatBlock label="IGR Shortfall" value="₦12.7B" sub="45.4% below ₦28B annual target" color="#B50000" />
        <StatBlock label="13% Derivation" value="₦165B" sub="Constitutional oil-state entitlement" color="#1B4FC4" />
      </div>

      {/* Oil dependency alert */}
      <div style={{
        background: '#FFF8EC', border: '1px solid #F5C97A',
        borderRadius: 'var(--r)', padding: '14px 18px', marginBottom: 32,
        display: 'flex', gap: 12, alignItems: 'flex-start',
      }}>
        <span style={{ fontSize: 20 }}>⚠</span>
        <div>
          <strong style={{ color: '#C97400', fontSize: 13 }}>Structural Warning — Oil Dependency</strong>
          <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--text-1)', lineHeight: 1.6 }}>
            Bayelsa generates only <strong>₦15.3B</strong> in internal revenue on a <strong>₦380B</strong> budget.
            If Nigeria's oil revenue dropped 30% — a realistic scenario given global energy transition — Bayelsa
            would face a <strong>₦114B revenue shortfall</strong> with no meaningful IGR base to fall back on.
            After 5 years, zero structural diversification has been achieved.
          </p>
        </div>
      </div>

      {/* Revenue sources donut */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 36 }}>
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--r-lg)', padding: '20px', boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{ fontSize: 10, fontFamily: 'var(--ff-mono)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 16 }}>
            Revenue Sources — FY2024
          </div>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={REVENUE_SOURCES} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} innerRadius={48}>
                  {REVENUE_SOURCES.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v, n) => [`₦${v}B`, n]} contentStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
            {REVENUE_SOURCES.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: s.color, flexShrink: 0 }} />
                <span style={{ flex: 1, color: 'var(--text-2)' }}>{s.name}</span>
                <span style={{ fontFamily: 'var(--ff-mono)', fontWeight: 600, color: 'var(--text-1)' }}>₦{s.value}B</span>
                <span style={{ fontFamily: 'var(--ff-mono)', fontSize: 10, color: 'var(--text-3)', width: 32, textAlign: 'right' }}>{s.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* IGR breakdown */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--r-lg)', padding: '20px', boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{ fontSize: 10, fontFamily: 'var(--ff-mono)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 16 }}>
            IGR Breakdown — ₦15.3B Total
          </div>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={IGR_BREAKDOWN} layout="vertical" margin={{ top: 0, right: 40, bottom: 0, left: 100 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8EBF2" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fontFamily: 'var(--ff-mono)', fill: '#7A8799' }}
                  tickFormatter={v => `₦${v}B`} />
                <YAxis type="category" dataKey="name" width={96} tick={{ fontSize: 10, fontFamily: 'var(--ff-mono)', fill: '#7A8799' }} />
                <Tooltip formatter={(v) => [`₦${v}B`, 'Revenue']} contentStyle={{ fontSize: 12 }} />
                <Bar dataKey="value" radius={[0, 3, 3, 0]}>
                  {IGR_BREAKDOWN.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Revenue trend */}
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 'var(--r-lg)', padding: '20px', boxShadow: 'var(--shadow-sm)', marginBottom: 36,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <div style={{ fontSize: 10, fontFamily: 'var(--ff-mono)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-3)' }}>
            Revenue Trend 2020–2024 (₦B)
          </div>
          <ShareButton label="Bayelsa Revenue Trend" />
        </div>
        <p style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: 16, marginTop: 4 }}>
          Total revenue has grown from ₦225B (2020) to ₦380B (2024) — largely driven by oil derivation increases, not IGR growth.
        </p>
        <div style={{ height: 240 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={REVENUE_TREND} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="gFaac"  x1="0" y1="0" x2="0" y2="1"><stop offset="5%"  stopColor="#1B4FC4" stopOpacity={0.2} /><stop offset="95%" stopColor="#1B4FC4" stopOpacity={0} /></linearGradient>
                <linearGradient id="gDeriv" x1="0" y1="0" x2="0" y2="1"><stop offset="5%"  stopColor="#C97400" stopOpacity={0.2} /><stop offset="95%" stopColor="#C97400" stopOpacity={0} /></linearGradient>
                <linearGradient id="gIgr"   x1="0" y1="0" x2="0" y2="1"><stop offset="5%"  stopColor="#008751" stopOpacity={0.3} /><stop offset="95%" stopColor="#008751" stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8EBF2" />
              <XAxis dataKey="year" tick={{ fontSize: 11, fontFamily: 'var(--ff-mono)', fill: '#7A8799' }} />
              <YAxis tick={{ fontSize: 11, fontFamily: 'var(--ff-mono)', fill: '#7A8799' }} tickFormatter={v => `₦${v}B`} />
              <Tooltip formatter={(v, n) => [`₦${v}B`, n]} contentStyle={{ fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11, fontFamily: 'var(--ff-mono)' }} />
              <Area type="monotone" dataKey="faac"       name="FAAC"       stroke="#1B4FC4" fill="url(#gFaac)"  strokeWidth={2} />
              <Area type="monotone" dataKey="derivation" name="Derivation" stroke="#C97400" fill="url(#gDeriv)" strokeWidth={2} />
              <Area type="monotone" dataKey="igr"        name="IGR"        stroke="#008751" fill="url(#gIgr)"   strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* IGR potential */}
      <div style={{ marginBottom: 36 }}>
        <SectionHeading label="Revenue Potential" title="IGR Gap Analysis — What's Possible" />
        <p style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 20, marginTop: -16, lineHeight: 1.6 }}>
          If Bayelsa adopted proven revenue strategies from comparable states, IGR could reach <strong>₦120B+/year</strong>.
          Currently collecting ₦15.3B — leaving ₦100B+ on the table annually.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {IGR_POTENTIAL.map((item, i) => (
            <div key={i} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--r)', padding: '14px 16px', boxShadow: 'var(--shadow-sm)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)', flex: 1 }}>{item.source}</span>
                <span style={{ fontFamily: 'var(--ff-mono)', fontSize: 12, color: '#B50000' }}>
                  Gap: ₦{item.gap.toFixed(2)}B/month
                </span>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <div style={{ flex: 1, height: 5, background: '#E8EBF2', borderRadius: 3, overflow: 'hidden', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${(item.currentMonthly / item.potentialMonthly) * 100}%`, background: '#008751', borderRadius: 3 }} />
                </div>
                <div style={{ fontSize: 11, fontFamily: 'var(--ff-mono)', color: 'var(--text-3)', flexShrink: 0 }}>
                  ₦{item.currentMonthly}B → ₦{item.potentialMonthly}B
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expenditure breakdown */}
      <div>
        <SectionHeading label="How Money Is Spent" title="Expenditure Breakdown" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 }}>
          {EXPENDITURE_BREAKDOWN.map((item, i) => {
            const colors = ['#0D132D', '#1B4FC4', '#C97400', '#008751']
            const color = colors[i % colors.length]
            return (
              <div key={i} style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 'var(--r-lg)', padding: '16px 18px', boxShadow: 'var(--shadow-sm)',
              }}>
                <div style={{ fontSize: 9, fontFamily: 'var(--ff-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 8 }}>
                  {item.name}
                </div>
                <div style={{ fontFamily: 'var(--ff-serif)', fontStyle: 'italic', fontSize: 26, color, marginBottom: 6 }}>
                  {item.pct}%
                </div>
                <div style={{ height: 4, background: '#E8EBF2', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${item.pct}%`, background: color, borderRadius: 2 }} />
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 6 }}>₦{item.value}B of ₦380B total</div>
              </div>
            )
          })}
        </div>
        <div style={{
          marginTop: 16, padding: '12px 16px', background: '#FFF2F2',
          border: '1px solid #F5AAAA', borderRadius: 'var(--r)', fontSize: 12, color: 'var(--text-1)',
        }}>
          <strong style={{ color: '#B50000' }}>▲ Key concern:</strong> 60% of spending is recurrent (salaries & admin).
          Only 30% reaches capital infrastructure — while critical sectors show budget execution rates as low as 26%.
          Unspent capital budgets (₦45B+ in FY2024) are never publicly accounted for.
        </div>
      </div>
    </PageShell>
  )
}
