import { motion } from 'framer-motion'
import { blurIn, blurOut } from '../utils/motion'

/**
 * Shared heading pattern used at the top of every content section:
 * a small mono "eyebrow" label + a larger display-font title.
 * Both reveal on scroll via whileInView (once: true so it doesn't
 * re-trigger every time the user scrolls back up/down past it).
 */
export default function SectionHeading({ eyebrow, title, align = 'left' }) {
  const isCenter = align === 'center'

  return (
    <div className={`mb-12 ${isCenter ? 'text-center' : 'text-left'}`}>
      <motion.p
        initial={{ opacity: 0, y: 12, ...blurIn(6) }}
        whileInView={{ opacity: 1, y: 0, ...blurOut() }}
        viewport={{ once: true, amount: 0.15, margin: '-10% 0px -10% 0px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-3 font-mono text-xs uppercase tracking-[0.35em] text-teal"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 24, ...blurIn(8) }}
        whileInView={{ opacity: 1, y: 0, ...blurOut() }}
        viewport={{ once: true, amount: 0.15, margin: '-10% 0px -10% 0px' }}
        transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-3xl font-semibold sm:text-4xl"
      >
        {title}
      </motion.h2>
    </div>
  )
}
