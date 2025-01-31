import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  fonts: {
    heading: '"JetBrains Mono", monospace',
    body: '"JetBrains Mono", monospace',
  },
  styles: {
    global: {
      body: {
        bg: '#050505',
        color: 'white',
        backgroundImage: 'linear-gradient(180deg, rgba(5,5,5,0.98) 0%, rgba(10,10,10,1) 100%)',
      },
    },
  },
  components: {
    Box: {
      baseStyle: {
        borderRadius: 'xl',
      },
    },
    Link: {
      baseStyle: {
        _hover: {
          textDecoration: 'none',
        },
      },
    },
    Container: {
      baseStyle: {
        maxW: 'container.sm',
      },
    },
  },
})

export default theme 