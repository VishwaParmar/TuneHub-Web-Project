import {
  Box,
  Button,
  Center,
  CircularProgress,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text
} from "@chakra-ui/react";
import React, { useState } from "react";

export default function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (password.length < 8) {
      setErrorMessage("Password should have minimum 8 characters!");
      setSuccessMessage("");
      setIsLoading(false);
      return;
    } else
      if (password !== cpassword) {
        setErrorMessage("New password and confirm password do not match.");
        setTimeout(() => { setErrorMessage(null); }, 3000);
        setSuccessMessage("");
        setIsLoading(false);
        setShowPassword(false);

      } else {
        try {
          const response = await fetch(`https://tunehub-server.onrender.com/users/changePassword/${email}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password }),
          });

          if (response.ok) {
            setSuccessMessage("Password changed successfully!");
            setTimeout(() => { setSuccessMessage(null); }, 3000);
            setErrorMessage("");
            setPassword("");
            setCPassword("");
          } else {
            setErrorMessage("Failed to change password. Please try again.");
            setTimeout(() => { setErrorMessage(null); }, 3000);
            setSuccessMessage("");
          }
        } catch (error) {
          setErrorMessage("An error occurred. Please try again later.");
          setTimeout(() => { setErrorMessage(null); }, 3000);
          setSuccessMessage("");
        }
        setIsLoading(false);
        setShowPassword(false);
      }
  };

  return (
    <Center h="100vh" bg="#000C66">
      <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
        <Heading as="h1" color="whiteAlpha.900">
          Change Password
        </Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md">
              {successMessage && (
                <Text color="green.500" textAlign="center" fontWeight="bold">
                  {successMessage}
                </Text>
              )}
              {errorMessage && (
                <Text color="red.500" textAlign="center" fontWeight="bold">
                  {errorMessage}
                </Text>
              )}
              <FormControl isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>New Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
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
                    type={showPassword ? "text" : "password"}
                    value={cpassword}
                    onChange={(event) => setCPassword(event.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                rounded="md"
                bg="#2C7A7B"
                width="full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress isIndeterminate size="24px" color="black" />
                ) : (
                  "Change Password"
                )}
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Center>
  );
}
