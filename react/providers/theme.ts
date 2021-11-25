import type { Theme, ThemeUIStyleObject } from 'theme-ui'

export const theme: Theme | Record<string, ThemeUIStyleObject> = {
  breakpoints: ['40rem', '56rem', '64rem', '80rem', '90rem'],
  space: [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64],
  fonts: {
    body: 'sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    heading: 1.125,
    body: 1.25,
    paragraph: 1.5,
  },
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#07c',
    secondary: '#30c',
    muted: [
      '#FEFEFE',
      '#EBEBEF',
      '#CBCBCF',
      '#9C99A0',
      '#6C6771',
      '#3B3542',
      '#0B0313',
    ],
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
    },
    pre: {
      fontFamily: 'monospace',
      overflowX: 'auto',
      code: {
        color: 'inherit',
      },
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 'inherit',
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
    },
    th: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
    td: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
  },
  cards: {
    primary: {
      border: '1px solid',
      borderColor: 'muted.3',
      padding: 4,
      borderRadius: 4,
    },
    compact: {
      border: '1px solid',
      borderColor: 'muted.3',
      padding: 2,
      borderRadius: 4,
    },
  },
  links: {
    button: {
      display: 'inline-block',
      border: '1px solid',
      borderColor: 'muted.5',
      color: 'muted.5',
      borderRadius: 16,
      paddingX: 4,
      paddingY: 2,
      width: 'fit-content',
      textDecoration: 'none',
      ':hover': {
        borderColor: 'black',
        color: 'black',
        textDecoration: 'underline',
      },
    },
    'plain-hover': {
      textDecoration: 'none',
      color: 'inherit',
      ':hover': {
        textDecoration: 'underline',
      },
    },
    plain: {
      textDecoration: 'none',
      color: 'inherit',
    },
  },
  text: {
    title: {
      fontSize: [4, 5, 6],
      fontWeight: 'bold',
      marginBottom: 2,
      lineHeight: 'heading',
    },
    subtitle: {
      fontSize: [2, 3, 4],
      marginBottom: 2,
      lineHeight: 'heading',
    },
    section: {
      fontSize: [3, 3, 4],
      lineHeight: 'heading',
      marginBottom: 3,
    },
    content: {
      fontSize: [1, 1, 2],
      marginBottom: 2,
      lineHeight: 'body',
    },
    body: {
      fontSize: 2,
      lineHeight: 'body',
    },
    small: {
      fontSize: 1,
      lineHeight: 'body',
    },
    paragraph: {
      fontSize: 2,
      lineHeight: 'paragraph',
    },
    bold: {
      fontSize: 2,
      lineHeight: 'body',
      fontWeight: 'bold',
    },
  },
  images: {
    avatar: { borderRadius: 4, height: 40, width: 40 },
  },
  skeleton: {
    button: {
      height: 36,
      borderRadius: 16,
    },
    text: {
      title: {
        height: [27, 36, 54],
      },
      subtitle: {
        height: [18, 22, 27],
      },
      section: {
        height: [22, 22, 27],
      },
      content: {
        height: [21, 21, 24],
      },
      body: {
        height: 20,
      },
      small: {
        height: 17,
      },
      paragraph: {
        height: 20,
        marginBottom: 1,
      },
    },
  },
}
