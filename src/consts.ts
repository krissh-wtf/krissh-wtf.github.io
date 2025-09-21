import type { Metadata, Site, Socials } from "@types";

export const SITE: Site = {
  TITLE: "krissh",
  DESCRIPTION: "mon site personnel",
  EMAIL: "moi@krissh.wtf",
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "index",
  DESCRIPTION: "mon site personnel.",
};

export const BLOG: Metadata = {
  TITLE: "blog",
  DESCRIPTION: "une collection d'articles sur des sujets qui me passionnent.",
};

export const PROJECTS: Metadata = {
  TITLE: "projets",
  DESCRIPTION:
    "une collection de mes projets avec des liens vers des référentiels et des démonstrations en direct.",
};

export const SOCIALS: Socials = [
  {
    NAME: "discord",
    HREF: "https://discord.com/users/873268348748697600",
  },
  {
    NAME: "github",
    HREF: "https://github.com/krissh-wtf",
  },
  {
    NAME: "twitter",
    HREF: "https://twitter.com/krissh_wtf",
  },
  {
    NAME: "site",
    HREF: "https://krissh.wtf",
  },
];
