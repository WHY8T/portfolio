import { motion } from 'framer-motion'
import SectionHeading from '../SectionHeading'
import { useTilt } from '../../hooks/useTilt'
import { blurIn, blurOut } from '../../utils/motion'

export default function About() {
  const { handleMouseMove, handleMouseLeave } = useTilt(3)

  return (
    <section id="about" className="relative mx-auto max-w-4xl px-6 py-32">
      <SectionHeading eyebrow="About" title="Building at the intersection of data and software" />

      <motion.div
        initial={{ opacity: 0, y: 40, ...blurIn(8) }}
        whileInView={{ opacity: 1, y: 0, ...blurOut() }}
        viewport={{ once: true, amount: 0.12, margin: '-10% 0px -10% 0px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="glass glow-border tilt-3d rounded-3xl p-8 sm:p-10"
      >
        <p className="text-lg leading-relaxed text-muted sm:text-xl">
          I design and build software — backend systems, APIs, and full-stack
          products carried from concept through to production. My approach is
          rooted in precision and rigor: understanding a problem deeply before
          writing a single line of code, and favoring solutions that are
          well-reasoned over ones that simply work. That discipline shows up
          in everything I ship, from the architecture of a system to the
          smallest detail of its interface.
        </p>
        <p className="mt-5 text-lg leading-relaxed text-muted sm:text-xl">
          I bring the same standard of rigor to my academic background,
          currently studying applied mathematics and statistics at{' '}
          <span className="font-medium text-star">
            ENSSEA (École Nationale Supérieure de Statistique et d'Économie
            Appliquée)
          </span>
          .
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: 'Institution', value: 'ENSSEA' },
            { label: 'Focus', value: 'Full-Stack & APIs' },
            { label: 'Based in', value: 'Algeria' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16, ...blurIn(4) }}
              whileInView={{ opacity: 1, y: 0, ...blurOut() }}
              viewport={{ once: true, amount: 0.15, margin: '-5% 0px -5% 0px' }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted/70">
                {item.label}
              </p>
              <p className="mt-1 font-display text-sm text-star">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
