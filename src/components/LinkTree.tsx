import {
  VStack,
  Heading,
  Box,
  Link as ChakraLink,
  Text,
  Icon,
  Container,
  Flex,
} from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/avatar";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram, FaGlobe, FaTiktok, FaPaypal } from "react-icons/fa";
import { SiKofi } from "react-icons/si";

const MotionBox = motion(Box);
const MotionLink = motion(ChakraLink);

const links = [
  {
    title: "GitHub",
    url: "https://github.com/lyfe691",
    icon: FaGithub,
    color: "#f0f6fc",
  },
  {
    title: "LinkedIn",
    url: "https://linkedin.com/in/yanis-sebastian-zürcher",
    icon: FaLinkedin,
    color: "#0A66C2",
  },
  {
    title: "Website",
    url: "https://ysz.life",
    icon: FaGlobe,
    color: "whiteAlpha.900",
  },
  {
    title: "TikTok",
    url: "https://tiktok.com/@your-username",
    icon: FaTiktok,
    color: "#ffffff",
  },
  {
    title: "Ko-fi",
    url: "https://ko-fi.com/your-username",
    icon: SiKofi,
    color: "#FF5E5B",
  },
  {
    title: "PayPal",
    url: "https://paypal.me/your-username",
    icon: FaPaypal,
    color: "#00457C",
  },
];

export const LinkTree = () => {
  return (
    <Container py={8} minH="100vh" display="flex" flexDirection="column">
      <VStack gap={6} alignItems="stretch" flex="1">
        <VStack spacing={4}>
          <MotionBox
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          >
            <Avatar
              size="2xl"
              name="Yanis Sebastian Zürcher"
              src="/path/to/your/avatar.jpg"
              mb={4}
              border="4px solid"
              borderColor="whiteAlpha.200"
              shadow="2xl"
              _hover={{
                transform: "scale(1.05)",
                transition: "all 0.3s ease",
              }}
            />
          </MotionBox>
          <Heading 
            size="lg" 
            textAlign="center" 
            fontWeight="bold"
            color="whiteAlpha.900"
            letterSpacing="tight"
          >
            Yanis Sebastian Zürcher
          </Heading>
          <Text 
            color="whiteAlpha.600" 
            textAlign="center"
            fontSize="lg"
            maxW="md"
            px={4}
            letterSpacing="wide"
          >
            Software Developer & Tech Enthusiast
          </Text>
        </VStack>

        <VStack gap={4}>
          {links.map((link, index) => (
            <MotionLink
              key={link.title}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              width="100%"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Box
                p={4}
                bg="rgba(15, 15, 15, 0.75)"
                borderRadius="xl"
                backdropFilter="blur(12px)"
                border="1px solid"
                borderColor="whiteAlpha.100"
                display="flex"
                alignItems="center"
                transition="all 0.3s"
                _hover={{
                  transform: "translateY(-2px)",
                  bg: "rgba(25, 25, 25, 0.85)",
                  borderColor: "whiteAlpha.300",
                  shadow: "0 8px 30px rgba(0,0,0,0.4)",
                }}
              >
                <Icon 
                  as={link.icon} 
                  mr={3} 
                  color={link.color} 
                  boxSize={6}
                  opacity={0.9}
                  transition="all 0.3s"
                  _groupHover={{ 
                    transform: "scale(1.1)",
                    opacity: 1 
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
        borderColor="whiteAlpha.50"
        pt={4}
        backdropFilter="blur(8px)"
      >
        <Text letterSpacing="wider">© {new Date().getFullYear()} Yanis Sebastian Zürcher. All rights reserved.</Text>
      </Flex>
    </Container>
  );
}; 