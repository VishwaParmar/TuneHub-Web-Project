// Author: Kainat Khan
// Date: July 24, 2023
import {
  Button,
  Center,
  CircularProgress,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import ErrorMessage from '../../components/Messages/ErrorMessage';

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);
  const handleShowCClick = () => setShowCPassword(!showCPassword);

  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate('/user/login');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (password === cpassword) {
      if (password.length >= 8) {
        try {
          const response = await fetch('https://tunehub-server.onrender.com/users/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: uuidv4(),
              firstName: firstname,
              lastName: lastname,
              email: email,
              password: password,
              userRole: "Member"
            }),
          });

          const responseData = await response.json();

          if (response.ok) {
            const user = responseData.user;
            setIsLoading(false);
            setShowPassword(false);
            // ssetCookie("id", data?.user.id, 7);
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/');
          } else {
            setError('Failed to register. Please try again.');
            setIsLoading(false);
            setShowPassword(false);
          }
        } catch (error) {
          console.error('Error while registering:', error);
          setError('An error occurred. Please try again later.');
          setIsLoading(false);
          setShowPassword(false);
        }
      } else {
        setError('Password should have minimum 8 characters!');
        setIsLoading(false);
        setShowPassword(false);
      }
    } else {
      setError('Password and Confirm password do not match!');
      setIsLoading(false);
      setShowPassword(false);
    }
  };

  // function setCookie(name, value, daysToExpire) {
  //   const date = new Date();
  //   date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
  //   const expires = `expires=${date.toUTCString()}`;
  //   document.cookie = `${name}=${value};${expires};path=/`;
  // }

  return (
    <Center h="100vh" bg="#000C66">
      <Flex
        direction="column"
        align="center"
        justify="center"
        bg="whiteAlpha.900"
        boxShadow="md"
        p={{ base: "1rem", md: "2rem" }}
        minW={{ base: "100%", md: "468px" }}
      >
        <Heading as="h1" color="#2C7A7B" mb="2rem">Register</Heading>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          {error && <ErrorMessage message={error} />}
          <FormControl isRequired>
            <FormLabel>First Name</FormLabel>
            <Input
              type="text"
              value={firstname}
              onChange={event => setFirstName(event.target.value.replace(/[^a-z]/gi, ''))}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Last Name</FormLabel>
            <Input
              type="text"
              value={lastname}
              onChange={event => setLastName(event.target.value.replace(/[^a-z]/gi, ''))}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={event => setEmail(event.currentTarget.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={event => setPassword(event.currentTarget.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
              <Input
                type={showCPassword ? "text" : "password"}
                onChange={event => setCPassword(event.currentTarget.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleShowCClick}>
                  {showCPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button
            mt="1rem"
            borderRadius={0}
            type="submit"
            variant="solid"
            rounded="md"
            bg="#2C7A7B"
            width="full"
            textColor="white"
          >
            {isLoading ? (
              <CircularProgress isIndeterminate size="24px" color="white" />
            ) : (
              'Register'
            )}
          </Button>
        </form>
        <Text mt="1rem" textColor="black">
          <span fontColour="white">Already have an account? </span>
          <Button variant="link" onClick={handleLoginClick}>Sign In</Button>
        </Text>
      </Flex>
    </Center>
  )
}
