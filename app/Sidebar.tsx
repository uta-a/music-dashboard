'use client'

import { motion } from 'motion/react'
import styles from './Sidebar.module.css'

const navItems = [
  { icon: 'dashboard', label: 'Overview', active: true },
  { icon: 'bar_chart', label: 'Analytics', active: false },
  { icon: 'library_music', label: 'Tracks', active: false },
  { icon: 'album', label: 'Albums', active: false },
  { icon: 'group', label: 'Audience', active: false },
  { icon: 'trending_up', label: 'Trends', active: false },
  { icon: 'campaign', label: 'Campaigns', active: false },
]

const bottomItems = [
  { icon: 'settings', label: 'Settings' },
  { icon: 'help', label: 'Support' },
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
      className={styles.sidebar}
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className={styles.logo} variants={itemVariants}>
        <span className={styles.logoIcon}>
          <span className="material-symbols-outlined" style={{ fontSize: '28px', color: 'var(--color-secondary)' }}>
            graphic_eq
          </span>
        </span>
        <span className={styles.logoText}>Pulse</span>
      </motion.div>

      <nav className={styles.nav}>
        <div className={styles.navSection}>
          <motion.span className={styles.navLabel} variants={itemVariants}>
            MENU
          </motion.span>
          {navItems.map((item) => (
            <motion.a
              key={item.label}
              href="#"
              className={`${styles.navItem} ${item.active ? styles.navItemActive : ''}`}
              variants={itemVariants}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                {item.icon}
              </span>
              <span>{item.label}</span>
              {item.active && <span className={styles.activeDot} />}
            </motion.a>
          ))}
        </div>
      </nav>

      <div className={styles.bottomSection}>
        {bottomItems.map((item) => (
          <motion.a
            key={item.label}
            href="#"
            className={styles.navItem}
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

        <motion.div className={styles.userCard} variants={itemVariants}>
          <div className={styles.avatar}>MK</div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>Mika K.</span>
            <span className={styles.userRole}>Label Manager</span>
          </div>
        </motion.div>
      </div>
    </motion.aside>
  )
}
