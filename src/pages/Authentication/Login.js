import {
  Box,
  Button,
  Center,
  Checkbox,
  CircularProgress,
  FormControl,
  FormHelperText,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
  Image,
  chakra
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaLock, FaUserAlt } from "react-icons/fa";
import { useNavigate, NavLink } from 'react-router-dom';
import ErrorMessage from '../../components/Messages/ErrorMessage';
import Logo from '../../assets/tunehub.svg';


export default function Login() {
  const navigate = useNavigate();
  const CFaUserAlt = chakra(FaUserAlt);
  const CFaLock = chakra(FaLock);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      // Fetch the latest response by using await before each API call
      const loginResponse = await fetch('https://tunehub-server.onrender.com/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await loginResponse.json();
      if (!loginResponse.ok) {
        setError(data.message || 'Something went wrong.');
      } else {
        // API call successful
        const userData = JSON.stringify(data.user);
        setCookie("id", data.user.id, 7);
        // localStorage.setItem('id',"Bearer "+ data.user.id);
        localStorage.setItem('user', userData);
        navigate('/', { state: { user: data.user } });
        window.location.reload();
      }
    } catch (error) {
      setError('Error fetching user. Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to set a cookie with a given name, value, and expiration date
  function setCookie(name, value, daysToExpire) {
    const date = new Date();
    date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
  }

  // Example usage
  // Save the username for 7 days


  const handleClick = (e) => {
    e.preventDefault();
    navigate('/user/register');
  };
  const handlePassClick = (e) => {
    e.preventDefault();
    navigate('/user/change-password');
  };

  return (
    <Center h="100vh" bg="#000C66">
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <NavLink to="/">
          <Image src={Logo} alt="TuneHub" width="128px" mb="128px" />
        </NavLink>
        <Heading as="h1" color="whiteAlpha.900">Login</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              {error && <ErrorMessage message={error} />}
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="black" />}
                  />
                  <Input
                    type="email"
                    placeholder="email address"
                    onChange={event => setEmail(event.currentTarget.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="black" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={event => setPassword(event.currentTarget.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Button variant="link" onClick={handlePassClick}>Forgot password?</Button>
                </FormHelperText>
              </FormControl>
              <FormControl>
                <Checkbox borderColor="black">Remember Me</Checkbox>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                rounded="md"
                bg="#2C7A7B"
                width="full"
              >
                {isLoading ? (
                  <CircularProgress isIndeterminate size="24px" color="black" />
                ) : (
                  'Sign In'
                )}
              </Button>
            </Stack>
          </form>
        </Box>
        <Text as="div" textAlign="center" textColor="whiteAlpha.900">
          <span fontColour="whiteAlpha.900">Don't have an account? </span>
          <Button variant="link" onClick={handleClick}>Register</Button>
        </Text>
      </Stack>
    </Center>
  )
}
