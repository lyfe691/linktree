import { Box, ChakraProvider, Container } from '@chakra-ui/react'
import { LinkTree } from './components/LinkTree'
import ParticlesBackground from './components/ParticlesBackground'
import theme from './theme'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box
        minH="100vh"
        position="relative"
        bg="black"
        backgroundImage="radial-gradient(circle at 50% 0%, rgba(50, 50, 50, 0.7) 0%, rgba(0, 0, 0, 0.8) 70%)"
      >
        <ParticlesBackground />
        <Container
          maxW="container.lg"
          position="relative"
          zIndex={1}
        >
          <LinkTree />
        </Container>
      </Box>
    </ChakraProvider>
  )
}

export default App
