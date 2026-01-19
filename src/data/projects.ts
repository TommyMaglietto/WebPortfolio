import type { Project } from '../types/portfolio';

export const projects: Project[] = [
  {
    id: 'one-of-us',
    title: 'One Of Us',
    blurb: 'Fast-paced multiplayer horror in the woods - repair, find keys, and escape while a Skinwalker hides among you.',
    details:
      'Players must repair generators, find keys, and work together to escape - all while a terrifying Skinwalker lurks among them, disguised as one of their own. Paranoia spreads as trust crumbles: anyone could be the monster. Armed with flashlights and the occasional shotgun, survivors can expose or fight back - but hesitation means death.\n\n"Trust no one. Not even your closest friend."',
    skills: ['Roblox Studio', 'Lua', 'Multiplayer', 'Game Design', 'Horror', 'Networking'],
    screenshot: '/One-Of-Us.png',
  },
  {
    id: 'save-one-more-person',
    title: 'Save One More Person (SOMP)',
    blurb: 'Mobile-first market research MVP that gamifies feature validation with swipe-based feedback.',
    details:
      'Swipe-based yes/maybe/no cards with flip-to-comment interactions, local persistence with API sync, and community submissions with category filters, profanity checks, and abuse reporting.\nCore client component components/SwipeDeck.tsx orchestrates swipes, forms, and reporting modals while a weighted deck balances official and community features.\nSupabase-backed data model: features (id, name, category, description, created_at) and opinions (feature_id, score 1-3, rating 1-5 optional, comment, created_at).\nAPI routes: /api/features, /api/opinions, /api/community-features, /api/admin/* with a middleware-protected admin dashboard at /admin and Recharts analytics.',
    skills: ['Next.js 16', 'React 19', 'Tailwind CSS 4', 'Supabase', 'PostgreSQL', 'Recharts', 'API Routes'],
    screenshot: '/SOMP.png',
    github: 'https://github.com/TommyMaglietto/SaveOneMorePerson-Market-Research-Site',
    live: 'https://saveonemoreperson.com',
  },
  {
    id: 'developer-portfolio',
    title: 'Developer Portfolio Website',
    blurb: 'Arcade-themed portfolio that turns projects and skills into a retro, playable experience.',
    details:
      'Built with React 19, Vite, and TypeScript to deliver a responsive arcade UI with pixel art framing and scanline accents.\nFeatures a starfield canvas background, tabbed navigation with localStorage persistence, and a gamified social loadout with keyboard shortcuts.\nIncludes a resume download flow plus dedicated projects and experience sections.',
    skills: ['React 19', 'Vite', 'TypeScript', 'CSS', 'HTML5 Canvas', 'Responsive Design'],
    screenshot: '/PixelMe.png',
    github: 'https://github.com/TommyMaglietto/WebPortfolio',
  },
  {
    id: 'hunger-health',
    title: 'Hunger and Health iOS App',
    blurb: 'Team-built iOS app addressing food insecurity and health resources.',
    details:
      'Contributed to UI flows and data handling; focused on resource discovery and accessibility features.',
    skills: ['SwiftUI', 'iOS', 'Teamwork'],
    screenshot: '/HHC.jpg',
  },
  {
    id: 'y86-64',
    title: 'Y86-64 Simulator',
    blurb: 'Instruction set architecture simulator built for coursework.',
    details:
      'Implemented instruction decoding, pipeline stages, and a basic debugger; wrote unit tests for correctness.',
    skills: ['C', 'Computer Architecture', 'Testing'],
    screenshot: '/Y86.png',
  },
  {
    id: 'haskell-blackjack',
    title: 'BlackJack in Haskell',
    blurb: 'Terminal-based, fully functional BlackJack game.',
    details:
      'Purely functional design with monadic IO; modularized deck and hand evaluation logic.',
    skills: ['Haskell', 'Functional Programming'],
    screenshot: '/Haskel.png',
  },
  {
    id: 'blender-3d',
    title: '3D Blender Models',
    blurb: 'Selection of hobbyist 3D models created in Blender.',
    details:
      'Practiced modeling, texturing, and lighting; exported renders for portfolio presentation.',
    skills: ['Blender', '3D Modeling', 'Design'],
    screenshot: '/Blender.png',
  },
];
