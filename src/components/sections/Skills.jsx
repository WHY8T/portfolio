import { useState } from 'react'
import { motion } from 'framer-motion'
import * as SiIcons from 'react-icons/si'
import { VSCodeIcon, OpenRouterIcon, N8nIcon, ClaudeCodeIcon } from '../BrandIcons'
import SectionHeading from '../SectionHeading'
import { skillGroups } from '../../data/skills'
import { useTilt } from '../../hooks/useTilt'
import { blurIn, blurOut } from '../../utils/motion'

// A couple of brand marks (VS Code, OpenRouter, n8n, Claude Code) are
// hand-rolled in BrandIcons.jsx instead of pulled from react-icons/si, so
// they're resolved here first.
const CUSTOM_ICONS = {
  VSCode: VSCodeIcon,
  OpenRouter: OpenRouterIcon,
  N8n: N8nIcon,
  ClaudeCode: ClaudeCodeIcon,
}

/**
 * On desktop each skill is a small square "badge" with a circular SVG
 * progress ring around the tool's logo. On phones that grid of squares gets
 * cramped, so below `sm` it collapses into a single-column list instead:
 * one tall row per tool — logo tile on the left, name beside it, stacked
 * one above another — which is far easier to scan on a narrow screen.
 */
function SkillBadge({ name, level, icon, color, accent, index }) {
  const radius = 18
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (level / 100) * circumference
  const Icon = CUSTOM_ICONS[icon] || SiIcons[icon]
  const { handleMouseMove, handleMouseLeave } = useTilt(8)

  // Tap/click ripple — a short-lived expanding circle spawned at the
  // click point, self-removes once its fade-out animation finishes.
  const [ripples, setRipples] = useState([])
  // Holo shimmer only plays once, on click — not on hover, not on a loop.
  const [holoActive, setHoloActive] = useState(false)

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height) * 1.4
    const id = Date.now() + Math.random()
    setRipples((prev) => [
      ...prev,
      { id, x: e.clientX - rect.left - size / 2, y: e.clientY - rect.top - size / 2, size },
    ])

    setHoloActive(false)
    // restart the CSS animation even if it's still running from a fast re-click
    requestAnimationFrame(() => setHoloActive(true))
  }

  const removeRipple = (id) => setRipples((prev) => prev.filter((r) => r.id !== id))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96, ...blurIn(6) }}
      whileInView={{ opacity: 1, y: 0, scale: 1, ...blurOut() }}
      viewport={{ once: true, amount: 0.15, margin: '-8% 0px -8% 0px' }}
      transition={{ duration: 0.65, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.94 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`tool-badge tool-holo glass glow-border tilt-3d relative flex flex-row items-center gap-4 overflow-hidden px-4 py-4 text-left sm:flex-col sm:gap-3 sm:px-4 sm:py-5 sm:text-center ${holoActive ? 'tool-holo--active' : ''}`}
      onAnimationEnd={() => setHoloActive(false)}
    >
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          className="tool-ripple"
          style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
          initial={{ scale: 0, opacity: 0.65 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          onAnimationComplete={() => removeRipple(r.id)}
        />
      ))}
      <div className="relative h-11 w-11 shrink-0 sm:h-12 sm:w-12">
        {/* Progress ring — desktop badge only */}
        <svg viewBox="0 0 44 44" className="hidden h-12 w-12 -rotate-90 sm:block">
          <circle cx="22" cy="22" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
          <motion.circle
            cx="22"
            cy="22"
            r={radius}
            fill="none"
            stroke={accent}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.2 + index * 0.05, ease: 'easeOut' }}
          />
        </svg>
        <span className="absolute inset-0 hidden items-center justify-center sm:flex tilt-pop">
          {Icon && <Icon size={18} color={color} />}
        </span>

        {/* Plain logo tile — mobile row only */}
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.04] sm:hidden">
          {Icon && <Icon size={20} color={color} />}
        </div>
      </div>

      <div className="flex flex-1 items-center justify-between gap-3 sm:block sm:flex-none">
        <span className="font-display text-sm text-star">{name}</span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted/50 sm:hidden">
          {level}%
        </span>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-5xl px-6 py-32">
      <SectionHeading eyebrow="Skills" title="Tools I reach for" />

      <div className="flex flex-col gap-14">
        {skillGroups.map((group) => (
          <div key={group.id}>
            <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-muted">
              {group.title}
            </h3>
            <div className="flex flex-col gap-3 sm:grid sm:grid-cols-3 sm:gap-4 md:grid-cols-6">
              {group.skills.map((skill, i) => (
                <SkillBadge
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  icon={skill.icon}
                  color={skill.color}
                  accent={group.accent}
                  index={i}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
