import { motion } from 'motion/react'

interface StatCardProps {
  icon: string
  label: string
  value: string
  change: string
  changePositive: boolean
  size: 'large' | 'medium' | 'small'
  rotate?: number
  accent?: 'green' | 'pink' | 'neutral'
  delay?: number
  zIndex?: number
  offsetY?: number
}

const sizeStyles = {
  large: 'p-8',
  medium: 'p-6',
  small: 'p-5',
}

const valueSizes = {
  large: 'text-[clamp(2rem,3vw,3rem)]',
  medium: 'text-[clamp(1.5rem,2.5vw,2.25rem)]',
  small: 'text-[clamp(1.25rem,2vw,1.75rem)]',
}

const accentStyles = {
  green: {
    card: 'shadow-[0_4px_24px_rgba(0,0,0,0.4),0_0_40px_rgba(180,255,57,0.15)] border-[rgba(180,255,57,0.15)]',
    icon: 'bg-[rgba(180,255,57,0.1)] text-[var(--color-secondary)]',
    sparkline: 'text-[var(--color-secondary)]',
  },
  pink: {
    card: 'shadow-[0_4px_24px_rgba(0,0,0,0.4),0_0_40px_rgba(255,45,85,0.15)] border-[rgba(255,45,85,0.15)]',
    icon: 'bg-[rgba(255,45,85,0.1)] text-[var(--color-accent)]',
    sparkline: 'text-[var(--color-accent)]',
  },
  neutral: {
    card: 'shadow-[0_4px_24px_rgba(0,0,0,0.4)]',
    icon: 'bg-[var(--color-surface-elevated)] text-[var(--color-muted)]',
    sparkline: 'text-[var(--color-muted)]',
  },
}

export default function StatCard({
  icon,
  label,
  value,
  change,
  changePositive,
  size,
  rotate = 0,
  accent = 'neutral',
  delay = 0,
  zIndex = 1,
  offsetY = 0,
}: StatCardProps) {
  const accentStyle = accentStyles[accent]

  return (
    <motion.div
      className={`relative bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[20px] overflow-hidden cursor-pointer ${sizeStyles[size]} ${accentStyle.card}`}
      style={{
        zIndex,
        transform: `rotate(${rotate}deg) translateY(${offsetY}px)`,
      }}
      initial={{
        opacity: 0,
        y: 80 + Math.abs(rotate * 5),
        rotate: rotate * 2,
        scale: 0.7,
      }}
      animate={{
        opacity: 1,
        y: offsetY,
        rotate,
        scale: 1,
      }}
      transition={{
        type: 'spring' as const,
        stiffness: 60,
        damping: 16,
        delay,
      }}
      whileHover={{
        y: offsetY - 8,
        rotate: 0,
        scale: 1.03,
        transition: { type: 'spring' as const, stiffness: 300, damping: 20 },
      }}
    >
      <div className="flex items-center gap-2.5 mb-4">
        <div className={`w-9 h-9 rounded-[6px] flex items-center justify-center ${accentStyle.icon}`}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
            {icon}
          </span>
        </div>
        <span className="text-xs font-semibold tracking-[0.05em] uppercase text-[var(--color-muted)]">{label}</span>
      </div>

      <div className="mb-2">
        <span className={`font-extrabold tracking-tight leading-[1.1] ${valueSizes[size]}`} style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}>
          {value}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-0.5 text-xs font-semibold py-0.5 px-2 rounded-full ${
            changePositive
              ? 'bg-[rgba(180,255,57,0.1)] text-[var(--color-secondary)]'
              : 'bg-[rgba(255,45,85,0.1)] text-[var(--color-accent)]'
          }`}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>
            {changePositive ? 'trending_up' : 'trending_down'}
          </span>
          {change}
        </span>
        <span className="text-[0.688rem] text-[var(--color-muted)]">前月比</span>
      </div>

      <div className={`absolute bottom-0 right-0 w-1/2 h-8 opacity-50 pointer-events-none ${accentStyle.sparkline}`}>
        <svg viewBox="0 0 120 32" fill="none" preserveAspectRatio="none" className="w-full h-full">
          <path
            d={
              changePositive
                ? 'M0 28 Q15 24 25 20 T50 16 T75 10 T100 8 T120 4'
                : 'M0 8 Q15 10 25 14 T50 18 T75 22 T100 26 T120 28'
            }
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.4"
          />
        </svg>
      </div>
    </motion.div>
  )
}
