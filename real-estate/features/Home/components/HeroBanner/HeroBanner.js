import { Box, Text } from "@chakra-ui/react";

const HeroBanner = () => {
  return (
    <Box
      position="relative"
      minHeight={{ base: "110vh", sm: "60vh" }}
      bg={`url('./hero/herobg.jpg')`}
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundAttachment="fixed"
    >
      <Box
        position="absolute"
        height="100%"
        opacity="0.85"
        backgroundColor="blue.900"
      />
      <Box
        display="flex"
        flexDirection={{ base: "column", sm: "row" }}
        alignItems="center"
        justifyContent={{ base: "flex-start", sm: "space-between" }}
        maxWidth="1280px"
        position="absolute"
        color="white"
        fontWeight="light"
        left="0"
        right="0"
        bottom="0"
        top="0"
        margin="0 auto"
        padding="2rem"
      >
        <Box width={{ base: "100%", sm: "50%" }}>
          <Text
            fontSize={{ base: "4xl", sm: "5xl" }}
            lineHeight="shorter"
            marginBottom="1.5rem"
          >
            Download Our New <strong>Property Guide</strong>
          </Text>
        </Box>
        <Box></Box>
      </Box>
    </Box>
  );
};

export default HeroBanner;
