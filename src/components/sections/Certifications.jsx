import { motion } from 'framer-motion'
import { ExternalLink, ShieldCheck } from 'lucide-react'
import { MicrosoftLogo } from '../BrandIcons'
import SectionHeading from '../SectionHeading'
import { certifications } from '../../data/certifications'
import { useTilt } from '../../hooks/useTilt'
import { blurIn, blurOut } from '../../utils/motion'

const cardMotion = (index) => ({
  initial: { opacity: 0, y: 30, ...blurIn(6) },
  whileInView: { opacity: 1, y: 0, ...blurOut() },
  viewport: { once: true, amount: 0.12, margin: '-8% 0px -8% 0px' },
  transition: { duration: 0.8, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] },
})

/** Real certificate/credential — shown in full, uncropped, no click required. */
function ImageCertCard({ cert, index }) {
  const { handleMouseMove, handleMouseLeave } = useTilt()
  return (
    <motion.div
      {...cardMotion(index)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass glow-border tilt-3d group overflow-hidden rounded-2xl"
    >
      <div className="bg-white/[0.02] p-3">
        <img
          src={cert.image}
          alt={cert.name}
          className="w-full rounded-lg object-contain"
          loading="lazy"
        />
      </div>
      <div className="p-6 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-base font-medium text-star">{cert.name}</h3>
            <p className="mt-1 text-sm text-muted">{cert.issuer}</p>
          </div>
          {cert.verifyUrl && (
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="mt-1 flex shrink-0 items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-teal opacity-70 transition-opacity hover:opacity-100"
            >
              Verify <ExternalLink size={11} />
            </a>
          )}
        </div>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-muted/60">
          {cert.date}
        </p>
      </div>
    </motion.div>
  )
}

/**
 * Microsoft Learn only issues a shareable achievement link per module (no
 * downloadable certificate graphic) — so rather than fabricating a fake
 * "official" Microsoft certificate, all completed modules are consolidated
 * into one honest, professionally designed credential card: real Microsoft
 * mark, real module titles, real verify links for each.
 */
function MicrosoftCombinedCard({ cert, index }) {
  const { handleMouseMove, handleMouseLeave } = useTilt()
  return (
    <motion.div
      {...cardMotion(index)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass glow-border tilt-3d group relative overflow-hidden rounded-2xl p-7 sm:col-span-2"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1"
        style={{
          background: 'linear-gradient(90deg, #F25022, #7FBA00, #00A4EF, #FFB900)',
        }}
      />

      <div className="relative flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04] p-2.5">
            <MicrosoftLogo size={24} />
          </div>
          <div>
            <h3 className="font-display text-lg font-medium text-star">{cert.name}</h3>
            <p className="text-sm text-muted">{cert.issuer}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-teal">
          <ShieldCheck size={12} /> {cert.modules.length} Modules Verified
        </div>
      </div>

      <ul className="relative mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {cert.modules.map((mod) => (
          <li
            key={mod.name}
            className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3"
          >
            <span className="text-sm text-star/90">{mod.name}</span>
            {mod.verifyUrl && (
              <a
                href={mod.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                aria-label={`Verify ${mod.name}`}
                className="shrink-0 text-muted transition-colors hover:text-teal"
              >
                <ExternalLink size={13} />
              </a>
            )}
          </li>
        ))}
      </ul>

      <p className="relative mt-4 font-mono text-[11px] uppercase tracking-wider text-muted/60">
        {cert.date}
      </p>
    </motion.div>
  )
}

export default function Certifications() {
  return (
    <section id="certifications" className="relative mx-auto max-w-5xl px-6 py-32">
      <SectionHeading eyebrow="Certifications" title="Verified learning" />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {certifications.map((cert, i) => {
          if (cert.type === 'ms-combined') {
            return <MicrosoftCombinedCard key={cert.id} cert={cert} index={i} />
          }
          return <ImageCertCard key={cert.id} cert={cert} index={i} />
        })}
      </div>
    </section>
  )
}
