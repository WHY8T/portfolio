/**
 * Shared "3D tilt on hover" behavior — tracks mouse position within an
 * element and exposes handlers that set --rx/--ry/--tz/--shadow-x/--shadow-y
 * CSS vars (read by the .tilt-3d utility class in index.css). Beyond the
 * rotation, the element lifts toward the viewer (--tz) and casts a soft
 * directional shadow that leans away from the cursor, so cards read as
 * genuinely floating above the surface rather than just rotating in place.
 * Keeps the same 3D language used across the Projects, Certifications,
 * Skills, About, and Hero cards.
 */
export function useTilt(strength = 6) {
  const handleMouseMove = (e) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.setProperty('--rx', `${-y * strength}deg`)
    el.style.setProperty('--ry', `${x * (strength + 2)}deg`)
    el.style.setProperty('--tz', '22px')
    el.style.setProperty('--shadow-x', `${-x * 28}px`)
    el.style.setProperty('--shadow-y', `${-y * 20 + 18}px`)
  }

  const handleMouseLeave = (e) => {
    const el = e.currentTarget
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
    el.style.setProperty('--tz', '0px')
    el.style.setProperty('--shadow-x', '0px')
    el.style.setProperty('--shadow-y', '10px')
  }

  return { handleMouseMove, handleMouseLeave }
}
