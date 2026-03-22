import { motion } from 'motion/react'
import Sidebar from './Sidebar'
import StatCard from './StatCard'
import ChartPlaceholder from './ChartPlaceholder'

const stats = [
  {
    icon: 'play_circle',
    label: '総再生回数',
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
    label: '月間リスナー',
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
    label: '収益',
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
    label: '保存率',
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
    label: 'シェア数',
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

export default function Dashboard() {
  return (
    <>
      <Sidebar />

      <main className="ml-[260px] min-h-screen py-8 px-10 pb-16 relative overflow-hidden max-[900px]:ml-0 max-[900px]:p-6">
        {/* Atmospheric gradient blobs */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div
            className="absolute rounded-full"
            style={{
              top: '-15%',
              right: '-10%',
              width: '600px',
              height: '600px',
              background: 'radial-gradient(circle, rgba(180, 255, 57, 0.06) 0%, transparent 70%)',
              filter: 'blur(80px)',
              animation: 'float1 20s ease-in-out infinite',
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              bottom: '-20%',
              left: '10%',
              width: '500px',
              height: '500px',
              background: 'radial-gradient(circle, rgba(255, 45, 85, 0.05) 0%, transparent 70%)',
              filter: 'blur(80px)',
              animation: 'float2 25s ease-in-out infinite',
            }}
          />
        </div>

        {/* Header */}
        <motion.header
          className="flex items-end justify-between mb-10 relative z-[1] max-[900px]:flex-col max-[900px]:items-start max-[900px]:gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div>
            <motion.h1
              className="text-[clamp(2rem,4vw+0.5rem,3.5rem)] font-extrabold tracking-tighter leading-[1.1] text-[var(--color-primary)]"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.04em' }}
              initial={{ opacity: 0, x: -40, rotate: -3 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{
                type: 'spring' as const,
                stiffness: 60,
                damping: 14,
                delay: 0.4,
              }}
            >
              ダッシュボード
            </motion.h1>
            <motion.p
              className="text-sm text-[var(--color-muted)] mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              2026年3月の概要 — 全プラットフォーム
            </motion.p>
          </div>
          <motion.div
            className="flex gap-3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <button className="flex items-center gap-2 py-2.5 px-4 border border-[var(--color-border)] rounded-[6px] bg-[var(--color-surface)] text-[var(--color-primary)] text-[0.813rem] font-medium cursor-pointer transition-[border-color,background] duration-200 hover:border-[var(--color-muted)] hover:bg-[var(--color-surface-elevated)]" style={{ fontFamily: 'var(--font-body)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                calendar_month
              </span>
              過去30日間
            </button>
            <button className="flex items-center gap-2 py-2.5 px-5 border-none rounded-[6px] bg-[var(--color-secondary)] text-[var(--color-bg)] text-[0.813rem] font-semibold cursor-pointer transition-[filter,transform] duration-200 hover:brightness-110 hover:-translate-y-px" style={{ fontFamily: 'var(--font-body)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                download
              </span>
              エクスポート
            </button>
          </motion.div>
        </motion.header>

        {/* Stat cards */}
        <section className="mb-12 relative z-[1]">
          <div className="stats-grid">
            {stats.map((stat, i) => (
              <StatCard key={stat.label} {...stat} delay={0.3 + i * 0.1} />
            ))}
          </div>
        </section>

        {/* Charts section */}
        <section className="mb-12 relative z-[1]">
          <motion.h2
            className="section-title text-xl font-bold tracking-tight text-[var(--color-primary)] mb-5 relative z-[1]"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            パフォーマンス
          </motion.h2>

          <div className="grid grid-cols-2 gap-4 max-[900px]:grid-cols-1">
            <ChartPlaceholder
              title="再生トレンド"
              subtitle="各プラットフォームの日別再生数"
              type="line"
              span={2}
            />
            <ChartPlaceholder
              title="トップトラック"
              subtitle="トラック別再生数"
              type="bar"
            />
            <ChartPlaceholder
              title="プラットフォーム構成"
              subtitle="リスナー分布"
              type="donut"
            />
            <ChartPlaceholder
              title="リスニングアクティビティ"
              subtitle="時間帯別ヒートマップ — 過去12週"
              type="heatmap"
              span={2}
            />
          </div>
        </section>

        {/* Recent activity strip */}
        <motion.section
          className="relative z-[1]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
        >
          <h2
            className="section-title text-xl font-bold tracking-tight text-[var(--color-primary)] mb-5 relative z-[1]"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
          >
            最近のアクティビティ
          </h2>
          <div className="flex flex-col gap-0.5">
            {[
              {
                icon: 'playlist_add',
                text: '「Midnight Drive」が342のプレイリストに追加',
                time: '2時間前',
                color: 'var(--color-secondary)',
              },
              {
                icon: 'trending_up',
                text: '「Neon Sky」が再生回数100万回を達成',
                time: '5時間前',
                color: 'var(--color-accent)',
              },
              {
                icon: 'public',
                text: 'ブラジルからの新規リスナー +28%',
                time: '12時間前',
                color: 'var(--color-secondary)',
              },
              {
                icon: 'star',
                text: '「Discover Weekly」でフィーチャー',
                time: '1日前',
                color: 'var(--color-accent)',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3.5 py-3.5 px-4 rounded-[6px] bg-[var(--color-surface)] border border-transparent cursor-pointer transition-[border-color,background] duration-200 hover:border-[var(--color-border)] hover:bg-[var(--color-surface-elevated)]"
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
                <span className="flex-1 text-sm text-[var(--color-primary)]">{item.text}</span>
                <span className="text-xs text-[var(--color-muted)] whitespace-nowrap">{item.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
    </>
  )
}
