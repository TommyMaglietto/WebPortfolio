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
