import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Button,
    Center,
    CloseButton,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Input,
    Text,
    VStack,
    useToast,
  } from '@chakra-ui/react';
  import React, { useState } from 'react';
  import { addArtist } from '../../services/AdminServices/AdminServices';
  
  function AddArtistForm(props) {
    // State variables for form validation and data
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [Form, setForm] = useState();
    const [genres, setGenres] = useState([]);
    const [genreInput, setGenreInput] = useState('');
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [imageFile, setImageFile] = useState(null);
  
    // Handle confirmation for adding the artist
    const handleConfirmAction = async () => {
      const base64 = await convertToBase64(imageFile);
      const artistData = {
        name: Form.name.value,
        genre: genres,
        image : base64,
      };
      console.log(artistData);
      const response = await addArtist(artistData);
      if (response.name !== null) {
        // Show success toast on successful addition
        addToast(`Artist ${response.name} has been successfully added`);
        
        // Reset the form and state variables
        Form.reset();
        handleResetForm();
        // Close the confirmation dialog
        setIsAlertOpen(false);
      } else {
        // Show error toast on failure
        errorToast(response.error);
      }
    };
  
    // Handle cancellation of the confirmation
    const handleCancelAction = () => {
      // Close the confirmation dialog
      setIsAlertOpen(false);
    };
  
    // Use Chakra UI toast for displaying success and error messages
    const toast = useToast();
    const addToast = (message) => {
      toast({
        title: 'Artist successfully added',
        description: message,
        duration: 5000,
        isClosable: true,
        status: 'success',
        position: 'top',
      });
    };
  
    const errorToast = (error) => {
      toast({
        title: 'Error',
        description: error,
        duration: 5000,
        isClosable: true,
        status: 'error',
        position: 'top',
      });
    };
  
    // Handle form submission
    const handleSubmit = async (event) => {
      event.preventDefault();
      // Check if the form is valid (all required fields are filled and at least one genre and artist are added)
      setIsFormSubmitted(true);
      const form = event.target;
      const isValid = form.checkValidity() && genres.length > 0 && imageFile !== null;
  
      if (isValid) {
        // Open the confirmation dialog
        setIsAlertOpen(true);
        // Save the form for later use
        setForm(form);
      }
    };
  
    // Handle changes in the genre input field
    const handleGenreInputChange = (event) => {
      setGenreInput(event.target.value);
    };
  
    // Handle addition of genre to the list
    const handleAddGenre = () => {
      if (genreInput.trim() !== '') {
        setGenres((prevGenres) => [...prevGenres, genreInput.trim()]);
        setGenreInput('');
      }
    };
  
    // Handle removal of genre from the list
    const handleRemoveGenre = (index) => {
      setGenres((prevGenres) => prevGenres.filter((_, i) => i !== index));
    };
  
    // Reset the form and state variables
    const handleResetForm = () => {
      setGenres([]);
      setGenreInput('');
      setIsFormSubmitted(false);
      setImageFile(null);
    };
  
    return (
      <>
      <form onSubmit={handleSubmit} >
          <VStack spacing="30px" width = "100%" maxW = "400px">
            {/* Form control for artist name */}
            <FormControl isRequired>
              <FormLabel color="white">Name</FormLabel>
              <Input color="white" type="text" id="name" name="name" required />
              {isFormSubmitted && (
                <FormErrorMessage color="white">Please fill out this field.</FormErrorMessage>
              )}
            </FormControl>
            
            {/* Form control for genres */}
            <FormControl>
              <FormLabel color="white">Genres</FormLabel>
              <VStack align="start" spacing="5px" width="100%">
                {/* Display added genres */}
                <Flex wrap="wrap" width="100%" gap="10px">
                  {genres.map((genre, index) => (
                    <Flex key={index} bg="teal" color="white" borderRadius="4px" p="2px 8px">
                      <span>{genre}</span>
                      <CloseButton size="sm" pt="1px" color="white" onClick={() => handleRemoveGenre(index)} />
                    </Flex>
                  ))}
                </Flex>
                {/* Input and add button for genres */}
                <HStack width="100%">
                  <Input
                    color="white"
                    type="text"
                    id="genreInput"
                    name="genreInput"
                    value={genreInput}
                    onChange={handleGenreInputChange}
                  />
                  <Button colorScheme="teal" size="sm" onClick={handleAddGenre}>
                    Add
                  </Button>
                </HStack>
                {isFormSubmitted && genres.length === 0 ? (
                <Text color="red">Please add at least one genre.</Text>
                
              ) : <></>}
              </VStack>
              
            </FormControl>
            <FormControl>
            <FormLabel color="white">Image (png, jpg, jpeg)</FormLabel>
            <Box
              position="relative"
              overflow="hidden"
              cursor="pointer"
              borderRadius="md"
              borderColor="teal.100"
              borderWidth="2px"
              p="2px"
            >
              <Input
                color="white"
                type="file"
                id="image"
                name="image"
                accept=".png, .jpg, .jpeg"
                onChange={(e) => setImageFile(e.target.files[0])}
                opacity="0" // Hide the original input
                position="absolute"
                top="0"
                left="0"
                zIndex="1"
              />
              <Button as="label" htmlFor="image" colorScheme="teal" size = "sm">
                Select Image
              </Button>
              {imageFile && (
                <Box p="4px" mt="2" bgColor="#000C66" borderRadius="md" color = "white">
                  <span>{imageFile.name}</span>
                  <CloseButton size="sm" pt="1px" color="white" onClick={(e) => setImageFile(e.target.files[0])} />
                </Box>
              )}
            </Box>
            {isFormSubmitted && !imageFile ? (<Text color="red">Please select an image.</Text>) : <></>}
          </FormControl>
            {/* Submit button */}
            <Center>
              <Button colorScheme="teal" type="submit">
                Add Artist
              </Button>
            </Center>
          </VStack>
        </form>
        
        {/* Confirmation dialog */}
        <AlertDialog isOpen={isAlertOpen} onClose={handleCancelAction}>
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm Add
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to add the artist with the mentioned information.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={handleCancelAction}>Cancel</Button>
              <Button colorScheme="red" ml={3} onClick={handleConfirmAction}>
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  }
  
  export default AddArtistForm;
  
  function convertToBase64(file)
  {
    return new Promise ((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result)
      };
      fileReader.onerror = (error) =>{
        reject(error);
      } 
    }) 
  }