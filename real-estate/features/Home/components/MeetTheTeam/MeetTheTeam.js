import { Box, Text, Flex } from "@chakra-ui/react";
import { agents } from "./agentConts";

const MeetTheTeam = () => {
    return (
        <Box maxWidth="1280px" margin="0 auto" paddingY={{ base: '3rem', sm: '6rem' }}>
            <Text fontSize={{ base: '4xl', sm: "5xl" }} lineHeight="shorter" fontWeight='light' paddingY="2rem" textAlign="center">
                Meet The Team
            </Text>
            <Text fontSize='2xl' fontWeight="light" marginTop="1rem" marginBottom="3rem" paddingX="2rem" textAlign="center">
                The best in the industry, at your service
            </Text>
            <Flex direction={{base: 'column', sm: 'row'}} justifyContent="center" gap="1.5rem">
              {agents.map(() => {
                <>
                TEST
                </>
              })}
            </Flex>
        </Box>
    );
}

export default MeetTheTeam;
