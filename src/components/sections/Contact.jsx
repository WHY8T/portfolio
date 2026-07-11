import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, Check } from 'lucide-react'
import { GithubIcon, LinkedinIcon, InstagramIcon, DiscordIcon } from '../BrandIcons'
import SectionHeading from '../SectionHeading'
import { blurIn, blurOut } from '../../utils/motion'

// ---------------------------------------------------------------------------
// SINGLE SOURCE OF TRUTH for all contact/social info on the whole site —
// this is the only place these need editing.
// ---------------------------------------------------------------------------
const CONTACT = {
  email: 'abdelwahebghoubali@gmail.com',
  github: 'https://github.com/WHY8T',
  linkedin: 'https://www.linkedin.com/in/abdelwaheb-ghoubali-0429533b2',
  // Optional — leave blank ('') to hide the icon entirely.
  instagram: '',
  discord: '',
}
// The form submits via FormSubmit (https://formsubmit.co) — a free service
// that emails whatever is typed straight to CONTACT.email, no backend or
// account needed. IMPORTANT ONE-TIME STEP: the very first time someone
// submits the form, FormSubmit sends an "Activate Form" email to
// abdelwahebghoubali@gmail.com — open it and click the confirm link, and
// every submission after that (including that first one, once confirmed)
// lands directly in the inbox for real.
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT.email}`

const socials = [
  { label: 'Email', href: `mailto:${CONTACT.email}`, icon: Mail },
  { label: 'GitHub', href: CONTACT.github, icon: GithubIcon },
  { label: 'LinkedIn', href: CONTACT.linkedin, icon: LinkedinIcon },
  { label: 'Instagram', href: CONTACT.instagram, icon: InstagramIcon },
  { label: 'Discord', href: CONTACT.discord, icon: DiscordIcon },
].filter((s) => s.href) // any left blank above just don't render

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Portfolio contact from ${form.name}`,
        }),
      })

      if (!res.ok) throw new Error('Request failed')

      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } catch {
      // A real failure (network down, endpoint not yet activated, etc.) —
      // tell the person honestly instead of pretending it worked.
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative mx-auto max-w-4xl px-6 py-32">
      <SectionHeading eyebrow="Contact" title="Let's build something" align="center" />

      <motion.p
        initial={{ opacity: 0, ...blurIn(4) }}
        whileInView={{ opacity: 1, ...blurOut() }}
        viewport={{ once: true, amount: 0.15, margin: '-5% 0px -5% 0px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto -mt-6 mb-10 max-w-md text-center text-muted"
      >
        Have a project in mind, or an opportunity you'd like to discuss?
        I'd welcome the conversation — feel free to reach out.
      </motion.p>

      <div className="mb-10 flex flex-wrap justify-center gap-4">
        {socials.map(({ label, href, icon: Icon }, i) => (
          <motion.a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            data-cursor-hover
            aria-label={label}
            initial={{ opacity: 0, y: 16, scale: 0.9, ...blurIn(4) }}
            whileInView={{ opacity: 1, y: 0, scale: 1, ...blurOut() }}
            viewport={{ once: true, amount: 0.2, margin: '-5% 0px -5% 0px' }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -3 }}
            className="glass glow-border flex h-12 w-12 items-center justify-center rounded-full text-muted transition-colors hover:text-accent"
          >
            <Icon size={18} />
          </motion.a>
        ))}
      </div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30, ...blurIn(8) }}
        whileInView={{ opacity: 1, y: 0, ...blurOut() }}
        viewport={{ once: true, amount: 0.25, margin: '-5% 0px -5% 0px' }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="glass glow-border grid grid-cols-1 gap-4 rounded-3xl p-6 sm:grid-cols-2 sm:p-8"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-mono text-[11px] uppercase tracking-wider text-muted">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-star outline-none transition-colors focus:border-accent/60"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-mono text-[11px] uppercase tracking-wider text-muted">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-star outline-none transition-colors focus:border-accent/60"
          />
        </div>

        <div className="flex flex-col gap-2 sm:col-span-2">
          <label htmlFor="message" className="font-mono text-[11px] uppercase tracking-wider text-muted">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={form.message}
            onChange={handleChange}
            placeholder="Tell me about the project or opportunity..."
            className="resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-star outline-none transition-colors focus:border-accent/60"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          data-cursor-hover
          className="glow-border sm:col-span-2 flex items-center justify-center gap-2 rounded-xl bg-accent/90 px-6 py-3 font-mono text-xs uppercase tracking-widest text-void transition-transform hover:scale-[1.02] hover:bg-accent disabled:opacity-60"
        >
          {status === 'sent' ? (
            <>
              <Check size={15} /> Message sent
            </>
          ) : status === 'sending' ? (
            'Sending…'
          ) : status === 'error' ? (
            'Couldn\u2019t send — try again'
          ) : (
            <>
              Send message <Send size={14} />
            </>
          )}
        </button>

        {status === 'error' && (
          <p className="font-mono text-[10px] text-muted/50 sm:col-span-2">
            Something went wrong sending that — feel free to email {CONTACT.email} directly instead.
          </p>
        )}
      </motion.form>
    </section>
  )
}
