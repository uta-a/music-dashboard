import { motion } from 'motion/react'

const navItems = [
  { icon: 'dashboard', label: '概要', active: true },
  { icon: 'bar_chart', label: 'アナリティクス', active: false },
  { icon: 'library_music', label: 'トラック', active: false },
  { icon: 'album', label: 'アルバム', active: false },
  { icon: 'group', label: 'オーディエンス', active: false },
  { icon: 'trending_up', label: 'トレンド', active: false },
  { icon: 'campaign', label: 'キャンペーン', active: false },
]

const bottomItems = [
  { icon: 'settings', label: '設定' },
  { icon: 'help', label: 'サポート' },
]

const sidebarVariants = {
  hidden: { x: -260, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 80,
      damping: 20,
      staggerChildren: 0.06,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { x: -30, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 120, damping: 14 },
  },
}

export default function Sidebar() {
  return (
    <motion.aside
      className="fixed top-0 left-0 w-[260px] h-screen bg-[var(--color-surface)] border-r border-[var(--color-border)] flex flex-col p-6 px-4 z-[100] overflow-y-auto"
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="flex items-center gap-3 px-3 py-2 mb-8" variants={itemVariants}>
        <span className="flex items-center justify-center w-10 h-10 bg-[var(--color-surface-elevated)] rounded-[12px] border border-[var(--color-border)]">
          <span className="material-symbols-outlined" style={{ fontSize: '28px', color: 'var(--color-secondary)' }}>
            graphic_eq
          </span>
        </span>
        <span className="font-[var(--font-display)] text-2xl font-extrabold tracking-tight bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text" style={{ WebkitTextFillColor: 'transparent', fontFamily: 'var(--font-display)' }}>
          Pulse
        </span>
      </motion.div>

      <nav className="flex-1">
        <div className="flex flex-col gap-0.5">
          <motion.span
            className="text-[0.7rem] font-semibold tracking-[0.12em] text-[var(--color-muted)] px-3 py-2 mb-1"
            variants={itemVariants}
          >
            メニュー
          </motion.span>
          {navItems.map((item) => (
            <motion.a
              key={item.label}
              href="#"
              className={`flex items-center gap-3 py-[0.65rem] px-3 rounded-[6px] no-underline text-sm font-medium cursor-pointer transition-[background,color] duration-200 relative ${
                item.active
                  ? 'bg-[var(--color-surface-elevated)] text-[var(--color-primary)]'
                  : 'text-[var(--color-muted)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-primary)]'
              }`}
              variants={itemVariants}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.97 }}
            >
              {item.active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[60%] bg-[var(--color-secondary)] rounded-r-[3px]" />
              )}
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                {item.icon}
              </span>
              <span>{item.label}</span>
              {item.active && (
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)] ml-auto shadow-[0_0_8px_var(--color-secondary)]" />
              )}
            </motion.a>
          ))}
        </div>
      </nav>

      <div className="flex flex-col gap-0.5 border-t border-[var(--color-border)] pt-4 mt-4">
        {bottomItems.map((item) => (
          <motion.a
            key={item.label}
            href="#"
            className="flex items-center gap-3 py-[0.65rem] px-3 rounded-[6px] text-[var(--color-muted)] no-underline text-sm font-medium cursor-pointer transition-[background,color] duration-200 hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-primary)]"
            variants={itemVariants}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
              {item.icon}
            </span>
            <span>{item.label}</span>
          </motion.a>
        ))}

        <motion.div
          className="flex items-center gap-3 p-3 mt-3 rounded-[12px] border border-[var(--color-border)]"
          style={{ background: 'linear-gradient(135deg, rgba(180, 255, 57, 0.05) 0%, rgba(255, 45, 85, 0.05) 100%)' }}
          variants={itemVariants}
        >
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-[var(--color-bg)] shrink-0" style={{ background: 'linear-gradient(135deg, var(--color-secondary), var(--color-accent))' }}>
            MK
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-[0.813rem] font-semibold text-[var(--color-primary)] whitespace-nowrap overflow-hidden text-ellipsis">Mika K.</span>
            <span className="text-[0.688rem] text-[var(--color-muted)]">レーベルマネージャー</span>
          </div>
        </motion.div>
      </div>
    </motion.aside>
  )
}
