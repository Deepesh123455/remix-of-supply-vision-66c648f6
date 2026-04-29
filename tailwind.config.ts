import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
      },
      colors: {
        "surface-elevated": "var(--bg-card)",
        "text-subtle": "var(--text-muted)",
        "text-heading": "var(--text-main)",
        success: "var(--success)",
        warning: "var(--warning)",
        danger: "var(--danger)",
        border: "var(--border)",
        "border-strong": "var(--border-strong)",
        input: "var(--border)",
        ring: "var(--primary)",
        background: "var(--bg-main)",
        foreground: "var(--text-main)",
        primary: {
          DEFAULT: "var(--primary)",
          light: "var(--primary-light)",
          glow: "var(--primary-glow)",
          foreground: "var(--text-on-dark)",
        },
        secondary: {
          DEFAULT: "var(--bg-subtle)",
          foreground: "var(--text-main)",
        },
        destructive: {
          DEFAULT: "var(--danger)",
          foreground: "var(--text-on-dark)",
        },
        muted: {
          DEFAULT: "var(--bg-subtle)",
          foreground: "var(--text-muted)",
        },
        accent: {
          DEFAULT: "var(--accent-green)",
          light: "var(--accent-green-light)",
          foreground: "var(--text-on-dark)",
        },
        popover: {
          DEFAULT: "var(--bg-card)",
          foreground: "var(--text-main)",
        },
        card: {
          DEFAULT: "var(--bg-card)",
          foreground: "var(--text-main)",
        },
        sidebar: {
          DEFAULT: "var(--bg-sidebar)",
          foreground: "var(--text-on-dark)",
          primary: "var(--primary)",
          "primary-foreground": "var(--text-on-dark)",
          accent: "var(--bg-subtle)",
          "accent-foreground": "var(--text-main)",
          border: "var(--border)",
          ring: "var(--primary)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(0.8)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
