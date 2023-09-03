import {
    Center,
    Flex
  } from '@chakra-ui/react';
  import LeftSidePanel from '../../components/AdminComponent/AdminSidePanel.js';
  import { useMediaQuery } from 'react-responsive';
import AddArtistForm from '../../components/AdminComponent/AddArtistForm.js';
  
  function ArtistForm() {
    const tabIndex = 2;
    const isMobile = useMediaQuery({ query: '(max-width: 1080px)' });
    return (
      <>
        {/* Render different layouts based on the screen size */}
        {isMobile ? (
          <Flex p={0} backgroundColor="#000C66" minW="100vw" minH = "90vh"  direction="column">
            {/* Set padding to 0 and overflow to hidden */}
            <Flex>
              <LeftSidePanel selectedTab={tabIndex} />
            </Flex>
            <Center>
              <Flex
                backgroundColor="#050A30"
                mt="72px"
                borderRadius="10px"
                maxW="350px"
                width="100%"
                flex="1"
                pt="20px"
                pb="20px"
                position="relative"
                justifyContent="center"
                alignItems="center"
              >
                {/* Center the content */}
                <AddArtistForm />
              </Flex>
            </Center>
          </Flex>
        ) : (
          <Flex p={0} backgroundColor="#000C66" minH="90vh">
            {/* Set padding to 0 and overflow to hidden */}
            <Flex>
              <LeftSidePanel selectedTab={tabIndex} />
            </Flex>
            <Center flex="1">
              <Flex
                backgroundColor="#050A30"
                mt="16px"
                borderRadius="10px"
                maxW="350px"
                flex="1"
                pt="20px"
                pb="20px"
                position="relative"
                justifyContent="center"
                alignItems="center"
              >
                {/* Center the content */}
                <AddArtistForm />
              </Flex>
            </Center>
          </Flex>
        )}
      </>
    );
  }
  
  export default ArtistForm;
  