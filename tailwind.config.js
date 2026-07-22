/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta inspirada en la niebla y el ritual de DBD
        fog: {
          950: '#0a0908', // negro casi absoluto, fondo base
          900: '#141210',
          800: '#1e1b17',
          700: '#2c2721',
          600: '#3d3833',
        },
        blood: {
          700: '#8a0f0f',
          600: '#a91515',
          500: '#c41e1e', // acento principal
          400: '#e0392f',
        },
        bone: {
          100: '#eae5da', // texto principal, tono hueso, no blanco puro
          300: '#c9c0ae',
          500: '#8f8574',
        },
        ritual: {
          500: '#5c1a1a', // acento secundario, rojo oscuro óxido
        },
        // Tono acero/grisáceo de los paneles y filas del menú oficial
        steel: {
          900: '#1a1e22',
          800: '#242a2f',
          700: '#333b42',
          600: '#495259',
          400: '#8a96a1', // etiquetas de sección, texto secundario apagado
        },
      },
      fontFamily: {
        // Condensada en mayúsculas, como el menú del juego
        display: ['"Oswald"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(196, 30, 30, 0.45)' },
          '50%': { boxShadow: '0 0 24px 6px rgba(196, 30, 30, 0.45)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-2px)' },
          '75%': { transform: 'translateX(2px)' },
        },
        ember: {
          '0%': { transform: 'translateY(0) translateX(0)', opacity: '0' },
          '10%': { opacity: '0.9' },
          '100%': { transform: 'translateY(-70vh) translateX(12px)', opacity: '0' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pop-in': {
          '0%': { transform: 'scale(0.1)', opacity: '0' },
          '55%': { transform: 'scale(2.1)', opacity: '1' },
          '75%': { transform: 'scale(1.15)' },
          '100%': { transform: 'scale(1.4)', opacity: '1' },
        },
        'drop-in': {
          '0%': { transform: 'translateY(0) scale(1)' },
          '65%': { transform: 'translateY(112px) scale(1)' },
          '85%': { transform: 'translateY(112px) scale(2)' },
          '100%': { transform: 'translateY(112px) scale(1.7)' },
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 1.8s ease-in-out infinite',
        shake: 'shake 0.3s ease-in-out',
        ember: 'ember linear infinite',
        'fade-in': 'fade-in 0.4s ease-out',
        'pop-in': 'pop-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        'drop-in': 'drop-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both',
      },
    },
  },
  plugins: [],
};
