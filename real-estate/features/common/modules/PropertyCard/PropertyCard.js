import { Badge, Box, Flex, HStack, Text, Link } from "@chakra-ui/react";
import { usePropertyFormat } from "../../Hooks/usePropertyFormat";
import {TbBed, TbBath, TbRuler} from "react-icons/tb";

const PropertyCard = (property) => {
    //Here we are going to receive property and then going to take our custom hook(usePropertyFormat)and then extract all our items from this custom hook
    const {
        address,
        coverPhoto,
        propertyType,
        price,
        title,
        rooms,
        baths,
        purpose,
        sqSize,
        externalID
    } = usePropertyFormat(property);

    return (
        <Box marginBottom='4rem' backgroundColor='#fff'>
            <Link href={`/properties/$(externalID)`}>
            <Box 
                backgroundImage={`url("${coverPhoto}")`} 
                height="250px" 
                backgroundPosition="center center" 
                backgroundSize="cover" 
                position='relative' //because we are going to hover some text over it
                display="flex" 
                flexDirection="column"
                justifyContent='space-between'
            >
                <Box margin='1rem'>
                    <Badge colorScheme="green">
                        {purpose}
                    </Badge>
                </Box>
                <Box height="50%" 
                bgGradient="linear(to-t, #0a0b1cd9, #ffffff00 100%)"
                display="flex"
                alignItems="flex-end"
                padding="1rem"
                >
                    <Text fontSize="3xl" fontWeight="medium" color='whiteAlpha.800'>{price}</Text>
                </Box>
            </Box>
            <Box padding='1.5rem'>
                <Text fontSize='xl' fontWeight="medium" marginBottom="1rem">
                    {propertyType}
                </Text>
                <Text fontWeight="light" fontSize="md" isTruncated>
                    {address}
                </Text>
                <Text isTruncated>
                    {title}
                </Text>
                <HStack spacing="1.3rem" marginTop="1rem">
                    <Flex alignItems="center" gap="0.3rem">
                        <TbBed />
                        {rooms}
                    </Flex>
                    <Flex alignItems="center" gap="0.3rem">
                        <TbBath />
                        {baths}
                    </Flex>
                    <Flex alignItems="center" gap="0.3rem">
                        <TbRuler />
                        {sqSize}
                        <sup>m2</sup>
                    </Flex>
                </HStack>
            </Box>
            </Link>
        </Box>
    );
};

export default PropertyCard; 