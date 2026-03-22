'use client'

import { motion } from 'motion/react'
import styles from './StatCard.module.css'

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
  const sizeClass = styles[`card${size.charAt(0).toUpperCase() + size.slice(1)}`]
  const accentClass = styles[`accent${accent.charAt(0).toUpperCase() + accent.slice(1)}`]

  return (
    <motion.div
      className={`${styles.card} ${sizeClass} ${accentClass}`}
      style={{
        zIndex,
        '--card-rotate': `${rotate}deg`,
        '--card-offset-y': `${offsetY}px`,
      } as React.CSSProperties}
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
      <div className={styles.cardHeader}>
        <div className={styles.iconWrap}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
            {icon}
          </span>
        </div>
        <span className={styles.label}>{label}</span>
      </div>

      <div className={styles.valueRow}>
        <span className={styles.value}>{value}</span>
      </div>

      <div className={styles.changeRow}>
        <span
          className={`${styles.change} ${changePositive ? styles.changeUp : styles.changeDown}`}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>
            {changePositive ? 'trending_up' : 'trending_down'}
          </span>
          {change}
        </span>
        <span className={styles.period}>vs last month</span>
      </div>

      <div className={styles.sparkline}>
        <svg viewBox="0 0 120 32" fill="none" preserveAspectRatio="none">
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
