import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: {
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        surface: 'hsl(var(--surface))',
        elevated: 'hsl(var(--elevated))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          hover: '#1D4ED8',
          pressed: '#1E40AF',
          light: '#DBEAFE',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
          cyan: '#06B6D4',
        },
        success: '#22C55E',
        warning: '#F59E0B',
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar))',
          foreground: 'hsl(var(--sidebar-foreground))',
          active: 'hsl(var(--sidebar-active))',
          'active-foreground': 'hsl(var(--sidebar-active-foreground))',
        },
        chart: {
          cpu: '#2563EB',
          ram: '#06B6D4',
          disk: '#8B5CF6',
          battery: '#22C55E',
          network: '#F59E0B',
        },
      },
      borderRadius: {
        sm: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        display: [
          '32px',
          { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' },
        ],
        'page-title': [
          '24px',
          { lineHeight: '1.3', letterSpacing: '-0.02em', fontWeight: '600' },
        ],
        'section-title': [
          '18px',
          { lineHeight: '1.4', letterSpacing: '-0.01em', fontWeight: '600' },
        ],
        'card-title': ['16px', { lineHeight: '1.4', fontWeight: '500' }],
        /* Marketing scale — extends desktop tokens for landing hero/sections */
        'hero': [
          'clamp(2.5rem, 5vw + 1rem, 4.5rem)',
          { lineHeight: '1.05', letterSpacing: '-0.035em', fontWeight: '700' },
        ],
        'hero-sub': [
          'clamp(1.05rem, 0.4vw + 0.95rem, 1.25rem)',
          { lineHeight: '1.6', letterSpacing: '-0.01em', fontWeight: '400' },
        ],
        'section': [
          'clamp(1.75rem, 2vw + 1rem, 2.75rem)',
          { lineHeight: '1.15', letterSpacing: '-0.03em', fontWeight: '600' },
        ],
      },
      spacing: {
        'grid-gap': '20px',
        'card-pad': '24px',
        'content-pad': '24px',
        'section-y': 'var(--section-y)',
        'section-y-sm': 'var(--section-y-sm)',
        'section-y-lg': 'var(--section-y-lg)',
        'gutter': 'var(--gutter)',
      },
      maxWidth: {
        site: 'var(--site-max, 1200px)',
        narrow: '720px',
        prose: '640px',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(0 0 0 / 0.05)',
        'card-hover':
          '0 4px 6px -2px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.04)',
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.04)',
        md: '0 2px 4px -1px rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.04)',
        glow: '0 0 0 1px hsl(var(--primary) / 0.12), 0 8px 32px -8px hsl(var(--primary) / 0.35)',
        'glow-lg':
          '0 0 0 1px hsl(var(--primary) / 0.15), 0 16px 48px -12px hsl(var(--primary) / 0.4)',
        glass: '0 8px 32px rgb(15 23 42 / 0.06)',
      },
      backgroundImage: {
        'canvas-light':
          'radial-gradient(ellipse 100% 70% at 50% -15%, hsl(221 83% 53% / 0.06), transparent 50%)',
        'hero-glow':
          'radial-gradient(ellipse 80% 50% at 50% 0%, hsl(221 83% 53% / 0.12), transparent 60%)',
      },
      transitionDuration: {
        DEFAULT: '150ms',
        theme: '400ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'ease-out',
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
        },
        'blob-pulse': {
          '0%, 100%': { transform: 'scale(1) translate(0, 0)', opacity: '0.55' },
          '33%': { transform: 'scale(1.08) translate(2%, -2%)', opacity: '0.7' },
          '66%': { transform: 'scale(0.96) translate(-2%, 3%)', opacity: '0.45' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(220%)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 hsl(221 83% 53% / 0.35)' },
          '50%': { boxShadow: '0 0 0 8px hsl(221 83% 53% / 0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 10s ease-in-out infinite',
        'blob-pulse': 'blob-pulse 14s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        shimmer: 'shimmer 1.8s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2.4s ease-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
