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
  useBreakpointValue,
  useMediaQuery,
} from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/avatar";
import { motion } from "framer-motion";

import { FaGithub, FaLinkedin, FaGlobe, FaPaypal } from "react-icons/fa";


import { SiKofi } from "react-icons/si";
import { useEffect, useRef } from "react";

const MotionBox = motion(Box);
const MotionLink = motion(ChakraLink);
// const MotionFlex = motion(Flex);

const floatAnimation = keyframes`
  0% { transform: translateY(0px) rotate(0deg) scale(1); }
  50% { transform: translateY(-8px) rotate(-1deg) scale(1.01); }
  100% { transform: translateY(0px) rotate(0deg) scale(1); }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.05); opacity: 0.5; }
  100% { transform: scale(1); opacity: 0.3; }
`;

 //const starryBackground = keyframes`
  //0% { transform: scale(1) rotate(0deg); }
  //50% { transform: scale(1.2) rotate(180deg); }
  //100% { transform: scale(1) rotate(360deg); }
//`;

const cosmicGlow = keyframes`
  0% { opacity: 0.3; filter: blur(8px); }
  50% { opacity: 0.6; filter: blur(12px); }
  100% { opacity: 0.3; filter: blur(8px); }
`;

const orbitAnimation = keyframes`
  0% { transform: rotate(0deg) translateX(8px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(8px) rotate(-360deg); }
`;

const starField = keyframes`
  0% { transform: translate(0, 0); }
  100% { transform: translate(-50%, -50%); }
`;

const deepSpace = keyframes`
  0% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.05); opacity: 0.4; }
  100% { transform: scale(1); opacity: 0.3; }
`;

const links = [
  {
    title: "GitHub",
    url: "https://github.com/lyfe691",
    icon: FaGithub,
    color: "#f0f6fc",
    description: "Check out my code repositories",
    category: "social",
  },
  {
    title: "LinkedIn",
    url: "https://linkedin.com/in/yanis-sebastian-zürcher",
    icon: FaLinkedin,
    color: "#0A66C2",
    description: "Connect with me professionally",
    category: "social",
  },
  {
    title: "Website",
    url: "https://ysz.life",
    icon: FaGlobe,
    color: "whiteAlpha.900",
    description: "Visit my personal website",
    category: "personal",
  },
  {
    title: "Ko-fi",
    url: "https://ko-fi.com/yanissebastianzuercher",
    icon: SiKofi,
    color: "#FF5E5B",
    description: "Support my work",
    category: "support",
  },
  {
    title: "PayPal",
    url: "https://paypal.me/lyfe691",
    icon: FaPaypal,
    color: "#00457C",
    description: "Send me a tip",
    category: "support",
  },
];

const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile] = useMediaQuery("(max-width: 480px)");
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    updateCanvasSize();
    
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      pulse: number;
      color: string;
    }> = [];

    const colors = ['#6366f1', '#818cf8', '#c4b5fd', '#ffffff'];
    const particleCount = isMobile ? 30 : 60;

    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.1,
      speedY: (Math.random() - 0.5) * 0.1,
      opacity: Math.random() * 0.2 + 0.1,
      pulse: Math.random() * Math.PI,
      color: colors[Math.floor(Math.random() * colors.length)],
    });

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.pulse += 0.01;
        particle.opacity = 0.1 + Math.sin(particle.pulse) * 0.2;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace('1)', `${particle.opacity})`);
        
        // Softer glow effect
        ctx.shadowBlur = 8;
        ctx.shadowColor = particle.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      updateCanvasSize();
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isMobile]);

  return (
    <Box
      as="canvas"
      ref={canvasRef}
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      zIndex={0}
      pointerEvents="none"
      sx={{
        mixBlendMode: "screen",
      }}
    />
  );
};

