import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				white: "#FFF",
				black: "#000",
				appcolor: { DEFAULT: "var(--app-color)" },
				money: "#fcd540",
				background: "var(--tg-theme-bg-color)",
				secondary: "var(--tg-theme-secondary-bg-color)",
				text: "var(--tg-theme-text-color)",
				hint: "var(--tg-theme-hint-color)",
				link: "var(--tg-theme-link-color)",
				button: "var(--tg-theme-button-color)",
				buttonText: "var(--tg-theme-button-text-color)",
				destructive: "var(--tg-theme-destructive-text-color)",
				accent: "var(--tg-theme-accent-text-color)",
				section: "var(--tg-theme-section-bg-color)",
				sectionHeader: "var(--tg-theme-section-header-text-color)",
				subtitle: "var(--tg-theme-subtitle-text-color)",
			},
			keyframes: {
				toTop: {
					"0%": { transform: "translate3d(0,0%,0)", opacity: "100%" },
					"100%": { transform: "translate3d(0,-300%,0)", opacity: "0%" },
				},
			},
			animation: {
				toTop: "toTop 1s linear",
			},
		},
		fontFamily: {
			sans: ["var(--font-geist-sans)"],
			mono: ["var(--font-geist-mono)"],
		},
	},
	plugins: [require("tailwindcss-animate")],
};
export default config;
