import {
    Box,
    Flex,
    Image,
    Text
  } from '@chakra-ui/react';
  import React from 'react';
  import { NavLink } from 'react-router-dom';
  import image1 from '../../assets/headphone.png';
  
  function SongCardUser(props) {
    // Define responsive styles for the component
    const responsiveHeadText = { base: '12px', md: '16px' };
    const responsiveBodyText = { base: '10px', md: '14px' };
  
    // Function to determine if the image is an SVG
    const isSVGImage = (url) => {
      return url.toLowerCase().endsWith('.svg');
    };
  
    // Destructure props to extract song data
    const { name, genre, image } = props;
    const formattedGenres = Array.isArray(genre) ? genre.join(', ') : genre;
    return (
      <>
        {/* NavLink to navigate to the song page when clicked */}
        <NavLink >
          <Flex w="100%" justifyContent="space-between" background="#050A30" maxH="100px" borderRadius="10px">
            <Flex p="16px">
              <Box maxH="100%" overflow="hidden">
                {/* Render SVG with image URL if it is an SVG image, else render JPG image */}
                {isSVGImage(image1) ? (
                  <svg width="45%" height="45%" viewBox="0 0 100 100">
                    <image width="100%" height="100%" href={image1} />
                  </svg>
                ) : (
                  <Image src={ image ?? image1} alt="Artist Image" maxHeight="100%" maxWidth="100%" objectFit="cover" />
                )}
              </Box>
              <Flex flexDirection="column" ml="24px" justifyContent="space-between" flexWrap="wrap">
                <Text fontSize={responsiveHeadText} color="white" fontWeight="medium">
                  {name}
                </Text>
                <Text fontSize={responsiveBodyText} color="white" fontWeight="medium">
                  {formattedGenres}
                </Text>
              </Flex>
            </Flex>
            <Flex justifyContent="center" alignItems="center" pr="16px">
              {/* <Text fontSize={responsiveBodyText} color="white" fontWeight="medium">
                {duration}
              </Text> */}
            </Flex>
          </Flex>
        </NavLink>
      </>
    );
  }
  
  export default SongCardUser;
  