import { Box, Text } from "@chakra-ui/react";

const FeaturedProperties = ({ featuredProperties }) => {
    return (
        <Box backgroundColor="blue.50">
            <Box maxWidth="1280px" margin="0 auto" color='gray.600' paddingY={{ base: '3rem', sm: '6rem' }}>
                <Text fontSize={{ base: '4xl', sm: "5xl" }} lineHeight='shorter' fontWeight="light" paddingX="2rem" textAlign="center">
                    Discover Our Featured Properties
                </Text>
                <Text fontSize='2xl' fontWeight="light" marginTop="1rem" marginBotom="3rem" paddingX="2rem" textAlign='center'>A selection of our best properties</Text> 
            </Box>
        </Box>
    );
}

export default FeaturedProperties;