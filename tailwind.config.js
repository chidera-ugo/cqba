/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      340: '340px',
      360: '360px',
      375: '375px',
      425: '425px',
      480: '480px',
      560: '560px',
      640: '640px',
      690: '690px',
      768: '768px',
      880: '880px',
      960: '960px',
      1024: '1024px',
      1180: '1180px',
      1200: '1200px',
      1280: '1280px',
      1340: '1340px',
      1400: '1400px',
      1600: '1600px',
      1700: '1700px',
      2000: '2000px',
    },
    extend: {
      colors: {
        primary: {
          50: '#F2F8FF',
          400: '#2C7D7B',
          main: '#1A44ED',
          hmain: '#0063D7',
          600: '#185F5D',
          650: '#003E3C',
          700: '#0D4970',
          h700: '#063350',
          800: '#00395F',
          900: '#002C49',
        },
        success: {
          200: '#D9F9E6',
          400: '#B3DBC9',
          600: '#53B483',
          700: '#2F9461',
        },
        neutral: {
          50: '#FAFAFA',
          100: '#F6F7F9',
          140: '#EAECF0',
          160: '#F9FAFB',
          180: '#F0F2F5',
          190: '#E4E7EC',
          200: '#E5E7EA',
          210: '#F3F3F3',
          280: '#282828',
          main: '#414141',
          300: '#CED2D6',
          310: '#EFEFEF',
          400: '#9EA5AD',
          410: '#ffffff80',
          500: '#676E76',
          550: '#6C737B',
          600: '#596066',
          700: '#454C52',
          800: '#383F45',
          900: '#24292E',
          980: '#393939',
          1000: '#1A1D1F',
        },
        warning: {
          600: '#E9A23B',
          700: '#C8811A',
        },
        others: {
          yellow: '#FBF2CB',
          red: '#FEF2F2',
          blue: '#F1F9FF',
        },
      },
      fontFamily: {
        primary: ['Inter', 'Sans-Serif'],
      },
      animation: {
        'float-xy': 'float-xy 6s linear infinite',
        grow: 'grow .8s linear infinite',
        grow_sm: 'grow_sm .3s linear',
        slide_down: 'slide_down .4s linear',
        slide_right: 'slide_right .4s linear',
      },
      keyframes: {
        'float-xy': {
          '0%': {
            transform: 'translateY(0)',
            scale: '1',
            rotate: '0',
            opacity: 0,
          },
          '50%': {
            transform: 'translateY(15px)',
            scale: '1.1',
            rotate: '5deg',
            opacity: 1,
          },
          '100%': {
            transform: 'translateY(32px)',
            scale: '1.2',
            rotate: '10deg',
            opacity: 0,
          },
        },
        grow: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.5)' },
        },
        grow_sm: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
        },
        slide_down: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' },
        },
        slide_right: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(10px)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')],
};
