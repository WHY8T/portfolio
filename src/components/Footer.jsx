// Social links live in ONE place now — the Contact section above — so
// there's a single, consistent row of icons instead of two different sets
// scattered across the page. The footer just closes things out.
export default function Footer() {
  return (
    <footer className="relative mx-auto max-w-6xl px-6 pb-10 pt-4 text-center">
      <div className="mx-auto mb-6 h-px w-full max-w-md bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <p className="font-mono text-[11px] uppercase tracking-widest text-muted/60">
        © {new Date().getFullYear()} Abdelwaheb Ghoubali — built with React & a lot of coffee
      </p>
    </footer>
  )
}
