import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
		"./1776343991094229412.html"
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				pixel: ['"Press Start 2P"', 'monospace'],
				rubik: ['Rubik', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				neon: {
					cyan: '#00f5ff',
					green: '#39ff14',
					purple: '#bf00ff',
					pink: '#ff0090',
					yellow: '#ffff00',
				},
				cyber: {
					dark: '#020408',
					darker: '#010203',
					panel: '#0a0f1a',
					border: '#1a2a3a',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			boxShadow: {
				'neon-cyan': '0 0 10px #00f5ff, 0 0 20px #00f5ff, 0 0 40px #00f5ff33',
				'neon-green': '0 0 10px #39ff14, 0 0 20px #39ff14, 0 0 40px #39ff1433',
				'neon-purple': '0 0 10px #bf00ff, 0 0 20px #bf00ff, 0 0 40px #bf00ff33',
				'neon-pink': '0 0 10px #ff0090, 0 0 20px #ff0090, 0 0 40px #ff009033',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'glitch': {
					'0%, 100%': { transform: 'translate(0)', clipPath: 'inset(0 0 0 0)' },
					'20%': { transform: 'translate(-2px, 2px)', clipPath: 'inset(30% 0 50% 0)' },
					'40%': { transform: 'translate(2px, -2px)', clipPath: 'inset(60% 0 20% 0)' },
					'60%': { transform: 'translate(-1px, 1px)', clipPath: 'inset(10% 0 80% 0)' },
					'80%': { transform: 'translate(1px, -1px)', clipPath: 'inset(80% 0 5% 0)' },
				},
				'scan': {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(100vh)' }
				},
				'flicker': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' },
					'75%': { opacity: '0.95' },
				},
				'pulse-neon': {
					'0%, 100%': { boxShadow: '0 0 5px #00f5ff, 0 0 10px #00f5ff' },
					'50%': { boxShadow: '0 0 20px #00f5ff, 0 0 40px #00f5ff, 0 0 60px #00f5ff' },
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'glitch': 'glitch 0.5s infinite',
				'scan': 'scan 8s linear infinite',
				'flicker': 'flicker 3s ease-in-out infinite',
				'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
				'float': 'float 3s ease-in-out infinite',
				'fade-in': 'fade-in 0.6s ease-out forwards',
				'slide-in-right': 'slide-in-right 0.3s ease-out',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
