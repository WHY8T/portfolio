import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import HoloIDCard from '../HoloIDCard'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-16 text-center sm:pt-24"
    >
      {/* Holographic backdrop glow, unique to the opening section */}
      <div
        className="hero-glow pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-[680px] sm:w-[680px]"
        aria-hidden="true"
      />

      <HoloIDCard />

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        className="mt-6 max-w-xl text-balance text-base text-muted sm:mt-8 sm:text-lg"
      >
        I design and build backend systems, APIs, and full-stack products,
        currently reading applied mathematics and statistics at{' '}
        <span className="text-star">ENSSEA</span>.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.15, duration: 0.7 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:mt-10"
      >
        <a
          href="#projects"
          data-cursor-hover
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="glow-border rounded-full bg-accent/90 px-6 py-3 font-mono text-xs uppercase tracking-widest text-void transition-transform hover:scale-105 hover:bg-accent"
        >
          View Projects
        </a>
        <a
          href="#contact"
          data-cursor-hover
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="glass rounded-full px-6 py-3 font-mono text-xs uppercase tracking-widest text-star transition-transform hover:scale-105"
        >
          Get in Touch
        </a>
      </motion.div>

      <motion.button
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        data-cursor-hover
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.6, duration: 0.6 }, y: { repeat: Infinity, duration: 1.8, ease: 'easeInOut' } }}
        className="mt-14 flex flex-col items-center gap-2 text-muted sm:absolute sm:bottom-8 sm:mt-0"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ArrowDown size={16} />
      </motion.button>
    </section>
  )
}
