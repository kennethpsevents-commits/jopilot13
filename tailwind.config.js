/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Design Brief Color Palette
        black: '#000000',
        'baby-blue': '#A8D8FF',
        'baby-blue-light': '#E6F4FF',
        'baby-blue-dark': '#7BB3E6',
        white: '#FFFFFF',
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
      spacing: {
        // 8px Spacing System
        '1': '0.5rem',   // 8px
        '2': '1rem',     // 16px
        '3': '1.5rem',   // 24px
        '4': '2rem',     // 32px
        '8': '4rem',     // 64px
        '12': '6rem',    // 96px
        '16': '8rem',    // 128px
        '20': '10rem',   // 160px
        '24': '12rem',   // 192px
      },
      fontSize: {
        // Apple-class Typography Scale
        'display': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],      // 64px
        'h1': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],           // 48px
        'h2': ['2rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],           // 32px
        'h3': ['1.5rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],         // 24px
        'h4': ['1.25rem', { lineHeight: '1.5', letterSpacing: '0' }],               // 20px
        'body': ['1rem', { lineHeight: '1.5', letterSpacing: '0' }],                // 16px
        'body-sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0' }],         // 14px
        'caption': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.025em' }],    // 12px
      },
      borderRadius: {
        'sm': '0.5rem',   // 8px
        'md': '1rem',     // 16px
        'lg': '1.5rem',   // 24px
        'xl': '2rem',     // 32px
        '2xl': '3rem',    // 48px
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      },
      animation: {
        'radar-pulse': 'radar-pulse 2s ease-in-out infinite',
        'ai-scanning': 'ai-scanning 3s linear infinite',
        'scanning-dots': 'scanning-dots 1.5s ease-in-out infinite',
      },
      keyframes: {
        'radar-pulse': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.1)', opacity: '0.7' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'ai-scanning': {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.1)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
        'scanning-dots': {
          '0%, 20%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.2)', opacity: '0.7' },
          '80%, 100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '16px',
        'xl': '24px',
      },
      letterSpacing: {
        'tight': '-0.025em',
        'normal': '0',
        'wide': '0.025em',
      },
    },
  },
  plugins: [],
}