export const LinkTree = () => {
  const [isMobile] = useMediaQuery("(max-width: 480px)");
   //const particleCount = useBreakpointValue({ base: 50, md: 100 });
  const avatarSize = useBreakpointValue({ base: "xl", md: "2xl" });
  const headingSize = useBreakpointValue({ base: "md", md: "lg" });
  const linkSpacing = useBreakpointValue({ base: 3, md: 4 });
  const containerPadding = useBreakpointValue({ base: 4, md: 8 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 1.5,
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.04, 0.62, 0.23, 0.98]
      }
    }
  };

  return (
    <Container 
      py={containerPadding}
      px={containerPadding}
      minH="100vh" 
      maxW={{ base: "100%", md: "container.sm" }}
      display="flex" 
      flexDirection="column"
      position="relative"
      overflow="hidden"
      sx={{
        "&:before, &:after": {
          content: '""',
          position: "fixed",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
          backgroundImage: "radial-gradient(2px 2px at 40px 60px, #ffffff 0%, rgba(0,0,0,0) 100%), radial-gradient(2px 2px at 20px 50px, #818cf8 0%, rgba(0,0,0,0) 100%), radial-gradient(2px 2px at 30px 100px, #6366f1 0%, rgba(0,0,0,0) 100%), radial-gradient(2px 2px at 40px 60px, #c4b5fd 0%, rgba(0,0,0,0) 100%), radial-gradient(2px 2px at 110px 90px, #ffffff 0%, rgba(0,0,0,0) 100%), radial-gradient(2px 2px at 190px 150px, #818cf8 0%, rgba(0,0,0,0) 100%)",
          backgroundColor: "transparent",
          animation: `${starField} 120s linear infinite`,
          zIndex: -3,
        },
        "&:after": {
          backgroundImage: "radial-gradient(2px 2px at 150px 120px, #ffffff 0%, rgba(0,0,0,0) 100%), radial-gradient(2px 2px at 70px 90px, #818cf8 0%, rgba(0,0,0,0) 100%), radial-gradient(2px 2px at 110px 130px, #6366f1 0%, rgba(0,0,0,0) 100%), radial-gradient(2px 2px at 180px 60px, #c4b5fd 0%, rgba(0,0,0,0) 100%), radial-gradient(2px 2px at 20px 50px, #ffffff 0%, rgba(0,0,0,0) 100%), radial-gradient(2px 2px at 150px 180px, #818cf8 0%, rgba(0,0,0,0) 100%)",
          animationDirection: "reverse",
          opacity: 0.3,
        }
      }}
    >
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        background="linear-gradient(to bottom, #000000 0%, #020510 50%, #000000 100%)"
        zIndex={-4}
      />
      
      <Box
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="200vmax"
        height="200vmax"
        background="radial-gradient(circle at center, rgba(99, 102, 241, 0.02) 0%, rgba(0, 0, 0, 0) 60%)"
        animation={`${deepSpace} 20s ease-in-out infinite`}
        zIndex={-2}
        pointerEvents="none"
        opacity={0.4}
      />

      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        backdropFilter="blur(80px)"
        zIndex={-1}
      />

      <ParticleCanvas />
      
      <MotionBox
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{ width: "100%" }}
      >
        <VStack gap={linkSpacing} alignItems="stretch" flex="1" position="relative" zIndex={1}>
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            width="100%"
            height="100%"
            maxW="600px"
            maxH="600px"
            background="radial-gradient(circle at center, rgba(99, 102, 241, 0.15) 0%, transparent 70%)"
            filter="blur(40px)"
            animation={`${cosmicGlow} 8s ease-in-out infinite`}
            zIndex={-1}
          />
          
          <VStack spacing={isMobile ? 4 : 6}>
            <MotionBox
              variants={itemVariants}
              animation={`${floatAnimation} 12s ease-in-out infinite`}
            >
              <Box position="relative">
                <Box
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  width={isMobile ? "130%" : "150%"}
                  height={isMobile ? "130%" : "150%"}
                  borderRadius="full"
                  background="radial-gradient(circle at center, rgba(99, 102, 241, 0.3) 0%, transparent 70%)"
                  animation={`${pulseAnimation} 4s ease-in-out infinite`}
                />
                {!isMobile && (
                  <>
                    <Box
                      position="absolute"
                      top="50%"
                      left="50%"
                      transform="translate(-50%, -50%)"
                      width="180%"
                      height="180%"
                      borderRadius="full"
                      border="1px solid rgba(99, 102, 241, 0.1)"
                      animation={`${orbitAnimation} 12s linear infinite`}
                    >
                      <Box
                        position="absolute"
                        top="0"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        width="10px"
                        height="10px"
                        borderRadius="full"
                        background="linear-gradient(45deg, #6366f1, #818cf8)"
                        filter="blur(2px)"
                        boxShadow="0 0 20px #6366f1"
                      />
                    </Box>
                    <Box
                      position="absolute"
                      top="50%"
                      left="50%"
                      transform="translate(-50%, -50%) rotate(90deg)"
                      width="160%"
                      height="160%"
                      borderRadius="full"
                      border="1px solid rgba(99, 102, 241, 0.05)"
                      animation={`${orbitAnimation} 8s linear infinite reverse`}
                    >
                      <Box
                        position="absolute"
                        top="0"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        width="8px"
                        height="8px"
                        borderRadius="full"
                        background="linear-gradient(45deg, #818cf8, #c4b5fd)"
                        filter="blur(2px)"
                        boxShadow="0 0 15px #818cf8"
                      />
                    </Box>
                  </>
                )}
                <Avatar
                  size={avatarSize}
                  name="Yanis Sebastian Zürcher"
                  src="/avatar.png"
                  border="4px solid"
                  borderColor="rgba(99, 102, 241, 0.3)"
                  shadow="0 0 40px rgba(99, 102, 241, 0.4)"
                  _hover={{
                    borderColor: "rgba(99, 102, 241, 0.5)",
                    shadow: "0 0 60px rgba(99, 102, 241, 0.6)",
                    transform: "scale(1.05)",
                    transition: "all 0.5s ease",
                  }}
                />
              </Box>
            </MotionBox>
            
            <MotionBox variants={itemVariants}>
              <Heading 
                size={headingSize}
                textAlign="center" 
                fontWeight="bold"
                bgGradient="linear(to-r, #6366f1, #818cf8, #c4b5fd)"
                bgClip="text"
                letterSpacing="wider"
                px={2}
              >
                Yanis Sebastian Zürcher
              </Heading>
            </MotionBox>
            
            <MotionBox variants={itemVariants}>
              <Text 
                color="whiteAlpha.700" 
                textAlign="center"
                fontSize={{ base: "md", md: "lg" }}
                maxW="md"
                px={4}
                letterSpacing="wide"
                fontWeight="light"
              >
                Software Developer & Tech Enthusiast
              </Text>
            </MotionBox>
          </VStack>

          <VStack gap={linkSpacing}>
            {links.map((link, index) => (
              <MotionLink
                key={link.title}
                variants={itemVariants}
                custom={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                width="100%"
                _hover={{ textDecoration: "none" }}
              >
                <Box
                  p={isMobile ? 3 : 4}
                  bg="rgba(99, 102, 241, 0.03)"
                  borderRadius={isMobile ? "xl" : "2xl"}
                  backdropFilter="blur(12px)"
                  border="1px solid"
                  borderColor="rgba(99, 102, 241, 0.1)"
                  display="flex"
                  flexDirection={isMobile ? "row" : "column"}
                  alignItems={isMobile ? "center" : "flex-start"}
                  gap={1}
                  transition="all 0.6s cubic-bezier(0.19, 1, 0.22, 1)"
                  position="relative"
                  overflow="hidden"
                  _hover={{
                    bg: "rgba(99, 102, 241, 0.06)",
                    borderColor: "rgba(99, 102, 241, 0.15)",
                    transform: isMobile ? "scale(0.99)" : "translateY(-1px)",
                    shadow: "0 4px 15px rgba(99, 102, 241, 0.15)",
                    _before: {
                      transform: "translateX(100%)",
                    }
                  }}
                  _active={{
                    transform: isMobile ? "scale(0.95)" : "translateY(-1px)",
                  }}
                  _before={{
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(45deg, transparent, rgba(99, 102, 241, 0.2), transparent)",
                    transform: "translateX(-100%)",
                    transition: "transform 1s cubic-bezier(0.19, 1, 0.22, 1)",
                  }}
                >
                  <Flex 
                    alignItems="center" 
                    width="100%"
                    justifyContent={isMobile ? "flex-start" : "flex-start"}
                  >
                    <Icon 
                      as={link.icon} 
                      mr={3} 
                      color={link.color} 
                      boxSize={isMobile ? 5 : 6}
                      transition="all 0.5s"
                      _groupHover={{ 
                        transform: "scale(1.05)",
                        filter: "drop-shadow(0 0 8px rgba(99, 102, 241, 0.4))"
                      }}
                    />
                    <Box>
                      <Text 
                        fontSize={isMobile ? "md" : "lg"}
                        fontWeight="500"
                        letterSpacing="wide"
                        color="whiteAlpha.900"
                      >
                        {link.title}
                      </Text>
                      {!isMobile && (
                        <Text
                          fontSize="sm"
                          color="whiteAlpha.600"
                        >
                          {link.description}
                        </Text>
                      )}
                    </Box>
                  </Flex>
                </Box>
              </MotionLink>
            ))}
          </VStack>
        </VStack>
      </MotionBox>
      
      <MotionBox
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.5 }}
      >
        <Flex 
          as="footer" 
          mt={8}
          justifyContent="center" 
          color="whiteAlpha.400"
          fontSize="sm"
          borderTop="1px solid"
          borderColor="rgba(99, 102, 241, 0.1)"
          pt={4}
          backdropFilter="blur(8px)"
          textAlign="center"
          px={2}
        >
          <Text letterSpacing="wider">© {new Date().getFullYear()} Yanis Sebastian Zürcher. All rights reserved.</Text>
        </Flex>
      </MotionBox>
    </Container>
  );
}; 