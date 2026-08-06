# Kaylee Henry — Portfolio

A personal portfolio site built with React, Vite, and Tailwind CSS. It showcases my projects, technical skills, and a bit of my UI/UX and interactive design sensibility — including a couple of hidden mini-games for anyone who goes looking.

**Live site:** [portfolio-website-delta-snowy-48.vercel.app](https://portfolio-website-delta-snowy-48.vercel.app)

## Tech Stack

- **React** — component structure and UI state
- **Vite** — dev server and build tooling
- **Tailwind CSS** — styling
- **Framer Motion** — scroll and hover animations
- **Lucide React** — icon set

## Features

- Custom pixel-inspired design system with a retro/CRT visual style
- Filterable project grid (React, Django, Game Dev, Java)
- Animated hero and skills sections with a "window" open/minimize interaction
- Scroll-reveal animations on section entry
- Fully responsive, mobile-friendly layout
- Two hidden interactive mini-games (Flappy Duck and an ocean-themed game) as easter eggs

## Project Structure

```
├── public/              # Static assets (favicon, resume, icons)
├── src/
│   ├── assets/          # Images used across sections and games
│   ├── components/      # Nav, Hero, About, Projects, Skills, Contact, etc.
│   ├── data/             # Project and skills content (projects.js, skills.js)
│   ├── App.jsx           # Top-level layout and state
│   ├── FlappyDuckGame.jsx
│   ├── OceanScapeGame.jsx
│   └── main.jsx
├── index.html
└── vite.config.js
```

## Getting Started

Clone the repository:

```bash
git clone https://github.com/kaylee162/PortfolioWebsite.git
```

Move into the project folder:

```bash
cd PortfolioWebsite
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The app will open locally through Vite, usually at `http://localhost:5173`.

## Build for Production

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Deployment

The site is deployed on Vercel with automatic deployments from the `main` branch.

## Author

**Kaylee Henry**
Computer Science student at Georgia Tech

- Email: kayleehenry162@gmail.com
- GitHub: [github.com/kaylee162](https://github.com/kaylee162)
- LinkedIn: [linkedin.com/in/kaylee-henry-769357313](https://www.linkedin.com/in/kaylee-henry-769357313/)
