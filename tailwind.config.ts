import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: {
      navy: '#0B1F2E', snow: '#F7F9FA', gold: '#E8A24A', turquoise: '#2BB3B1',
      pine: '#003820', forest: '#0f5132', leaf: '#006d30', sand: '#F8F6F0',
      mist: '#f2f3ff', paper: '#faf8ff', ink: '#131b2e', slate: '#64748B', saffron: '#CA8A04',
    },
    fontFamily: { display: ['var(--font-display)', 'sans-serif'], body: ['var(--font-inter)', 'sans-serif'] },
    borderRadius: { brand: '16px' },
    boxShadow: { soft: '0 16px 48px rgba(11,31,46,.10)' },
    maxWidth: { content: '1200px' },
  } }, plugins: [],
};
export default config;
