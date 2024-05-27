import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { HomePage } from './page/home';
function App() {
  return (
    <ChakraProvider theme={theme}>
      <HomePage />
    </ChakraProvider>
  );
}

export default App;
