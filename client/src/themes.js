import { createTheme } from '@mui/material/styles';


export const theme = createTheme({
    palette: {

        primary: {
            main: '#0a1929',
        },
        secondary: {
            main: '#518fcd',
        },
        white: {
            main: '#ffffff',
        },
        success: {
            main: '#66bb6a',
            light: 'rgba(102, 187, 106, 0.16)',
        },
        warning: {
            main: '#ffa726',
            light: 'rgba(255, 167, 38, 0.16)',
        }

    },
    components: {
        MuiLink: {
            styleOverrides: {
                root: {
                    textDecoration: 'none',
                    '&:hover': {
                        color: '#fff'
                    }
                }
            }
        },
        MuiSkeleton: {
            defaultProps: {
                animation: 'pulse',
                variant: 'rectangular',
            },
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                }
            }
        }

    },

    typography: {
        fontFamily: [
            'Inter',
            'Merriweather',
            'Jacques Francois'
        ].join(','),
        h1: {
            fontFamily: 'Merriweather',
            fontSize: '3.8rem',
        },
        h2: {
            fontFamily: 'Merriweather',
            fontSize: '3rem',
        },
        h6: {
            fontFamily: 'Merriweather',
            fontWeight: 600
        },
        h5: {
            fontFamily: 'Merriweather',
            fontSize: '1.6rem',
            fontWeight: 600,
            color: '#fff',
        },
        h4: {
            fontSize: '2rem',
            fontFamily: 'Merriweather',
        },
        h3: {
            fontFamily: 'Merriweather',
            fontSize: '2.5rem',
        },
        subtitle1: {
            fontFamily: 'Inter',
        },
        subtitle2: {
            fontFamily: 'Inter',
        },
        body1: {
            fontFamily: 'Inter',
            fontSize: '1.125rem',

        },
        body2: {
            fontFamily: 'Inter',
            fontSize: '0.875rem',
        },
        button: {
            fontFamily: 'Inter',
        },
        caption: {
            fontFamily: 'Inter',
            color: '#575757'
        },
        overline: {
            fontFamily: 'Inter',
        },
        price: {
            fontSize: '2rem',
            fontFamily: 'Jacques Francois'
        },

    },
    shape: {
        borderRadius: 8,
    },

    
})

theme.shadows.push(
    " 0px 0px 22px -12px rgba(0,0,0,0.69)"
  );
  