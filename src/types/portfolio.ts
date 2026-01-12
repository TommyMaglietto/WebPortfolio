export type Project = {
  id: string;
  title: string;
  blurb: string;
  details: string;
  skills: string[];
  github?: string;
  screenshot?: string;
};

export type SkillItem = {
  name: string;
  level: number;
};

export type SkillGroup = {
  title: string;
  items: SkillItem[];
};

export type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  location: string;
  dates: string;
  impact: string[];
  technologies: string[];
  status: 'Active' | 'Completed';
  iconSrc: string;
};
