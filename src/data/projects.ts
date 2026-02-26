export interface Project {
  title: string;
  category: string;
  image: string;
  desc: string;
  stack: string[];
  color: string;
  github?: string;
  live?: string;
}

export const projects: Project[] = [
  {
    title: "MatchDoc",
    category: "Platform Web App",
    image: "/projects/matchdoc.png",
    desc: "The mutual aid platform for finding lost or found administrative documents.",
    stack: ["React", "Laravel", "PostgreSQL"],
    color: "bg-purple-500",
    github: "https://github.com/devakowakou/matchdoc",
    live: "https://matchdoc.vercel.app"
  },
  {
    title: "DID Annuaire",
    category: "Platform Web App",
    image: "/projects/did-annuaire.png",
    desc: "DID Annuaire provides a secure, verifiable directory for organizations using did:web identifiers. Establish trust without intermediaries.",
    stack: ["Next.js", "Python", "PostgreSQL"],
    color: "bg-blue-500",
    github: "https://github.com/devakowakou/did-annuaire",
    live: "https://annuairedid-fe.qcdigitalhub.com"
  },
  {
    title: "PORTFOLIO DEMO",
    category: "PORTFOLIO",
    image: "/projects/portfolio.png",
    desc: "A personal portfolio website showcasing projects, skills, and experience with a unique design and interactive features.",
    stack: ["React", "Next.js", "TypeScript"],
    color: "bg-red-500",
    github: "https://github.com/devakowakou/neubrutalist-portfolio-remix",
    live: "https://amourakowakou.me"
  }
];
