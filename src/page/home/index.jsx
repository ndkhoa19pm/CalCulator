import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  useToast,
  VStack,
} from '@chakra-ui/react';
import * as ci from 'react-icons/ci';
import {
  evaluate,
  sqrt,
  pow,
  log,
  sin,
  cos,
  tan,
  exp,
  pi,
  log10,
} from 'mathjs';

export function HomePage() {
  const [type, setType] = React.useState('number');
  const [acorce, setAcOrCe] = React.useState('CE');
  const toast = useToast();
  const [input, setInput] = React.useState('');

  const handleFunction = label => {
    switch (label) {
      case 'exp':
        label = 'E';
        break;
      case '√':
        label = '√(';
        break;
      case 'sin':
        label = 'sin(';
        break;
      case 'cos':
        label = 'cos(';
        break;
      case 'tan':
        label = 'tan(';
        break;
      case 'log':
        label = 'log(';
        break;
      default:
        break;
    }
    setInput(input + label);
  };

  const handleClick = value => {
    if (value === '%') {
      handlePercentage();
    } else {
      setInput(input + value);
    }
  };
  const handlePercentage = () => {
    try {
      const result = eval(input) / 100;
      setInput(result.toString());
    } catch (error) {
      toast({
        position: 'top',
        title: 'Không hợp lệ',
        description: 'Hoàn thành câu lệnh dùm cái :)).',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };
  const handleClear = () => {
    setInput('');
    setAcOrCe('CE');
  };

  const handleEqual = () => {
    try {
      let modifiedInput = input;
      if (input.includes('π')) {
        modifiedInput = input.replace(/π/g, 'pi');
      }
      if (input.includes('√')) {
        modifiedInput = modifiedInput.replace(/√/g, 'sqrt');
      }
      let result = evaluate(modifiedInput);
      result = parseFloat(result.toFixed(11));
      setInput(result.toString());
      setAcOrCe('AC');
    } catch (error) {
      toast({
        position: 'top',
        title: 'Không hợp lệ',
        description: 'Hoàn thành câu lệnh dùm cái :)).',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return;
    }
  };
  const handleBackspace = () => {
    if (acorce === 'CE') {
      setInput(input.slice(0, -1));
    } else {
      setInput('');
      setAcOrCe('CE');
    }
  };
  return (
    <Box textAlign="center" fontSize="xl">
      <Grid
        minH="100vh"
        p={3}
        templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
        gap={4}
      >
        <GridItem bg="red" display={{ base: 'none', md: 'block' }}></GridItem>
        <GridItem m={6} boxShadow="xs" rounded="md" bg="#324cbb">
          <VStack minH="20vh" spacing={4} p={4}>
            <Box
              color="white"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <FormLabel mr={2}>KHOA NGUYỄN Calculator</FormLabel>
              <ci.CiCalculator2 fontSize={30} />
            </Box>
            <FormControl>
              <Input
                placeholder="Nhập dữ liệu"
                value={input}
                isReadOnly
                bg="white"
                color="black"
                mb={4}
              />
            </FormControl>
            {type === 'number' ? (
              <Grid templateColumns="repeat(4, 1fr)" gap={2}>
                {[acorce, 'Calculator', '='].map((value, idx) => {
                  if (value === 'CE' || value === 'AC') {
                    return (
                      <Button
                        key={idx}
                        onClick={handleBackspace}
                        colorScheme="blue"
                      >
                        {value}
                      </Button>
                    );
                  } else if (value === '=') {
                    return (
                      <Button
                        gridColumn="span 2"
                        key={idx}
                        onClick={handleEqual}
                        colorScheme="blue"
                      >
                        {value}
                      </Button>
                    );
                  } else if (value === 'Calculator') {
                    return (
                      <Button
                        key={idx}
                        onClick={() => setType('maths')}
                        colorScheme="blue"
                      >
                        <ci.CiCalculator2 />
                      </Button>
                    );
                  }
                })}
                {['7', '8', '9', '/'].map(value => (
                  <Button
                    key={value}
                    onClick={() => handleClick(value)}
                    colorScheme="blue"
                  >
                    {value}
                  </Button>
                ))}
                {['4', '5', '6', '*'].map(value => (
                  <Button
                    key={value}
                    onClick={() => handleClick(value)}
                    colorScheme="blue"
                  >
                    {value}
                  </Button>
                ))}
                {['1', '2', '3', '-'].map(value => (
                  <Button
                    key={value}
                    onClick={() => handleClick(value)}
                    colorScheme="blue"
                  >
                    {value}
                  </Button>
                ))}
                {['0', '.', '%', '+'].map(value => (
                  <Button
                    key={value}
                    onClick={() => handleFunction(value)}
                    colorScheme={value === '=' ? 'green' : 'blue'}
                  >
                    {value}
                  </Button>
                ))}
                <Button
                  gridColumn="span 4"
                  onClick={handleClear}
                  colorScheme="red"
                >
                  Xoá
                </Button>
              </Grid>
            ) : (
              <Grid templateColumns="repeat(4, 1fr)" gap={2}>
                {[acorce, 'Calculator', '(', ')'].map((value, idx) => {
                  if (value === 'Calculator') {
                    return (
                      <Button
                        key={idx}
                        onClick={() => setType('number')}
                        colorScheme="blue"
                        isActive
                      >
                        <ci.CiCalculator2 />
                      </Button>
                    );
                  } else if (value === 'CE' || value === 'AC') {
                    return (
                      <Button
                        key={idx}
                        onClick={handleBackspace}
                        colorScheme="blue"
                      >
                        {value}
                      </Button>
                    );
                  } else {
                    return (
                      <Button
                        key={idx}
                        onClick={() => handleClick(value)}
                        colorScheme="blue"
                      >
                        {value}
                      </Button>
                    );
                  }
                })}
                {[
                  { label: 'exp', func: exp },
                  {
                    label: '!',
                    func: n => {
                      if (n < 0) return 'undefined';
                      let f = 1;
                      for (let i = 2; i <= n; i++) f *= i;
                      return f;
                    },
                  },
                  { label: 'π', func: () => pi },
                  { label: '√', func: sqrt },
                  { label: 'sin', func: sin },
                  { label: 'cos', func: cos },
                  { label: 'tan', func: tan },
                  { label: 'log', func: log10 },
                ].map(({ label, func }, idx) => (
                  <Button
                    key={idx}
                    onClick={() => handleFunction(label, func)}
                    colorScheme="blue"
                  >
                    {label}
                  </Button>
                ))}
              </Grid>
            )}
          </VStack>
        </GridItem>
        <GridItem bg="green" display={{ base: 'none', md: 'block' }}></GridItem>
      </Grid>
    </Box>
  );
}
