import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

interface ChartPlaceholderProps {
  title: string
  subtitle?: string
  type: 'bar' | 'line' | 'donut' | 'heatmap'
  span?: 1 | 2
}

function BarChart() {
  const heights = [45, 72, 58, 88, 65, 92, 40, 78, 55, 85, 68, 95]
  return (
    <div className="w-full h-full flex items-end gap-1.5 pt-2">
      {heights.map((h, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-t min-h-1 transition-[background] duration-200 hover:brightness-130"
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          transition={{
            duration: 0.8,
            delay: 0.6 + i * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            background:
              h > 80
                ? 'var(--color-secondary)'
                : h > 60
                  ? 'var(--color-muted)'
                  : 'var(--color-border)',
          }}
        />
      ))}
    </div>
  )
}

function LineChart() {
  return (
    <div className="w-full h-full">
      <svg viewBox="0 0 400 120" fill="none" preserveAspectRatio="none" className="w-full h-full">
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-secondary)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--color-secondary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0 90 Q40 85 70 60 T140 50 T210 35 T280 45 T350 20 T400 15"
          stroke="var(--color-secondary)"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
        <path
          d="M0 90 Q40 85 70 60 T140 50 T210 35 T280 45 T350 20 T400 15 L400 120 L0 120 Z"
          fill="url(#lineGrad)"
          opacity="0.5"
        />
        <motion.path
          d="M0 70 Q50 75 100 80 T200 65 T300 70 T400 55"
          stroke="var(--color-accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
    </div>
  )
}

function DonutChart() {
  const segments = [
    { pct: 35, color: 'var(--color-secondary)' },
    { pct: 25, color: 'var(--color-accent)' },
    { pct: 20, color: 'var(--color-muted)' },
    { pct: 20, color: 'var(--color-border)' },
  ]
  const radius = 60
  const circumference = 2 * Math.PI * radius
  let offset = 0

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <svg viewBox="0 0 160 160" className="w-40 h-40">
        {segments.map((seg, i) => {
          const dashLen = (seg.pct / 100) * circumference
          const dashOffset = -offset
          offset += dashLen
          return (
            <motion.circle
              key={i}
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth="18"
              strokeDasharray={`${dashLen} ${circumference - dashLen}`}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
              style={{ transformOrigin: 'center' }}
            />
          )
        })}
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-extrabold text-[var(--color-primary)] tracking-tight" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>847K</span>
        <span className="text-[0.688rem] text-[var(--color-muted)] uppercase tracking-[0.05em]">合計</span>
      </div>
    </div>
  )
}

function HeatmapChart() {
  const rows = 7
  const cols = 12
  return (
    <div className="w-full grid grid-cols-12 gap-[3px]">
      {Array.from({ length: rows * cols }, (_, i) => {
        const intensity = Math.random()
        const color =
          intensity > 0.7
            ? 'var(--color-secondary)'
            : intensity > 0.4
              ? 'var(--color-muted)'
              : 'var(--color-border)'
        const opacity = 0.3 + intensity * 0.7
        return (
          <motion.div
            key={i}
            className="aspect-square rounded-[3px] transition-transform duration-150 hover:scale-140 hover:z-[2]"
            style={{ background: color, opacity }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity }}
            transition={{ duration: 0.3, delay: 0.4 + i * 0.008 }}
          />
        )
      })}
    </div>
  )
}

const chartComponents = {
  bar: BarChart,
  line: LineChart,
  donut: DonutChart,
  heatmap: HeatmapChart,
}

export default function ChartPlaceholder({
  title,
  subtitle,
  type,
  span = 1,
}: ChartPlaceholderProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const Chart = chartComponents[type]

  return (
    <motion.div
      ref={ref}
      className={`bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[20px] p-6 flex flex-col min-h-[280px] ${span === 2 ? 'col-span-2 max-[900px]:col-span-1' : ''}`}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-base font-bold tracking-tight text-[var(--color-primary)] mb-0.5" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}>{title}</h3>
          {subtitle && <p className="text-xs text-[var(--color-muted)]">{subtitle}</p>}
        </div>
        <button className="bg-transparent border border-[var(--color-border)] rounded-[6px] text-[var(--color-muted)] w-8 h-8 flex items-center justify-center cursor-pointer transition-[background,color] duration-200 hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-primary)]">
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
            more_horiz
          </span>
        </button>
      </div>
      <div className="flex-1 flex items-end">
        <Chart />
      </div>
    </motion.div>
  )
}
