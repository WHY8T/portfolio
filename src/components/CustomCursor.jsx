import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Replaces the native cursor on desktop with a small violet dot plus a
 * softly-lagging glow ring. The ring scales up and brightens whenever
 * the pointer is over anything interactive (links, buttons, cards),
 * giving hover states a bit of theatre without relying on box-shadows
 * alone. Disabled automatically on touch devices via CSS (see index.css).
 */
export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const isCoarse = useRef(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { damping: 25, stiffness: 300, mass: 0.5 })
  const ringY = useSpring(y, { damping: 25, stiffness: 300, mass: 0.5 })

  useEffect(() => {
    isCoarse.current = window.matchMedia('(pointer: coarse)').matches
    if (isCoarse.current) return

    const handleMove = (e) => {
      setIsVisible(true)
      x.set(e.clientX)
      y.set(e.clientY)
    }

    const handleOver = (e) => {
      const interactive = e.target.closest('a, button, [data-cursor-hover]')
      setIsHovering(Boolean(interactive))
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseover', handleOver)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseover', handleOver)
    }
  }, [x, y])

  if (isCoarse.current || !isVisible) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[100] h-2 w-2 rounded-full bg-accent pointer-events-none mix-blend-screen"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className="fixed top-0 left-0 z-[99] rounded-full pointer-events-none border border-accent/60"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          boxShadow: '0 0 20px 2px rgba(139,92,246,0.35)',
        }}
        animate={{
          width: isHovering ? 56 : 32,
          height: isHovering ? 56 : 32,
          opacity: isHovering ? 0.9 : 0.5,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      />
    </>
  )
}
