# Personal Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a personal website with Astro, deploy to GitHub Pages, with full git/GitHub workflow and interactive project showcase.

**Architecture:** Single-page hybrid layout (Hero, About, Projects grid, Contact). Projects open in modals. React islands for interactivity. Static output deployed via GitHub Actions.

**Tech Stack:** Astro, React, GitHub Pages, GitHub Actions

---

## Phase 1: Project Setup & DevOps

### Task 1: Initialize Astro Project

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/`, `public/`

**Step 1: Create Astro project**

```bash
cd /Users/bryceroberts/Desktop/Coding\ Projects/My_Website
npm create astro@latest . -- --template minimal --install --no-git --typescript strict
```

When prompted: choose minimal template, strict TypeScript, install dependencies.

**Step 2: Add React integration**

```bash
npx astro add react
```

**Step 3: Verify build**

```bash
npm run build
```

Expected: Build succeeds, `dist/` folder created.

**Step 4: Commit**

```bash
git add .
git commit -m "chore: initialize Astro project with React"
```

---

### Task 2: Configure for GitHub Pages

**Files:**
- Modify: `astro.config.mjs`

**Step 1: Set site and base for GitHub Pages**

Edit `astro.config.mjs`:

```javascript
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  site: 'https://YOUR_GITHUB_USERNAME.github.io',
  base: '/My_Website/',  // or '/' if repo is username.github.io
});
```

Replace `YOUR_GITHUB_USERNAME` with actual GitHub username. If repo will be `username.github.io`, use `base: '/'`.

**Step 2: Verify build**

```bash
npm run build
```

Expected: Build succeeds.

**Step 3: Commit**

```bash
git add astro.config.mjs
git commit -m "chore: configure Astro for GitHub Pages"
```

---

### Task 3: Add .gitignore

**Files:**
- Create/Modify: `.gitignore`

**Step 1: Ensure .gitignore exists**

If Astro didn't create one, create `.gitignore`:

```
node_modules
dist
.env
.env.*
.DS_Store
```

**Step 2: Commit**

```bash
git add .gitignore
git commit -m "chore: add .gitignore"
```

---

### Task 4: Push to GitHub

**Files:**
- N/A (git remote)

**Step 1: Create GitHub repo**

Create a new repository on GitHub (e.g. `My_Website` or `username.github.io`). Do not initialize with README.

**Step 2: Add remote and push**

```bash
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git branch -M main   # if still on master
git push -u origin main
```

Expected: Code pushed to GitHub.

---

### Task 5: Create PR Template

**Files:**
- Create: `.github/PULL_REQUEST_TEMPLATE.md`

**Step 1: Create PR template**

```markdown
## Description
<!-- What does this PR do? -->

## Checklist
- [ ] Tested locally
- [ ] No console errors
- [ ] Build passes (`npm run build`)
```

**Step 2: Commit**

```bash
git add .github/PULL_REQUEST_TEMPLATE.md
git commit -m "chore: add PR template"
git push
```

---

### Task 6: GitHub Actions Deploy Workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

**Step 1: Create workflow**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Step 2: Enable GitHub Pages**

In repo Settings → Pages → Source: select "GitHub Actions".

**Step 3: Commit and push**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add GitHub Actions deploy workflow"
git push
```

Expected: Action runs, site deploys (may take a few minutes).

---

## Phase 2: Build the Website

### Task 7: Base Layout

**Files:**
- Create: `src/layouts/Layout.astro`
- Modify: `src/pages/index.astro`

**Step 1: Create Layout.astro**

```astro
---
interface Props {
  title?: string;
}

const { title = 'My Website' } = Astro.props;
---
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
  </head>
  <body>
    <slot />
  </body>
</html>
```

**Step 2: Update index.astro**

```astro
---
import Layout from '../layouts/Layout.astro';
---
<Layout title="My Website">
  <main>
    <h1>Welcome</h1>
  </main>
</Layout>
```

**Step 3: Verify**

```bash
npm run dev
```

Open http://localhost:4321 — see "Welcome".

**Step 4: Commit**

```bash
git add src/layouts/Layout.astro src/pages/index.astro
git commit -m "feat: add base layout"
```

---

### Task 8: Hero Section

**Files:**
- Create: `src/components/Hero.astro`
- Modify: `src/pages/index.astro`

**Step 1: Create Hero.astro**

```astro
---
interface Props {
  name: string;
  tagline?: string;
}

const { name, tagline = 'Developer & Creator' } = Astro.props;
---
<section class="hero">
  <h1>{name}</h1>
  <p class="tagline">{tagline}</p>
</section>

<style>
  .hero {
    min-height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 2rem;
  }
  .tagline {
    font-size: 1.25rem;
    opacity: 0.8;
  }
</style>
```

**Step 2: Add to index.astro**

```astro
---
import Layout from '../layouts/Layout.astro';
import Hero from '../components/Hero.astro';
---
<Layout title="My Website">
  <main>
    <Hero name="Your Name" tagline="Developer & Creator" />
  </main>
</Layout>
```

**Step 3: Verify** — Dev server shows hero.

**Step 4: Commit**

```bash
git add src/components/Hero.astro src/pages/index.astro
git commit -m "feat: add hero section"
```

---

### Task 9: About Section

**Files:**
- Create: `src/components/About.astro`
- Modify: `src/pages/index.astro`

**Step 1: Create About.astro**

```astro
---
interface Props {
  bio: string;
  skills?: string[];
}

const { bio, skills = [] } = Astro.props;
---
<section class="about" id="about">
  <h2>About</h2>
  <p>{bio}</p>
  {skills.length > 0 && (
    <ul class="skills">
      {skills.map((s) => <li>{s}</li>)}
    </ul>
  )}
</section>

<style>
  .about {
    padding: 4rem 2rem;
    max-width: 600px;
    margin: 0 auto;
  }
  .skills {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .skills li {
    background: #333;
    color: #fff;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
  }
</style>
```

