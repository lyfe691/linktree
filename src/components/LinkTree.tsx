import {
  VStack,
  Heading,
  Box,
  Link as ChakraLink,
  Text,
  Icon,
  Container,
  Flex,
  keyframes,
  Image,
} from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/avatar";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram, FaGlobe, FaTiktok, FaPaypal } from "react-icons/fa";
import { SiKofi } from "react-icons/si";
import { useEffect, useRef } from "react";

const MotionBox = motion(Box);
const MotionLink = motion(ChakraLink);
const MotionFlex = motion(Flex);

const floatAnimation = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(-1deg); }
  75% { transform: translateY(8px) rotate(1deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
`;

const starryBackground = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const orbitAnimation = keyframes`
  0% { transform: rotate(0deg) translateX(6px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(6px) rotate(-360deg); }
`;

const links = [
  {
    title: "GitHub",
    url: "https://github.com/lyfe691",
    icon: FaGithub,
    color: "#f0f6fc",
    description: "Check out my code repositories",
  },
  {
    title: "LinkedIn",
    url: "https://linkedin.com/in/yanis-sebastian-zürcher",
    icon: FaLinkedin,
    color: "#0A66C2",
    description: "Connect with me professionally",
  },
  {
    title: "Website",
    url: "https://ysz.life",
    icon: FaGlobe,
    color: "whiteAlpha.900",
    description: "Visit my personal website",
  },
  {
    title: "TikTok",
    url: "https://tiktok.com/i know youre watching this",
    icon: FaTiktok,
    color: "#ffffff",
    description: "Follow my TikTok content",
  },
  {
    title: "Ko-fi",
    url: "https://ko-fi.com/yanissebastianzuercher",
    icon: SiKofi,
    color: "#FF5E5B",
    description: "Support my work",
  },
  {
    title: "PayPal",
    url: "https://paypal.me/lyfe691",
    icon: FaPaypal,
    color: "#00457C",
    description: "Send me a tip",
  },
];

const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      pulse: number;
    }> = [];

    const createParticle = () => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.5,
        pulse: Math.random() * Math.PI,
      };
    };

    for (let i = 0; i < 100; i++) {
      particles.push(createParticle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.pulse += 0.02;
        particle.opacity = 0.3 + Math.sin(particle.pulse) * 0.2;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Box
      as="canvas"
      ref={canvasRef}
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      zIndex="0"
      pointerEvents="none"
      sx={{
        mixBlendMode: "screen",
      }}
    />
  );
};

export const LinkTree = () => {
  return (
    <Container 
      py={8} 
      minH="100vh" 
      maxW="container.sm"
      display="flex" 
      flexDirection="column"
      position="relative"
      overflow="hidden"
      _before={{
        content: '""',
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "linear-gradient(45deg, #000000, #020510, #000000)",
        backgroundSize: "400% 400%",
        animation: `${starryBackground} 15s ease infinite`,
        zIndex: -2,
      }}
      _after={{
        content: '""',
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "radial-gradient(circle at 50% 50%, rgba(1, 4, 20, 0.5) 0%, rgba(0, 0, 0, 0.9) 100%)",
        zIndex: -1,
      }}
    >
      <ParticleCanvas />
      
      <MotionFlex 
        position="fixed"
        top={4}
        left="50%"
        transform="translateX(-50%)"
        alignItems="center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Image 
          src="/logo.svg" 
          alt="Logo"
          width="32px"
          height="32px"
          mr={2}
        />
        <Text
          fontSize="xl"
          fontWeight="bold"
          bgGradient="linear(to-r, #6366f1, #818cf8)"
          bgClip="text"
          letterSpacing="wider"
        >
          SpaceTree
        </Text>
      </MotionFlex>

      <VStack gap={8} alignItems="stretch" flex="1" position="relative" zIndex={1} mt={16}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          width="100%"
          height="100%"
          maxW="600px"
          maxH="600px"
          background="radial-gradient(circle at center, rgba(99, 102, 241, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%)"
          filter="blur(50px)"
          zIndex={-1}
        />
        
        <VStack spacing={6}>
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            animation={`${floatAnimation} 8s ease-in-out infinite`}
          >
            <Box position="relative">
              <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                width="120%"
                height="120%"
                borderRadius="full"
                background="radial-gradient(circle at center, rgba(99, 102, 241, 0.2) 0%, transparent 70%)"
                animation={`${pulseAnimation} 4s ease-in-out infinite`}
              />
              <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                width="140%"
                height="140%"
                borderRadius="full"
                border="1px solid rgba(99, 102, 241, 0.1)"
                animation={`${orbitAnimation} 8s linear infinite`}
              >
                <Box
                  position="absolute"
                  top="0"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  width="8px"
                  height="8px"
                  borderRadius="full"
                  bg="#6366f1"
                  filter="blur(2px)"
                />
              </Box>
              <Avatar
                size="2xl"
                name="Yanis Sebastian Zürcher"
                src="/avatar.png"
                border="4px solid"
                borderColor="rgba(99, 102, 241, 0.3)"
                shadow="0 0 40px rgba(99, 102, 241, 0.4)"
                _hover={{
                  borderColor: "rgba(99, 102, 241, 0.5)",
                  shadow: "0 0 60px rgba(99, 102, 241, 0.6)",
                  transform: "scale(1.02)",
                  transition: "all 0.5s ease",
                }}
              />
            </Box>
          </MotionBox>
          
          <VStack spacing={3}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <Heading 
                size="lg" 
                textAlign="center" 
                fontWeight="bold"
                bgGradient="linear(to-r, #6366f1, #818cf8)"
                bgClip="text"
                letterSpacing="wider"
              >
                Yanis Sebastian Zürcher
              </Heading>
            </MotionBox>
            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <Text 
                color="whiteAlpha.700" 
                textAlign="center"
                fontSize="lg"
                maxW="md"
                px={4}
                letterSpacing="wide"
                fontWeight="light"
              >
                Software Developer & Tech Enthusiast
              </Text>
            </MotionBox>
          </VStack>
        </VStack>

        <VStack gap={4}>
          {links.map((link, index) => (
            <MotionLink
              key={link.title}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              width="100%"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.04, 0.62, 0.23, 0.98]
              }}
              _hover={{ textDecoration: "none" }}
            >
              <Box
                p={4}
                bg="rgba(99, 102, 241, 0.03)"
                borderRadius="2xl"
                backdropFilter="blur(12px)"
                border="1px solid"
                borderColor="rgba(99, 102, 241, 0.1)"
                display="flex"
                flexDirection="column"
                gap={1}
                transition="all 0.4s ease"
                position="relative"
                overflow="hidden"
                _hover={{
                  bg: "rgba(99, 102, 241, 0.08)",
                  borderColor: "rgba(99, 102, 241, 0.2)",
                  transform: "translateY(-2px)",
                  shadow: "0 4px 20px rgba(99, 102, 241, 0.2)",
                  _before: {
                    transform: "translateX(100%)",
                  }
                }}
                _before={{
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(45deg, transparent, rgba(99, 102, 241, 0.1), transparent)",
                  transform: "translateX(-100%)",
                  transition: "transform 0.6s ease",
                }}
              >
                <Flex alignItems="center">
                  <Icon 
                    as={link.icon} 
                    mr={3} 
                    color={link.color} 
                    boxSize={6}
                    transition="all 0.3s"
                    _groupHover={{ 
                      transform: "scale(1.1)",
                      filter: "drop-shadow(0 0 8px rgba(99, 102, 241, 0.4))"
                    }}
                  />
                  <Text 
                    fontSize="lg" 
                    fontWeight="500"
                    letterSpacing="wide"
                    color="whiteAlpha.900"
                  >
                    {link.title}
                  </Text>
                </Flex>
                <Text
                  fontSize="sm"
                  color="whiteAlpha.600"
                  pl={9}
                >
                  {link.description}
                </Text>
              </Box>
            </MotionLink>
          ))}
        </VStack>
      </VStack>
      
      <Flex 
        as="footer" 
        mt={12} 
        justifyContent="center" 
        color="whiteAlpha.400"
        fontSize="sm"
        borderTop="1px solid"
        borderColor="rgba(99, 102, 241, 0.1)"
        pt={4}
        backdropFilter="blur(8px)"
      >
        <Text letterSpacing="wider">© {new Date().getFullYear()} Yanis Sebastian Zürcher. All rights reserved.</Text>
      </Flex>
    </Container>
  );
}; 