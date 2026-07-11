import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { GithubIcon } from '../BrandIcons'
import SectionHeading from '../SectionHeading'
import { projects } from '../../data/projects'
import { blurIn, blurOut } from '../../utils/motion'

function ProjectCard({ project, index }) {
  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    card.style.setProperty('--rx', `${-y * 6}deg`)
    card.style.setProperty('--ry', `${x * 8}deg`)
    card.style.setProperty('--tz', '22px')
    card.style.setProperty('--shadow-x', `${-x * 28}px`)
    card.style.setProperty('--shadow-y', `${-y * 20 + 18}px`)
    card.style.setProperty('--glow-x', `${(x + 0.5) * 100}%`)
    card.style.setProperty('--glow-y', `${(y + 0.5) * 100}%`)
  }

  const handleMouseLeave = (e) => {
    const card = e.currentTarget
    card.style.setProperty('--rx', '0deg')
    card.style.setProperty('--ry', '0deg')
    card.style.setProperty('--tz', '0px')
    card.style.setProperty('--shadow-x', '0px')
    card.style.setProperty('--shadow-y', '10px')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, ...blurIn(8) }}
      whileInView={{ opacity: 1, y: 0, ...blurOut() }}
      viewport={{ once: true, amount: 0.12, margin: '-8% 0px -8% 0px' }}
      transition={{ duration: 0.85, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass glow-border tilt-3d group relative flex flex-col overflow-hidden rounded-3xl"
    >
      {/* Preview panel — full-bleed cover screenshot when available, with a
          radial glow that follows the cursor (--glow-x/--glow-y set in
          handleMouseMove) for a bit of depth. Falls back to the logo mark
          on a gradient plate when no cover image is set. */}
      <div
        className="relative flex h-44 items-center justify-center overflow-hidden border-b border-white/5 sm:h-56"
        style={{
          background: project.cover
            ? undefined
            : `radial-gradient(circle at var(--glow-x, 50%) var(--glow-y, 50%), ${project.color}33, transparent 60%), linear-gradient(135deg, #0b0e1c, #05060f)`,
        }}
      >
        {project.cover ? (
          <>
            <img
              src={project.cover}
              alt={`${project.title} preview`}
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: `radial-gradient(circle at var(--glow-x, 50%) var(--glow-y, 50%), ${project.color}26, transparent 60%)`,
              }}
            />
          </>
        ) : (
          <>
            <span
              className="font-display text-4xl font-semibold opacity-20 transition-opacity duration-300 group-hover:opacity-40"
              style={{ color: project.color, display: project.logo ? 'none' : undefined }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            {project.logo && (
              <img
                src={project.logo}
                alt={`${project.title} logo`}
                className="relative h-16 w-16 transition-transform duration-300 group-hover:scale-110"
              />
            )}
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-medium text-star">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-4 border-t border-white/5 pt-4">
          <a
            href={project.liveUrl || '#'}
            data-cursor-hover
            aria-disabled={!project.liveUrl}
            target={project.liveUrl ? '_blank' : undefined}
            rel="noopener noreferrer"
            className={`flex items-center gap-1 font-mono text-xs uppercase tracking-wide transition-colors ${
              project.liveUrl ? 'text-accent hover:text-star' : 'pointer-events-none text-muted/40'
            }`}
          >
            Live demo <ArrowUpRight size={14} />
          </a>
          <a
            href={project.githubUrl || '#'}
            data-cursor-hover
            aria-disabled={!project.githubUrl}
            target={project.githubUrl ? '_blank' : undefined}
            rel="noopener noreferrer"
            className={`flex items-center gap-1 font-mono text-xs uppercase tracking-wide transition-colors ${
              project.githubUrl ? 'text-muted hover:text-star' : 'pointer-events-none text-muted/40'
            }`}
          >
            <GithubIcon size={14} /> Code
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-32">
      <SectionHeading eyebrow="Projects" title="Selected work" />

      <div className="mx-auto grid max-w-md grid-cols-1 gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
