import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
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
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				swipe: {
					accept: 'hsl(var(--swipe-accept))',
					reject: 'hsl(var(--swipe-reject))',
					'accept-glow': 'hsl(var(--swipe-accept-glow))',
					'reject-glow': 'hsl(var(--swipe-reject-glow))'
				}
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-accept': 'var(--gradient-accept)',
				'gradient-reject': 'var(--gradient-reject)',
				'gradient-card': 'var(--gradient-card)'
			},
			boxShadow: {
				'card': 'var(--shadow-card)',
				'accept': 'var(--shadow-accept)',
				'reject': 'var(--shadow-reject)'
			},
			transitionTimingFunction: {
				'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
				'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'swipe-accept': {
					'0%': { transform: 'translateX(0px) rotate(0deg)', opacity: '1' },
					'50%': { transform: 'translateX(150px) rotate(15deg)', opacity: '0.8' },
					'100%': { transform: 'translateX(400px) rotate(30deg)', opacity: '0' }
				},
				'swipe-reject': {
					'0%': { transform: 'translateX(0px) rotate(0deg)', opacity: '1' },
					'50%': { transform: 'translateX(-150px) rotate(-15deg)', opacity: '0.8' },
					'100%': { transform: 'translateX(-400px) rotate(-30deg)', opacity: '0' }
				},
				'card-enter': {
					'0%': { transform: 'scale(0.8) translateY(100px)', opacity: '0' },
					'100%': { transform: 'scale(1) translateY(0px)', opacity: '1' }
				},
				'bounce-gentle': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-5px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'swipe-accept': 'swipe-accept 0.6s ease-out forwards',
				'swipe-reject': 'swipe-reject 0.6s ease-out forwards',
				'card-enter': 'card-enter 0.5s ease-out',
				'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
