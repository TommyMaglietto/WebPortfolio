import type { Project } from '../types/portfolio';

export type GitHubCatalogEntry = {
  id: string;
  repo: string;
  url: string;
  description: string;
  private: boolean;
  approved: boolean;
};

// Pulled from https://api.github.com/users/TommyMaglietto/repos?type=owner
// Flip approved to true to surface a repo in the Open Source grid.
export const githubCatalog: GitHubCatalogEntry[] = [
  {
    id: 'agent-os',
    repo: 'agent-os',
    url: 'https://github.com/TommyMaglietto/agent-os',
    description: 'Owner repository.',
    private: false,
    approved: false,
  },
  {
    id: 'one-of-us-roblox-studio',
    repo: 'One-of-Us--Roblox-Studio',
    url: 'https://github.com/TommyMaglietto/One-of-Us--Roblox-Studio',
    description:
      'A suspenseful social-deduction game built in Roblox Studio where players must work together to survive while uncovering the hidden traitor.',
    private: false,
    approved: true,
  },
  {
    id: 'post-bulk-videos-to-platforms',
    repo: 'Post-Bulk-Videos-to-Platforms',
    url: 'https://github.com/TommyMaglietto/Post-Bulk-Videos-to-Platforms',
    description:
      'Automated workflow that selects videos, generates platform-specific metadata, and posts to social platforms.',
    private: false,
    approved: false,
  },
  {
    id: 'square-to-sheets-workflow',
    repo: 'Square-To-Sheets-Workflow',
    url: 'https://github.com/TommyMaglietto/Square-To-Sheets-Workflow',
    description: 'Pulls all customers from Square and syncs them to Google Sheets.',
    private: false,
    approved: true,
  },
  {
    id: 'google-sheets-to-supabase',
    repo: 'Google-Sheets-To-Supabase',
    url: 'https://github.com/TommyMaglietto/Google-Sheets-To-Supabase',
    description: 'Sends Google Sheets data into Supabase.',
    private: false,
    approved: true,
  },
  {
    id: 'webportfolio',
    repo: 'WebPortfolio',
    url: 'https://github.com/TommyMaglietto/WebPortfolio',
    description: 'My Web Portfolio.',
    private: false,
    approved: true,
  },
  {
    id: 'simple-custom-map-generator',
    repo: 'Simple-Custom-Map-Generator',
    url: 'https://github.com/TommyMaglietto/Simple-Custom-Map-Generator',
    description:
      'Interactive map poster generator powered by OpenStreetMap/Overpass with live layer toggles and PNG export.',
    private: false,
    approved: true,
  },
  {
    id: 'save-one-more-person-market-research-site',
    repo: 'SaveOneMorePerson-Market-Research-Site',
    url: 'https://github.com/TommyMaglietto/SaveOneMorePerson-Market-Research-Site',
    description: 'Market research site for Save One More Person feature validation.',
    private: false,
    approved: true,
  },
  {
    id: 'blackjack-in-haskell',
    repo: 'BlackJack-In-Haskell',
    url: 'https://github.com/TommyMaglietto/BlackJack-In-Haskell',
    description: 'Terminal BlackJack project in Haskell.',
    private: false,
    approved: true,
  },
];

const titleOverrides: Record<string, string> = {
  'One-of-Us--Roblox-Studio': 'One Of Us (Roblox Studio)',
  'SaveOneMorePerson-Market-Research-Site': 'Save One More Person Market Research Site',
};

const skillOverrides: Record<string, string[]> = {
  'BlackJack-In-Haskell': ['Haskell', 'Functional Programming', 'GitHub'],
  'Google-Sheets-To-Supabase': ['Python', 'Supabase', 'GitHub'],
  'One-of-Us--Roblox-Studio': ['Roblox Studio', 'Lua', 'GitHub'],
  'Post-Bulk-Videos-to-Platforms': ['Python', 'Automation', 'GitHub'],
  'SaveOneMorePerson-Market-Research-Site': ['Next.js', 'Supabase', 'GitHub'],
  'Simple-Custom-Map-Generator': ['JavaScript', 'Canvas', 'GitHub'],
  'Square-To-Sheets-Workflow': ['Python', 'API Integration', 'GitHub'],
  WebPortfolio: ['React', 'TypeScript', 'GitHub'],
};

const humanizeRepoName = (repo: string) => {
  const spaced = repo
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .trim();
  const title = spaced.replace(/\b\w/g, (value) => value.toUpperCase());
  return title.replace(/\bApi\b/g, 'API').replace(/\bIos\b/g, 'iOS');
};

export const approvedGithubProjects: Project[] = githubCatalog
  .filter((entry) => entry.approved)
  .map((entry) => ({
    id: `github-${entry.id}`,
    title: titleOverrides[entry.repo] ?? humanizeRepoName(entry.repo),
    blurb: entry.description || 'Approved GitHub repository.',
    details: entry.description
      ? `${entry.description}\n\nImported from your GitHub owner repository list.`
      : 'Imported from your GitHub owner repository list.',
    skills: skillOverrides[entry.repo] ?? ['GitHub', 'Repository'],
    source: entry.private ? 'closed' : 'open',
    github: entry.private ? undefined : entry.url,
  }));
