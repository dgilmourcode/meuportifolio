/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0f172a',
        secondary: '#1e293b',
        accent: '#6b2bf5',
        dark: '#020617',
        'text-muted': '#94a3b8',

        // novas cores baseadas na sua paleta
        'primary-soft': '#1e293b',
        'primary-strong': '#020617',
        'accent-light': '#8b5cf6',
        'accent-soft': '#a78bfa',
        'bg-dark': '#020617',
        'bg-card': '#1e293b',
      },
    },
  },
  plugins: [],
}