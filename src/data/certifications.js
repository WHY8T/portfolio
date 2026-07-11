// ---------------------------------------------------------------------------
// CERTIFICATIONS DATA
// `type: 'image'` cards show a real certificate/credential image in full.
// `type: 'badge'` cards are for credentials that don't have a downloadable
// certificate image (Microsoft Learn only issues a shareable achievement
// link for these modules, not a certificate graphic) — rendered as a
// portfolio-native badge card instead of a fabricated "official" document.
// ---------------------------------------------------------------------------

export const certifications = [
  {
    id: 'cert-cybersecurity-intro',
    type: 'image',
    name: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    date: '2026',
    image: '/certificates/cybersecurity-intro.jpg',
    verifyUrl: null,
  },
  {
    id: 'cert-icip',
    type: 'image',
    name: 'Introduction to Critical Infrastructure Protection (ICIP)',
    issuer: 'OPSWAT Academy',
    date: '2026',
    image: '/certificates/icip-opswat.jpg',
    verifyUrl: 'https://learn.opswatacademy.com/certificate/H7UibeNbqg',
  },
  {
    id: 'cert-claude-code-101',
    type: 'image',
    name: 'Claude Code 101',
    issuer: 'Anthropic',
    date: '2026',
    image: '/certificates/claude-code-101.jpg',
    verifyUrl: null,
  },
  {
    id: 'cert-claude-platform-101',
    type: 'image',
    name: 'Claude Platform 101',
    issuer: 'Anthropic',
    date: '2026',
    image: '/certificates/claude-platform-101.jpg',
    verifyUrl: null,
  },
  {
    id: 'cert-ms-ai-skilling',
    type: 'ms-combined',
    name: 'AI Skilling — Microsoft Copilot',
    issuer: 'Microsoft Learn',
    date: '2026',
    modules: [
      {
        name: 'Discover New Data Insights with AI',
        verifyUrl:
          'https://learn.microsoft.com/api/achievements/share/fr-fr/abdelwahebabdelwaheb-3715/8VQXHDTW?sharingId=28A8953EBA3E3A6D',
      },
      {
        name: 'From Inbox to Impact: Improve Your Email Workflows with AI',
        verifyUrl:
          'https://learn.microsoft.com/api/achievements/share/fr-fr/abdelwahebabdelwaheb-3715/QL6KM3LE?sharingId=28A8953EBA3E3A6D',
      },
      {
        name: 'Create Effective Presentations with AI',
        verifyUrl:
          'https://learn.microsoft.com/api/achievements/share/fr-fr/abdelwahebabdelwaheb-3715/FE4AN4HX?sharingId=28A8953EBA3E3A6D',
      },
      {
        name: 'Write Impactful Documents Using AI',
        verifyUrl:
          'https://learn.microsoft.com/api/achievements/share/fr-fr/abdelwahebabdelwaheb-3715/FE4A7PLX?sharingId=28A8953EBA3E3A6D',
      },
      {
        name: 'Unlock Productivity and Unleash Creativity with AI-Based Conversation',
        verifyUrl:
          'https://learn.microsoft.com/api/achievements/share/fr-fr/abdelwahebabdelwaheb-3715/CR7HH6Y9?sharingId=28A8953EBA3E3A6D',
      },
    ],
  },
]
