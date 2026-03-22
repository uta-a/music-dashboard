'use client'

import { motion } from 'motion/react'
import Sidebar from './Sidebar'
import StatCard from './StatCard'
import ChartPlaceholder from './ChartPlaceholder'
import styles from './page.module.css'

const stats = [
  {
    icon: 'play_circle',
    label: 'Total Streams',
    value: '2.4M',
    change: '+18.2%',
    changePositive: true,
    size: 'large' as const,
    rotate: -2,
    accent: 'green' as const,
    zIndex: 3,
    offsetY: 0,
  },
  {
    icon: 'person',
    label: 'Monthly Listeners',
    value: '847K',
    change: '+12.5%',
    changePositive: true,
    size: 'medium' as const,
    rotate: 1.5,
    accent: 'pink' as const,
    zIndex: 2,
    offsetY: -12,
  },
  {
    icon: 'attach_money',
    label: 'Revenue',
    value: '$34.2K',
    change: '+8.7%',
    changePositive: true,
    size: 'medium' as const,
    rotate: -1,
    accent: 'neutral' as const,
    zIndex: 1,
    offsetY: 8,
  },
  {
    icon: 'favorite',
    label: 'Save Rate',
    value: '6.8%',
    change: '-0.3%',
    changePositive: false,
    size: 'small' as const,
    rotate: 2.5,
    accent: 'neutral' as const,
    zIndex: 2,
    offsetY: -6,
  },
  {
    icon: 'share',
    label: 'Shares',
    value: '52.1K',
    change: '+24.6%',
    changePositive: true,
    size: 'small' as const,
    rotate: -1.5,
    accent: 'green' as const,
    zIndex: 1,
    offsetY: 14,
  },
]

export default function DashboardPage() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
      />

      <Sidebar />

      <main className={styles.main}>
        {/* Atmospheric gradient blobs */}
        <div className={styles.atmosphere}>
          <div className={styles.blobGreen} />
          <div className={styles.blobPink} />
        </div>

        {/* Header */}
        <motion.header
          className={styles.header}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div>
            <motion.h1
              className={styles.title}
              initial={{ opacity: 0, x: -40, rotate: -3 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{
                type: 'spring' as const,
                stiffness: 60,
                damping: 14,
                delay: 0.4,
              }}
            >
              Dashboard
            </motion.h1>
            <motion.p
              className={styles.subtitle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              March 2026 overview — all platforms
            </motion.p>
          </div>
          <motion.div
            className={styles.headerActions}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <button className={styles.btnOutline}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                calendar_month
              </span>
              Last 30 days
            </button>
            <button className={styles.btnPrimary}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                download
              </span>
              Export
            </button>
          </motion.div>
        </motion.header>

        {/* Stat cards — non-uniform scattered layout */}
        <section className={styles.statsSection}>
          <div className={styles.statsGrid}>
            {stats.map((stat, i) => (
              <StatCard key={stat.label} {...stat} delay={0.3 + i * 0.1} />
            ))}
          </div>
        </section>

        {/* Charts section */}
        <section className={styles.chartsSection}>
          <motion.h2
            className={styles.sectionTitle}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            Performance
          </motion.h2>

          <div className={styles.chartsGrid}>
            <ChartPlaceholder
              title="Stream Trends"
              subtitle="Daily streams across platforms"
              type="line"
              span={2}
            />
            <ChartPlaceholder
              title="Top Tracks"
              subtitle="Streams by track"
              type="bar"
            />
            <ChartPlaceholder
              title="Platform Split"
              subtitle="Listener distribution"
              type="donut"
            />
            <ChartPlaceholder
              title="Listening Activity"
              subtitle="Hourly heatmap — last 12 weeks"
              type="heatmap"
              span={2}
            />
          </div>
        </section>

        {/* Recent activity strip */}
        <motion.section
          className={styles.activitySection}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
        >
          <h2 className={styles.sectionTitle}>Recent Activity</h2>
          <div className={styles.activityStrip}>
            {[
              {
                icon: 'playlist_add',
                text: '"Midnight Drive" added to 342 playlists',
                time: '2h ago',
                color: 'var(--color-secondary)',
              },
              {
                icon: 'trending_up',
                text: '"Neon Sky" hit 1M streams',
                time: '5h ago',
                color: 'var(--color-accent)',
              },
              {
                icon: 'public',
                text: 'New listeners from Brazil +28%',
                time: '12h ago',
                color: 'var(--color-secondary)',
              },
              {
                icon: 'star',
                text: 'Featured on "Discover Weekly"',
                time: '1d ago',
                color: 'var(--color-accent)',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className={styles.activityItem}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.4 + i * 0.1 }}
                whileHover={{ scale: 1.02, x: 4 }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: '20px', color: item.color }}
                >
                  {item.icon}
                </span>
                <span className={styles.activityText}>{item.text}</span>
                <span className={styles.activityTime}>{item.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
    </>
  )
}
