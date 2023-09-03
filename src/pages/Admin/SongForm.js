import {
    Center,
    Flex
  } from '@chakra-ui/react';
  import AddSongForm from '../../components/AdminComponent/AddSongForm.js';
  import LeftSidePanel from '../../components/AdminComponent/AdminSidePanel.js';
  import { useMediaQuery } from 'react-responsive';
  
  function SongForm() {
    const tabIndex = 1;
    const isMobile = useMediaQuery({ query: '(max-width: 1080px)' });
    return (
      <>
        {/* Render different layouts based on the screen size */}
        {isMobile ? (
          <Flex p={0} backgroundColor="#000C66" minW="100vw" minH = "90vh" direction="column">
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
                <AddSongForm />
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
                mt="32px"
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
                <AddSongForm />
              </Flex>
            </Center>
          </Flex>
        )}
      </>
    );
  }
  
  export default SongForm;
  