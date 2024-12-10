import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primario)',
        secondary: 'var(--color-secundario)',
        complementary: 'var(--color-complementario)',
        disabled: 'var(--color-desactivado)',
        success: 'var(--color-exito)',
        error: 'var(--color-error)',
        warning: 'var(--color-advertencia)',
        foreground: 'var(--foreground)',
        background: 'var(--background)',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
};
export default config;
