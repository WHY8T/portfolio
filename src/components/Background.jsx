/**
 * Static background layer shared by the whole page: a soft radial-gradient
 * wash plus a faint decorative grid that fades toward the edges. No
 * animation, no filters — just two flat layers.
 */
export default function Background() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(139,92,246,0.16) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 90% 100%, rgba(45,212,191,0.10) 0%, transparent 60%), var(--color-void)',
        }}
      />
      {/* Faint grid, purely decorative, fades toward the edges */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(245,243,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(245,243,255,0.6) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 20%, black 0%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 20%, black 0%, transparent 75%)',
        }}
      />
    </div>
  )
}
