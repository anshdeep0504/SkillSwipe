/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        linkedin: {
          background: '#f3f2ef',
          card: '#ffffff',
          hover: '#f3f2ef',
          text: '#000000',
          muted: '#666666',
          border: '#e0e0e0',
          input: '#eef3f8',
          button: '#0a66c2',
          buttonHover: '#004182',
          accent: '#70b5f9',
          success: '#057642',
          error: '#cc1016'
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'system-ui', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        card: '0 0 0 1px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.05)',
        hover: '0 0 0 1px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.08)',
      }
    },
  },
  plugins: [],
};