**Step 2: Add to index.astro** (import and render with placeholder bio/skills).

**Step 3: Verify** — About section visible.

**Step 4: Commit**

```bash
git add src/components/About.astro src/pages/index.astro
git commit -m "feat: add about section"
```

---

### Task 10: Projects Data

**Files:**
- Create: `src/data/projects.ts`

**Step 1: Create projects data**

```typescript
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  link?: string;
  repo?: string;
  image?: string;
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Sample Project',
    description: 'A short description.',
    longDescription: 'A longer description for the modal.',
    tags: ['Web', 'React'],
    link: 'https://example.com',
    repo: 'https://github.com/example/repo',
  },
];
```

**Step 2: Commit**

```bash
git add src/data/projects.ts
git commit -m "feat: add projects data structure"
```

---

### Task 11: Project Card Component

**Files:**
- Create: `src/components/ProjectCard.astro`
- Modify: `src/pages/index.astro`

**Step 1: Create ProjectCard.astro**

```astro
---
import type { Project } from '../data/projects';

interface Props {
  project: Project;
}

const { project } = Astro.props;
---
<article class="card" data-project-id={project.id}>
  <h3>{project.title}</h3>
  <p>{project.description}</p>
  <div class="tags">
    {project.tags.map((tag) => (
      <span class="tag">{tag}</span>
    ))}
  </div>
</article>

<style>
  .card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 1rem;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
  .tags {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
  .tag {
    font-size: 0.75rem;
    background: #eee;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
  }
</style>
```

**Step 2: Add Projects section to index.astro** — Import projects, map over them, render ProjectCard.

**Step 3: Verify** — Project cards visible.

**Step 4: Commit**

```bash
git add src/components/ProjectCard.astro src/pages/index.astro
git commit -m "feat: add project cards"
```

---

### Task 12: Project Modal (React)

**Files:**
- Create: `src/components/ProjectModal.tsx`
- Modify: `src/pages/index.astro`

**Step 1: Create ProjectModal.tsx**

```tsx
import { useEffect } from 'react';
import type { Project } from '../data/projects';

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    if (project) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [project]);

  if (!project) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <h2 id="modal-title">{project.title}</h2>
        <p>{project.longDescription || project.description}</p>
        <div className="modal-links">
          {project.link && <a href={project.link} target="_blank" rel="noopener">View</a>}
          {project.repo && <a href={project.repo} target="_blank" rel="noopener">Repo</a>}
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Add modal styles** — In Layout or a global CSS file, add `.modal-overlay`, `.modal-content`, `.modal-close` styles (fixed overlay, centered content, close button).

**Step 3: Wire up in index.astro** — Use a client-side React wrapper or Astro's client:load to manage modal state. Pass `project` and `onClose` to ProjectModal.

Note: Astro islands need a client wrapper. Create `src/components/ProjectsSection.tsx` that holds both the grid and modal state, or use a simpler approach: render each card with `client:load` on a small React component that handles click → open modal.

**Simpler approach:** Create `src/components/ProjectsWithModal.tsx` — a single React component that renders the grid + modal and manages state.

**Step 4: Verify** — Click card → modal opens; Escape/overlay closes it.

**Step 5: Commit**

```bash
git add src/components/ProjectModal.tsx src/components/ProjectsWithModal.tsx src/pages/index.astro
git commit -m "feat: add project modal"
```

---

### Task 13: Contact Section

**Files:**
- Create: `src/components/Contact.astro`
- Modify: `src/pages/index.astro`

**Step 1: Create Contact.astro**

```astro
---
interface Link {
  label: string;
  url: string;
}

interface Props {
  links: Link[];
}

const { links } = Astro.props;
---
<section class="contact" id="contact">
  <h2>Contact</h2>
  <ul class="links">
    {links.map((link) => (
      <li><a href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a></li>
    ))}
  </ul>
</section>

<style>
  .contact {
    padding: 4rem 2rem;
    text-align: center;
  }
  .links {
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: center;
    gap: 1.5rem;
  }
</style>
```

**Step 2: Add to index.astro** with placeholder links (GitHub, LinkedIn, email).

**Step 3: Commit**

```bash
git add src/components/Contact.astro src/pages/index.astro
git commit -m "feat: add contact section"
```

---

### Task 14: Project Filter (React)

**Files:**
- Modify: `src/components/ProjectsWithModal.tsx` (or equivalent)

**Step 1: Add filter state and UI** — Dropdown or button group for tags. Filter `projects` by selected tag before rendering grid.

**Step 2: Verify** — Filtering works.

**Step 3: Commit**

```bash
git add src/components/ProjectsWithModal.tsx
git commit -m "feat: add project filter by tag"
```

---

### Task 15: Smooth Scroll & Polish

**Files:**
- Modify: `src/layouts/Layout.astro`, `src/components/*.astro`

**Step 1: Add smooth scroll** — `html { scroll-behavior: smooth; }` in global CSS.

**Step 2: Add nav links** — If not present, add anchor links (About, Projects, Contact) that smooth-scroll.

**Step 3: Final build check**

```bash
npm run build
```

Expected: Build succeeds.

**Step 4: Commit**

```bash
git add .
git commit -m "feat: add smooth scroll and nav polish"
git push
```

---

## Execution Handoff

Plan complete and saved to `docs/plans/2025-03-11-personal-website-implementation.md`.

**Two execution options:**

1. **Subagent-Driven (this session)** — I dispatch a fresh subagent per task, review between tasks, fast iteration.

2. **Parallel Session (separate)** — Open a new session with executing-plans, batch execution with checkpoints.

Which approach?
