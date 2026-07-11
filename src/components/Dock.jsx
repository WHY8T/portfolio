import { motion } from 'framer-motion'
import { Home, FolderGit2, Mail } from 'lucide-react'

const DOCK_LINKS = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'contact', label: 'Contact', icon: Mail },
]

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

/**
 * Sits in-flow at the very bottom of the page (not pinned to the viewport)
 * — a last "quick links" strip below the footer. Each item grows smoothly
 * on hover/tap, like a dock.
 */
export default function Dock() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative z-10 mx-auto flex max-w-md items-center justify-center gap-3 px-6 pb-14"
    >
      {DOCK_LINKS.map((link) => {
        const Icon = link.icon
        return (
          <motion.button
            key={link.id}
            type="button"
            onClick={() => scrollToSection(link.id)}
            data-cursor-hover
            aria-label={link.label}
            whileHover={{ scale: 1.18, y: -4 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            className="glass glow-border flex flex-col items-center gap-1.5 rounded-2xl px-6 py-3 text-muted transition-colors hover:text-star"
          >
            <Icon size={18} />
            <span className="font-mono text-[10px] uppercase tracking-wider">{link.label}</span>
          </motion.button>
        )
      })}
    </motion.nav>
  )
}
