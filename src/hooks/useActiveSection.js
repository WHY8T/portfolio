import { useEffect, useState } from 'react'

/**
 * Observes a list of section element IDs and returns whichever one
 * currently occupies the middle band of the viewport. Powers the
 * "active" highlight in the floating navbar.
 */
export function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0])

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the vertical center of the viewport
        // among those currently intersecting.
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          const closest = visible.reduce((best, e) =>
            Math.abs(e.boundingClientRect.top) < Math.abs(best.boundingClientRect.top)
              ? e
              : best
          )
          setActiveId(closest.target.id)
        }
      },
      {
        rootMargin: '-40% 0px -50% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sectionIds])

  return activeId
}
