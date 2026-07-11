// ---------------------------------------------------------------------------
// SKILLS DATA
// Edit freely — add/remove entries, the Skills section re-flows automatically.
// `level` is a 0-100 value used for the animated proficiency ring.
// `icon` is the export name of a real brand icon from react-icons/si
// (see src/components/sections/Skills.jsx for how it's resolved).
// `color` is the tool's real brand color, used to tint its icon.
// ---------------------------------------------------------------------------

export const skillGroups = [
  {
    id: 'languages',
    title: 'Languages & Frameworks',
    accent: '#8b5cf6',
    skills: [
      { name: 'Python', level: 90, icon: 'SiPython', color: '#3776AB' },
      { name: 'JavaScript', level: 85, icon: 'SiJavascript', color: '#F7DF1E' },
      { name: 'TypeScript', level: 75, icon: 'SiTypescript', color: '#3178C6' },
      { name: 'React', level: 85, icon: 'SiReact', color: '#61DAFB' },
      { name: 'Node.js', level: 70, icon: 'SiNodedotjs', color: '#339933' },
      { name: 'PostgreSQL', level: 80, icon: 'SiPostgresql', color: '#4169E1' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Platforms',
    accent: '#2dd4bf',
    skills: [
      { name: 'Git', level: 85, icon: 'SiGit', color: '#F05032' },
      { name: 'GitHub', level: 85, icon: 'SiGithub', color: '#f5f3ff' },
      { name: 'REST APIs', level: 80, icon: 'SiPostman', color: '#FF6C37' },
      { name: 'Supabase', level: 75, icon: 'SiSupabase', color: '#3ECF8E' },
      { name: 'Vercel', level: 75, icon: 'SiVercel', color: '#f5f3ff' },
      { name: 'Linux', level: 75, icon: 'SiLinux', color: '#FCC624' },
      { name: 'VS Code', level: 90, icon: 'VSCode', color: '#007ACC' },
      { name: 'Claude Code', level: 85, icon: 'ClaudeCode', color: '#D97757' },
      { name: 'OpenRouter', level: 75, icon: 'OpenRouter', color: '#94A3B8' },
      { name: 'n8n', level: 70, icon: 'N8n', color: '#EA4B71' },
    ],
  },
]
