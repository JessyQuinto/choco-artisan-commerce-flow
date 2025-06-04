
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
				// Paleta principal optimizada
				'primary-text': '#181311',
				'primary-secondary': '#886f63', 
				'primary-background': '#f4f2f0',
				'primary-action': '#e55d19',
				'primary-white': '#ffffff',
				
				// Aliases para facilidad de uso
				'action': '#e55d19',
				'secondary': '#886f63',
				'primary': '#181311',
				'background': '#ffffff',
				
				// Colores shadcn originales para compatibilidad
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				foreground: 'hsl(var(--foreground))',
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
			},
			fontFamily: {
				sans: ['"Plus Jakarta Sans"', '"Noto Sans"', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'shimmer': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-up': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'zoom-in': {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'shimmer': 'shimmer 2s infinite',
				'fade-in': 'fade-in 0.5s ease-out',
				'slide-up': 'slide-up 0.6s ease-out',
				'zoom-in': 'zoom-in 0.3s ease-out'			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		// Accessibility plugin
		function({ addUtilities, addComponents }: any) {
			// Screen reader only utility
			addUtilities({
				'.sr-only': {
					position: 'absolute',
					width: '1px',
					height: '1px',
					padding: '0',
					margin: '-1px',
					overflow: 'hidden',
					clip: 'rect(0, 0, 0, 0)',
					whiteSpace: 'nowrap',
					border: '0',
				},
				'.not-sr-only': {
					position: 'static',
					width: 'auto',
					height: 'auto',
					padding: '0',
					margin: '0',
					overflow: 'visible',
					clip: 'auto',
					whiteSpace: 'normal',
				}
			});

			// Focus visible utilities
			addUtilities({
				'.focus-visible-ring': {
					'&:focus-visible': {
						outline: '2px solid #e55d19',
						outlineOffset: '2px',
					}
				}
			});

			// High contrast mode utilities
			addComponents({
				'.high-contrast': {
					'--primary-text': '#000000',
					'--primary-background': '#ffffff',
					'--action': '#0066cc',
					'--secondary': '#333333',
					
					'& .bg-action': {
						backgroundColor: '#0066cc !important',
					},
					'& .text-action': {
						color: '#0066cc !important',
					},
					'& .border-action': {
						borderColor: '#0066cc !important',
					}
				},
				
				'.large-text': {
					fontSize: '1.25rem !important',
					lineHeight: '1.75rem !important',
					
					'& h1': { fontSize: '3rem !important' },
					'& h2': { fontSize: '2.5rem !important' },
					'& h3': { fontSize: '2rem !important' },
					'& h4': { fontSize: '1.75rem !important' },
					'& h5': { fontSize: '1.5rem !important' },
					'& h6': { fontSize: '1.25rem !important' },
				},
				
				'.reduce-motion': {
					'& *': {
						animationDuration: '0.01ms !important',
						animationIterationCount: '1 !important',
						transitionDuration: '0.01ms !important',
					}
				},
				
				'.keyboard-user': {
					'& *:focus': {
						outline: '2px solid #e55d19 !important',
						outlineOffset: '2px !important',
					}
				},

				'.skip-link': {
					position: 'absolute',
					top: '-40px',
					left: '6px',
					backgroundColor: '#e55d19',
					color: '#ffffff',
					padding: '8px 16px',
					textDecoration: 'none',
					borderRadius: '4px',
					zIndex: '1000',
					fontSize: '14px',
					fontWeight: '600',
					transition: 'top 0.3s',
					
					'&:focus': {
						top: '6px',
					}
				}
			});
		}
	],
} satisfies Config;
