# Personal Website Design

**Date:** 2025-03-11  
**Status:** Approved

---

## Summary

A personal website for dual audiences (employers + friends) with a hybrid single-page layout: Hero, About, Projects grid, and Contact. Projects open in modals for detail views. Rich interactivity via micro-interactions, filters, and optional mode toggle. Built with Astro, deployed to GitHub Pages.

---

## Audience & Purpose

- **Primary:** Employers/recruiters (portfolio, professional story)
- **Secondary:** Friends/personal network (personality, casual tone)
- **Approach:** Different sections or optional mode toggle for tone

---

## Content Structure

- **Who I am** — Bio, skills, interests
- **Projects** — Grid of project cards with expandable detail modals
- **Contact** — Links (GitHub, LinkedIn, email)
- No timeline/phases of life; standard portfolio structure

---

## Architecture

- **Framework:** Astro (static site generation)
- **Hosting:** GitHub Pages (static output)
- **Interactivity:** React islands for modal, filters, optional mode toggle
- **Data:** JSON/TS or Markdown content collections for projects

**Structure:**
```
/
├── index.astro          # Single-page: Hero, About, Projects, Contact
├── src/
│   ├── components/
│   ├── layouts/
│   ├── content/ or data/
│   └── styles/
├── public/
└── .github/workflows/
```

---

## Components

| Component | Purpose |
|-----------|---------|
| Layout.astro | Page shell, meta, nav |
| Hero.astro | Hero section |
| About.astro | About section |
| ProjectCard.astro | Project card in grid |
| ProjectModal (React) | Expandable project details |
| ModeToggle (React, optional) | Professional vs casual |
| ProjectFilter (React, optional) | Filter by tag/tech |

---

## Interactivity & UX

- **Micro-interactions:** Hover effects, smooth scroll, modal transitions
- **Project modal:** Click card → overlay with full details; close via X, overlay, Escape
- **User-driven:** Project filter by tag; optional mode toggle
- **Accessibility:** Keyboard nav, focus trap in modal, semantic HTML

---

## GitHub Workflow

- **main** = production (deployed)
- Feature branches + PRs required
- PR template: description, checklist
- **GitHub Actions:** On push to main → build → deploy to GitHub Pages

---

## Testing & Error Handling

- Build must pass
- Manual QA for layout, links, modal, filters
- Optional: Lighthouse, `astro check` in CI
- Modal: graceful handling of missing/invalid project data

---

## Tech Stack

- Astro
- React (islands for interactive components)
- GitHub Pages
- GitHub Actions

---

## Future Considerations

- WASM experiment page (Rust compiled to WASM)
- Game dev aesthetic enhancements
- Custom domain (if desired)
