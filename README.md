# Personal Portfolio (Static HTML/CSS/JS)

A fast, responsive single‑page portfolio for Mohan R. Built with vanilla HTML/CSS/JS and a few lightweight vendor libraries. Optimized for quick first paint and shareable rich previews.

## Live Sections
- Home (hero with typed text + resume CTA)
- About
- Experience 
- Skills
- Projects
- Coding Profiles
- Contact

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- Three.js
- React Three Fiber
- Next Themes
- Lucide Icons

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio-nextjs.git
```

2. Install dependencies:
```bash
cd portfolio-nextjs
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
portfolio-nextjs/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   └── theme-provider.tsx
├── public/
│   └── assets/
├── styles/
│   └── globals.css
└── package.json
```

## Customization

1. Update the content in the components to match your information
2. Modify the theme colors in `globals.css`
3. Add your own sections and components
4. Customize the 3D elements in the Hero component

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
