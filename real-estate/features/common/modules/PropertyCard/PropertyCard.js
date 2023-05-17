import { Box } from "@chakra-ui/react";
import { usePropertyFormat } from "../../Hooks/usePropertyFormat";

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

        </Box>
     );
};
 
export default PropertyCard; 