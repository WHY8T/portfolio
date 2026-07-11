import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const NAME = 'Abdelwaheb Ghoubali'

/**
 * The site's opening visual: a "holographic ID badge" — profile photo +
 * name inside a card with a rotating iridescent border, a cursor-reactive
 * sheen (like light catching a hologram sticker), gentle 3D tilt on
 * mouse/touch move, and a soft glow that eases in on the name when hovered.
 *
 * Layout: on phone the photo is the big, primary element with the name
 * stacked below it (a "badge" you look at). From `sm` up it switches to the
 * side-by-side desktop layout.
 */
export default function HoloIDCard() {
  const cardRef = useRef(null)
  const rafId = useRef(null)
  const pending = useRef(null)
  const [photoFailed, setPhotoFailed] = useState(false)
  const [nameHover, setNameHover] = useState(false)
  const [isTracking, setIsTracking] = useState(false)

  // All pointer moves in a frame collapse into a single style write on the
  // next paint via rAF, instead of one write per event — this is what keeps
  // the tilt buttery on lower-powered phones instead of stacking up layout
  // work faster than the screen can draw it.
  const flush = () => {
    rafId.current = null
    const card = cardRef.current
    const next = pending.current
    if (!card || !next) return
    card.style.setProperty('--mx', `${next.x * 100}%`)
    card.style.setProperty('--my', `${next.y * 100}%`)
    card.style.setProperty('--rx', `${-(next.y - 0.5) * 14}deg`)
    card.style.setProperty('--ry', `${(next.x - 0.5) * 18}deg`)
    card.style.setProperty('--tz', '28px')
    card.style.setProperty('--shadow-x', `${-(next.x - 0.5) * 36}px`)
    card.style.setProperty('--shadow-y', `${-(next.y - 0.5) * 26 + 22}px`)
  }

  const schedule = (clientX, clientY) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    pending.current = {
      x: Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)),
      y: Math.max(0, Math.min(1, (clientY - rect.top) / rect.height)),
    }
    if (rafId.current == null) {
      rafId.current = requestAnimationFrame(flush)
    }
  }

  // Pointer events cover mouse, touch, and pen in one code path — no need
  // for separate mouse/touch handlers. onPointerDown fires the tilt
  // immediately at the first touch point instead of waiting for the first
  // move; onPointerMove keeps it following the finger/cursor.
  const handlePointerDown = (e) => {
    setIsTracking(true)
    schedule(e.clientX, e.clientY)
  }

  const handlePointerMove = (e) => {
    if (!isTracking) setIsTracking(true)
    schedule(e.clientX, e.clientY)
  }

  const resetTilt = () => {
    setIsTracking(false)
    if (rafId.current != null) {
      cancelAnimationFrame(rafId.current)
      rafId.current = null
    }
    pending.current = null
    const card = cardRef.current
    if (!card) return
    card.style.setProperty('--rx', '0deg')
    card.style.setProperty('--ry', '0deg')
    card.style.setProperty('--tz', '0px')
    card.style.setProperty('--shadow-x', '0px')
    card.style.setProperty('--shadow-y', '14px')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto w-full max-w-sm select-none px-4 sm:max-w-4xl sm:px-0"
      style={{ perspective: '900px' }}
    >
      <div
        ref={cardRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
        onPointerUp={resetTilt}
        onPointerCancel={resetTilt}
        className="holo-border glass relative flex flex-col items-center gap-6 overflow-hidden rounded-[32px] p-6 text-center sm:flex-row sm:gap-10 sm:p-10 sm:text-left"
        style={{
          transform:
            'rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateZ(var(--tz, 0px))',
          boxShadow:
            'var(--shadow-x, 0px) var(--shadow-y, 14px) 46px -12px rgba(139, 92, 246, 0.4), 0 10px 24px -14px rgba(0, 0, 0, 0.65)',
          // While actively dragging, snap instantly to the finger/cursor
          // (no transition lag); once released, ease back to flat.
          transition: isTracking
            ? 'none'
            : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          touchAction: 'none',
          willChange: 'transform, box-shadow',
        }}
      >
        {/* Cursor-reactive holographic sheen */}
        <div className="holo-sheen pointer-events-none absolute inset-0" />

        {/* Photo — the primary element on phone (big, full-width, on top),
            a smaller side-by-side portrait from `sm` up. */}
        <div className="relative h-64 w-full shrink-0 overflow-hidden rounded-[22px] ring-1 ring-white/10 tilt-pop sm:h-40 sm:w-40">
          {photoFailed ? (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/20 to-teal/10">
              <span className="font-display text-3xl font-semibold text-star/70">AG</span>
            </div>
          ) : (
            <img
              src="/profile.jpg"
              alt="Abdelwaheb Ghoubali"
              className="h-full w-full object-cover object-top"
              onError={() => setPhotoFailed(true)}
            />
          )}
        </div>

        {/* Name + role — sits below the photo on phone, beside it on desktop */}
        <div className="relative">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.3em] text-teal">
            Software Builder · Full-Stack Developer
          </p>
          <h1
            onMouseEnter={() => setNameHover(true)}
            onMouseLeave={() => setNameHover(false)}
            onTouchStart={() => setNameHover(true)}
            onTouchEnd={() => setNameHover(false)}
            className={`glow-text relative inline-block font-display text-2xl font-semibold text-star sm:text-4xl ${
              nameHover ? 'is-active' : ''
            }`}
          >
            {NAME}
          </h1>
        </div>
      </div>
    </motion.div>
  )
}
