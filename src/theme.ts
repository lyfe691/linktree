import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: '#000',
        color: 'white',
        backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(20,20,20,0.9) 100%)',
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
  },
})

export default theme 