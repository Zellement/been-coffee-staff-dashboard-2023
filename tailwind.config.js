/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

/**
 * Font 'Scale'
 * Can be adjusted using the link below.
 * @link https://utopia.fyi/type/calculator/?c=320,16,1.2,1848,16,1.38,6,0,&s=0.75%7C0.5%7C0.25,1.5%7C2%7C3%7C4%7C6,s-l
 */
module.exports = {
    darkMode: 'class',
    future: {
        hoverOnlyWhenSupported: true
    },
    content: [
        './assets/scss/**/*.scss',
        './pages/**/*.{js,vue}',
        './components/**/*.{js,vue}',
        './layouts/**/*.{js,vue}'
    ],
    theme: {
        fontSize: {
            '3xs': [
                'clamp(0.5rem, 0.5rem + 0vw, 0.5rem);',
                {
                    lineHeight: 'calc(100% + 10px)'
                }
            ],
            '2xs': [
                'clamp(0.75rem, 0.75rem + 0vw, 0.75rem);',
                {
                    lineHeight: 'calc(100% + 10px)'
                }
            ],
            xs: [
                'clamp(0.875rem, 0.875rem + 0vw, 0.875rem);',
                {
                    lineHeight: 'calc(100% + 10px)'
                }
            ],
            sm: [
                'clamp(1rem, 1rem + 0vw, 1rem)',
                {
                    lineHeight: 'calc(100% + 10px)'
                }
            ],
            base: [
                'clamp(1.125rem, 1.125rem + 0vw, 1.125rem)',
                {
                    lineHeight: 'calc(100% + 10px)'
                }
            ],
            lg: [
                'clamp(1.25rem, 1.2811rem + -0.1351vw, 1.125rem)',
                {
                    lineHeight: 'calc(100% + 10px)'
                }
            ],
            xl: [
                'clamp(1.4375rem, 1.4375rem + 0vw, 1.4375rem);',
                {
                    lineHeight: 'calc(100% + 10px)'
                }
            ],
            '2xl': [
                'clamp(1.625rem, 1.5939rem + 0.1351vw, 1.75rem)',
                {
                    lineHeight: 'calc(100% + 10px)'
                }
            ],
            '3xl': [
                'clamp(1.8125rem, 1.735rem + 0.3876vw, 2.1875rem)',
                {
                    lineHeight: 'calc(100% + 10px)'
                }
            ],
            '4xl': [
                'clamp(2rem, 1.8135rem + 0.8108vw, 2.75rem)',
                {
                    lineHeight: 'calc(100% + 10px)'
                }
            ],
            '5xl': [
                'clamp(2.25rem, 1.9547rem + 1.2838vw, 3.4375rem)',
                {
                    lineHeight: 'calc(100% + 10px)'
                }
            ],
            '6xl': [
                'clamp(2.5625rem, 2.1274rem + 1.8919vw, 4.3125rem)',
                {
                    lineHeight: 'calc(100% + 10px)'
                }
            ],
            '7xl': [
                'clamp(3.625rem, 2.4439rem + 5.1351vw, 8.375rem)',
                {
                    lineHeight: 'calc(100% + 10px)'
                }
            ]
        },
        screens: {
            '3xs': '21em',
            '2xs': '23em',
            xs: '25.625em',
            sm: '30em',
            'sm-md': '35em',
            md: '43.125em',
            lg: '54.875em',
            xl: '79.6875em',
            '2xl': '90em',
            '3xl': '100em',
            max: '1848px'
        },
        extend: {
            fontFamily: {
                riverside: ['Riverside', 'Impact', 'sans-serif'],
                'riverside-outline': ['Riverside Outline', 'Impact', 'sans-serif'],
                krete: ['Krete', 'Georgia', 'serif'],
                mono: ['Courier', 'monospace'],
                sans: ['Roboto', 'sans-serif']
            },
            colors: {
                butterscotch: {
                    DEFAULT: '#FAB944',
                    50: '#FFFCF7',
                    100: '#FEF4E3',
                    200: '#FDE6BB',
                    300: '#FCD793',
                    400: '#FBC86C',
                    500: '#FAB944',
                    600: '#F9A50D',
                    700: '#C88305',
                    800: '#925F04',
                    900: '#5B3B02'
                },
                tuscany: {
                    DEFAULT: '#D05C32',
                    50: '#F2D3C7',
                    100: '#EEC6B7',
                    200: '#E7AB96',
                    300: '#DF9174',
                    400: '#D87653',
                    500: '#D05C32',
                    600: '#A44726',
                    700: '#77331B',
                    800: '#492011',
                    900: '#1B0C06'
                },
                navy: {
                    DEFAULT: '#1B1D3C',
                    50: '#5A5FB5',
                    100: '#4E53AD',
                    200: '#414690',
                    300: '#343874',
                    400: '#282B58',
                    500: '#1B1D3C',
                    600: '#0A0A15',
                    700: '#000000',
                    800: '#000000',
                    900: '#000000'
                },
                seashell: {
                    DEFAULT: '#FFF4E8',
                    50: '#FFFFFF',
                    100: '#FFFFFF',
                    200: '#FFFFFF',
                    300: '#FFFFFF',
                    400: '#FFFFFF',
                    500: '#FFF4E8',
                    600: '#FFD9B0',
                    700: '#FFBE78',
                    800: '#FFA440',
                    900: '#FF8908',
                    950: '#EB7A00'
                }
            },
            zIndex: {
                '-10': '-10',
                '-20': '-20',
                30: '30',
                40: '40',
                50: '50',
                60: '60'
            }

        }
    },
    plugins: [],
    corePlugins: {
        container: false
    }
}
