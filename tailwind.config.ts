import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: {
    // Terracotta palette. Token names are historical: pine/forest/leaf are the
    // terracotta brand shades (forest = main button colour), navy is espresso.
    colors: {
      navy: '#2A1712', snow: '#FBF7F2', gold: '#E8A24A', turquoise: '#2BB3B1',
      pine: '#8A2300', forest: '#A22900', leaf: '#C2551F', sand: '#F6EEE4',
      mist: '#F8EDE5', paper: '#FCF8F4', ink: '#2B1D17', slate: '#7A6A61', saffron: '#CA8A04',
    },
    fontFamily: { display: ['var(--font-display)', 'sans-serif'], body: ['var(--font-inter)', 'sans-serif'] },
    borderRadius: { brand: '16px' },
    boxShadow: { soft: '0 16px 48px rgba(42,23,18,.10)' },
    maxWidth: { content: '1200px' },
  } }, plugins: [],
};
export default config;
