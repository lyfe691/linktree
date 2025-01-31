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
import { FaGithub, FaLinkedin, FaInstagram, FaGlobe } from "react-icons/fa";

const MotionBox = motion(Box);
const MotionLink = motion(ChakraLink);

const links = [
  {
    title: "GitHub",
    url: "https://github.com/lyfe691",
    icon: FaGithub,
    color: "gray.200",
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
    color: "#E1306C",
  },
];

export const LinkTree = () => {
  return (
    <Container maxW="container.sm" py={8} minH="100vh" display="flex" flexDirection="column">
      <VStack gap={6} alignItems="stretch" flex="1">
        <VStack spacing={4}>
          <MotionBox
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Avatar
              size="2xl"
              name="Yanis Sebastian Zürcher"
              src="/path/to/your/avatar.jpg"
              mb={4}
              border="4px solid"
              borderColor="whiteAlpha.400"
              shadow="xl"
            />
          </MotionBox>
          <Heading size="lg" textAlign="center" fontWeight="bold">
            Yanis Sebastian Zürcher
          </Heading>
          <Text 
            color="whiteAlpha.800" 
            textAlign="center"
            fontSize="lg"
            maxW="md"
            px={4}
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
            >
              <Box
                p={4}
                bg="rgba(255, 255, 255, 0.05)"
                borderRadius="xl"
                backdropFilter="blur(10px)"
                border="1px solid"
                borderColor="whiteAlpha.200"
                display="flex"
                alignItems="center"
                transition="all 0.3s"
                _hover={{
                  transform: "translateY(-2px)",
                  bg: "rgba(255, 255, 255, 0.1)",
                  borderColor: "whiteAlpha.400",
                  shadow: "lg",
                }}
              >
                <Icon as={link.icon} mr={3} color={link.color} boxSize={6} />
                <Text fontSize="lg" fontWeight="500">{link.title}</Text>
              </Box>
            </MotionLink>
          ))}
        </VStack>
      </VStack>
      
      <Flex 
        as="footer" 
        mt={12} 
        justifyContent="center" 
        color="whiteAlpha.600"
        fontSize="sm"
        borderTop="1px solid"
        borderColor="whiteAlpha.100"
        pt={4}
      >
        <Text>© {new Date().getFullYear()} Yanis Sebastian Zürcher. All rights reserved.</Text>
      </Flex>
    </Container>
  );
}; 