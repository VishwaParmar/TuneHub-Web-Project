import { DeleteIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Text,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import image1 from '../../assets/headphone.png';
import { deleteSong } from '../../services/AdminServices/AdminServices.js';
import { NavLink } from "react-router-dom";

function SongOverviewBox(props) {
  // Define responsive styles for the component
  const responsiveHeadText = { base: '12px', md: '16px' };
  const responsiveBodyText = { base: '10px', md: '14px' };
  const responsiveIcon = { base: '4', md: '5' };

  // State to control the visibility of the confirmation dialog
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  // Function to determine if the image is an SVG
  const isSVGImage = (url) => {
    return url.toLowerCase().endsWith('.svg');
  };

  // Destructure props to extract song data
  const { id, name, artist, image, duration } = props;

  // Chakra UI Toast to show success and error messages
  const toast = useToast();
  const removeToast = (message) => {
    toast({
      title: 'Song Removed',
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

  // Handle the confirmation action when the user clicks "Remove" in the dialog
  const handleConfirmAction = async () => {
    const updatedList = props.songList.filter((item) => item.id !== id);
    const response = await deleteSong(id);

    if (response?.message !== null) {
      removeToast(response.message);
      props.getSongList();
      props.LoadList(updatedList, props.getSongList);
    } else if (response?.error !== null) {
      errorToast(response.error);
    }
    setIsAlertOpen(false);
  };

  // Handle the cancellation action when the user clicks "Cancel" in the dialog
  const handleCancelAction = () => {
    setIsAlertOpen(false);
  };

  return (
    <>
      <NavLink to={"/song/" + id}>
      <Flex width="100%" justifyContent="space-between" background="#050A30" maxH="100px" borderRadius="10px">
        <Flex p="16px">
          <Box maxH="100%" overflow="hidden">
            {/* Render SVG with image URL if it is an SVG image, else render JPG image */}
            {isSVGImage(image1) ? (
              <svg width="45%" height="45%" viewBox="0 0 100 100">
                <image width="100%" height="100%" href={image1} />
              </svg>
            ) : (
              <Image src={image ?? image1} alt="Song Image" maxHeight="100%" maxWidth="100%" objectFit="cover" />
            )}
          </Box>
          <Flex flexDirection="column" ml="24px" justifyContent="space-between">
            <Text fontSize={responsiveHeadText} color="white" fontWeight="medium">
              {name}
            </Text>
            <Text fontSize={responsiveBodyText} color="white" fontWeight="medium">
              {artist}
            </Text>
          </Flex>
        </Flex>
        <Flex justifyContent="space-evenly" alignItems="center" pr="24px" direction="column">
          <Text fontSize={responsiveHeadText} pb="10px" color="white" fontWeight="medium">
            {duration}
          </Text>
          {/* DeleteIcon with confirmation dialog */}
          <Icon as={DeleteIcon} _hover={{ bg: '#050A30', color: 'red.900' }} ml="4px" color="red.500" boxSize={responsiveIcon} onMouseDown={() => setIsAlertOpen(true)} />
        </Flex>
      </Flex>
      </NavLink>
      
 
      {/* Confirmation dialog */}
      <AlertDialog isOpen={isAlertOpen} onClose={handleCancelAction}>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Confirm Remove
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure you want to remove this song? This action cannot be undone.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={handleCancelAction}>Cancel</Button>
            <Button colorScheme="red" ml={3} onClick={handleConfirmAction}>
              Remove
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
    </>
  );
}

export default SongOverviewBox;
