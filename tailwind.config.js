module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
       primary: '#1f1f1f',
       text: '#fff',
       nav: '#282828',
      },
      gridTemplateColumns: {
        'main': 'auto 1fr',
      },
      boxShadow: {
        navBar: '0 1px 3px 0 rgb(0 0 0 / 15%);',
      },
    },
    fontFamily: {
      sans: ['Open Sans', 'sans-serif'],
    },
  },
  plugins: [],
}
