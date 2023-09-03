// Author: Kainat Khan
// Date: July 24, 2023
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text
} from "@chakra-ui/react";

export default function CustomerProfile() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const location = useLocation();
  const user = location.state?.user;

  const userFromState = location.state?.user;
  const [userFromLocalStorage, setUserFromLocalStorage] = useState(null);

  /*useEffect(() => {
    if (user) {
      // Set the initial state with the user data from the location state
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setDateOfBirth(user.dateOfBirth);
    }
  }, [user]);*/

  useEffect(() => {
    // Retrieve user data from local storage
    const userJSON = localStorage.getItem("user");
    if (userJSON) {
      const userFromLocalStorage = JSON.parse(userJSON);
      setUserFromLocalStorage(userFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    // If user data is available from state, use it
    if (userFromState) {
      setFirstName(userFromState.firstName);
      setLastName(userFromState.lastName);
      setEmail(userFromState.email);
      setDateOfBirth(userFromState.dateOfBirth);

    } else if (userFromLocalStorage) {
      // If user data is available from local storage, use it
      setFirstName(userFromLocalStorage.firstName);
      setLastName(userFromLocalStorage.lastName);
      setEmail(userFromLocalStorage.email);
      setDateOfBirth(userFromLocalStorage.dateOfBirth);
    }
  }, [userFromState, userFromLocalStorage]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {

    const updatedUser = {
      firstName,
      lastName,
      dateOfBirth,
    };

    try {
      // Make the API call to update the user data
      const response = await fetch(`https://tunehub-server.onrender.com/users/edit/${userFromLocalStorage.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        // If the API call is successful, update the user in the state
        setSuccessMessage("User data updated successfully!");
        setErrorMessage("");
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
        await response.json();
        window.location.reload();
        setIsEditing(false);
      } else {
        setSuccessMessage("");
        setErrorMessage("Failed to update user data");
        /*setTimeout(() => {
          setErrorMessage(null);
        }, 5000);*/
        setIsEditing(true);
      }
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage(`Something went wrong: ${error}`);
      /*setTimeout(() => {
        setErrorMessage(null);
      }, 5000);*/
      setIsEditing(true);
    }

  };

  const handleCancelClick = () => {
    // Revert changes if any
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setDateOfBirth(user.dateOfBirth);
    setIsEditing(false);
  };

  const handleDeleteClick = async () => {
    try {
      const response = await fetch(`https://tunehub-server.onrender.com/users/delete/${user.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // If the API call is successful, remove the user from local storage and navigate back to the homepage
        localStorage.removeItem("user");
        navigate('/');
      } else {
        setErrorMessage("Failed to delete user");
      }
    } catch (error) {
      setErrorMessage(`Something went wrong: ${error}`);
    }
  };
  return (
    <Center h="100vh" bg="#000C66">
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Heading as="h1" fontSize="4xl" color="whiteAlpha.900" fontWeight="medium" mt="16px">
          User Profile
        </Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form >
            <Stack spacing={4} p="1rem" backgroundColor="#050A30" borderRadius="10px" boxShadow="md" >

              {successMessage && (
                <Text color="green.500" textAlign="center">
                  {successMessage}
                </Text>
              )}
              {errorMessage && (
                <Text color="red.500" textAlign="center">
                  {errorMessage}
                </Text>
              )}
              <FormControl>
                <FormLabel textColor="white" >First Name</FormLabel>
                <Input
                  type="text"
                  value={firstName}
                  readOnly={!isEditing}
                  onChange={(e) => setFirstName(e.target.value)}
                  /* placeholder="John"*/
                  borderColor="white"
                  focusBorderColor="teal"
                  textColor="white"
                />
              </FormControl>
              <FormControl>
                <FormLabel textColor="white">Last Name</FormLabel>
                <Input
                  type="text"
                  value={lastName}
                  readOnly={!isEditing}
                  onChange={(e) => setLastName(e.target.value)}
                  /* placeholder="Doe"*/
                  borderColor="white"
                  focusBorderColor="teal"
                  textColor="white"
                />
              </FormControl>
              <FormControl>
                <FormLabel textColor="white" >Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  readOnly={true}
                  onChange={(e) => setEmail(e.target.value)}
                  /*placeholder="johndoe@email.com"*/
                  borderColor="white"
                  bg="grey"
                  focusBorderColor="teal"
                  textColor="white"
                />
              </FormControl>
              <FormControl>
                <FormLabel textColor="white">Date of Birth</FormLabel>
                <Input
                  type="text"
                  value={dateOfBirth}
                  readOnly={!isEditing}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  /* placeholder="1900-01-01"*/
                  borderColor="white"
                  focusBorderColor="teal"
                  textColor="white"
                />
              </FormControl>
              {isEditing ? (
                <Stack direction="row" spacing={5} justify="center">
                  <Button variant="solid" colorScheme="teal" onClick={handleSaveClick}>
                    Save
                  </Button>
                  <Button variant="outline" colorScheme="teal" onClick={handleCancelClick}>
                    Cancel
                  </Button>
                  <Button variant="solid" colorScheme="red" onClick={handleDeleteClick}>
                    Delete
                  </Button>
                </Stack>
              ) : (
                <Button variant="solid" colorScheme="teal" onClick={handleEditClick}>
                  Edit
                </Button>
              )}
            </Stack>
          </form>
        </Box>
      </Stack>
    </Center>
  );
}
