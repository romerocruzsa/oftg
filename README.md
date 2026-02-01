# Origami Fortune Teller Game

A fun, interactive origami fortune teller (cootie catcher) game built with React, TypeScript, and Vite. Pick a color, watch it fold, pick a number, and reveal your fortune!

## Features

- Interactive origami fortune teller with smooth animations
- Four vibrant colors to choose from (Red, Purple, Blue, Pink)
- Animated counting/folding phase
- Number selection with 8 possible outcomes
- Prize tickets with varying probabilities:
  - 70% chance: Keep Going!
  - 15% chance: Activity Ticket
  - 15% chance: Dinner Ticket
- Beautiful UI with Tailwind CSS
- Fully responsive design

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Styling
- **Framer Motion** - Animations
- **Radix UI** - Accessible UI primitives

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Deployment

This project is configured for automatic deployment to GitHub Pages. Every push to the `main` branch triggers a deployment via GitHub Actions.

**Live Demo**: [https://romerocruzsa.github.io/oftg/](https://romerocruzsa.github.io/oftg/)

## How to Play

1. **Pick a Color**: Choose one of the four colors (Red, Purple, Blue, or Pink)
2. **Watch it Count**: The fortune teller folds back and forth based on the letters in your color
3. **Pick a Number**: Select a number from 1-8
4. **Reveal Your Fortune**: See if you won a ticket or need to keep playing!

## License

MIT
