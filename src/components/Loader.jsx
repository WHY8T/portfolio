import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Full-screen intro loader. The 3D scene is built entirely from procedural
 * geometry (no textures/models), so there's nothing for drei's useProgress
 * to actually track — it would sit at 0% forever. Instead we simulate a
 * quick, deterministic progress ramp purely for feel, and exit once it
 * completes. Calls `onFinished` once the exit transition completes.
 */
export default function Loader({ onFinished }) {
  const [progress, setProgress] = useState(0)
  const [shouldExit, setShouldExit] = useState(false)

  useEffect(() => {
    const start = performance.now()
    const duration = 1400 // ms — total time the loader is shown

    let frame
    const tick = (now) => {
      const elapsed = now - start
      const pct = Math.min(100, (elapsed / duration) * 100)
      setProgress(pct)
      if (pct < 100) {
        frame = requestAnimationFrame(tick)
      } else {
        setShouldExit(true)
      }
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <AnimatePresence onExitComplete={onFinished}>
      {!shouldExit && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-void"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Orbiting rings spinner echoing the hero 3D object */}
          <div className="relative h-20 w-20">
            <div className="absolute inset-0 rounded-full border border-accent/20" />
            <motion.div
              className="absolute inset-0 rounded-full border-t-2 border-accent"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-2 rounded-full border-b-2 border-teal/70"
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 2.4, ease: 'linear' }}
            />
            <div className="absolute inset-6 rounded-full bg-accent/80 blur-[6px]" />
          </div>

          <p className="mt-8 font-mono text-xs tracking-[0.3em] text-muted uppercase">
            Initializing scene
          </p>

          <div className="mt-4 h-[2px] w-48 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-accent to-teal"
              animate={{ width: `${Math.max(progress, 6)}%` }}
              transition={{ ease: 'easeOut', duration: 0.3 }}
            />
          </div>
          <p className="mt-2 font-mono text-[11px] text-muted/70">{Math.floor(progress)}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
