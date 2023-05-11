import { ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react';
import chakraTheme from '@chakra-ui/theme';

export default function App({ Component, pageProps }) {
  return (
  <ChakraBaseProvider>
     <Component {...pageProps} />
  </ChakraBaseProvider>
  )
}
