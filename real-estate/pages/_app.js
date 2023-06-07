import { ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react';
import chakraTheme from '@chakra-ui/theme';

const { Button } = chakraTheme.components

const theme = extendBaseTheme({
  components: {
    Button,
  },
})

export default function App({ Component, pageProps }) {
  return (
  <ChakraBaseProvider theme={theme}>
     <Component {...pageProps} />
  </ChakraBaseProvider>
  )
}