import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, HStack, IconButton, Text, VStack, useDisclosure, Image } from '@chakra-ui/react';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '../../assets/tunehub.svg';
import { isAdmin } from '../../services/AuthenticationServices/AuthenticationServices';

function NavBar() {
  const isMobile = useMediaQuery({ query: '(max-width: 1080px)' });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = localStorage.getItem("user");
  const navigate = useNavigate();


  const handleLogOut = () => {
    localStorage.setItem("user", "");
    navigate("/");
    window.location.reload();
  };

  return (
    isMobile ?
      <Flex as="nav" alignItems="center" justify="space-between" h="10vh" w="100%" backgroundColor="#050A30">
        {/* Logo */}
        <NavLink to="/">
          <Image src={Logo} alt="TuneHub" width="96px" ml="16px" />
        </NavLink>
        <Box>
          <IconButton
            icon={<HamburgerIcon color="white" boxSize="4vh" />}
            variant="ghost"
            onClick={onOpen}
            aria-label="Open Menu"
            mr="16px"
          />

          <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent backgroundColor="#050A30">
              <DrawerCloseButton color="white" />
              <DrawerHeader color="white" align="center">TuneHub</DrawerHeader>
              <DrawerBody>
                <VStack gap="12px">
                  {/* Home */}
                  <Box>
                    <NavLink to='/' onClick={onClose}>
                      <Text fontWeight="medium" color="white">Home</Text>
                    </NavLink>
                  </Box>
                  {/* Features */}
                  <Box>
                    <NavLink to='/spotify' onClick={onClose}>
                      <Text fontWeight="medium" color="white" >My Spotify</Text>
                    </NavLink>
                  </Box>
                  <Box>
                    <NavLink to='/my-favorites' onClick={onClose}>
                      <Text fontWeight="medium" color="white" >Favorites</Text>
                    </NavLink>
                  </Box>
                  <Box>
                    <NavLink to='/trivia' onClick={onClose}>
                      <Text fontWeight="medium" color="white" >Trivia</Text>
                    </NavLink>
                  </Box>
                  <Box>
                    <NavLink to='/search/song' onClick={onClose}>
                      <Text fontWeight="medium" color="white" >Search song</Text>
                    </NavLink>
                  </Box>
                  <Box>
                    <NavLink to='/search/artist' onClick={onClose}>
                      <Text fontWeight="medium" color="white" >Search artist</Text>
                    </NavLink>
                  </Box>
                  {isAdmin() ?
                    <Box>
                      <NavLink to='/admin' onClick={onClose}>
                        <Text fontWeight="medium" color="white" >Admin</Text>
                      </NavLink>
                    </Box> : null}
                  {/* About Us */}
                  <Box>
                    <NavLink to='/about-us' onClick={onClose}>
                      <Text fontWeight="medium" color="white">About Us</Text>
                    </NavLink>
                  </Box>
                  {/* News */}
                  <Box>
                    <NavLink to='/faq' onClick={onClose}>
                      <Text fontWeight="medium" color="white">FAQs</Text>
                    </NavLink>
                  </Box>
                  {/* Contact */}
                  <Box>
                    <NavLink to='/contact-us' onClick={onClose}>
                      <Text fontWeight="medium" color="white">Contact Us</Text>
                    </NavLink>
                  </Box>
                  {user ? <NavLink to='/user/profile'>
                    <Text fontWeight="medium" color="white">Profile</Text>
                  </NavLink> : null}
                  {user ? <Button onClick={handleLogOut} fontWeight="medium" colorScheme="teal" variant="solid">Log Out</Button> : <NavLink to='/user/login'>
                    <Button fontWeight="medium" colorScheme="teal" variant="solid">Sign In/Up</Button>
                  </NavLink>}
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Box>
      </Flex>
      :
      <Flex as="nav" alignItems="center" justify="space-between" h="10vh" w="100%" backgroundColor="#050A30">
        {/* Logo */}
        <NavLink to="/">
          <Image src={Logo} alt="TuneHub" width="128px" ml="16px" />
        </NavLink>
        <HStack gap="24px" mr="40px">
          {/* Home */}
          <Box>
            <NavLink to='/'>
              <Text fontWeight="medium" color="white" fontSize="lg">Home</Text>
            </NavLink>
          </Box>
          {/* Features */}
          <Box>
            <NavLink to='/spotify'>
              <Text fontWeight="medium" color="white" fontSize="lg">My Spotify</Text>
            </NavLink>
          </Box>
          <Box>
            <NavLink to='/my-favorites'>
              <Text fontWeight="medium" color="white" fontSize="lg">Favorites</Text>
            </NavLink>
          </Box>
          <Box>
            <NavLink to='/trivia'>
              <Text fontWeight="medium" color="white" fontSize="lg">Trivia</Text>
            </NavLink>
          </Box>
          <Box>
            <NavLink to='/search/song'>
              <Text fontWeight="medium" color="white" fontSize="lg">Search songs</Text>
            </NavLink>
          </Box>
          <Box>
            <NavLink to='/search/artist'>
              <Text fontWeight="medium" color="white" fontSize="lg">Search artists</Text>
            </NavLink>
          </Box>
          {isAdmin() ? <Box>
            <NavLink to='/admin'>
              <Text fontWeight="medium" color="white" fontSize="lg">Admin</Text>
            </NavLink>
          </Box> : null}
          {/* About Us */}
          <Box>
            <NavLink to='/about-us'>
              <Text fontWeight="medium" color="white" fontSize="lg">About Us</Text>
            </NavLink>
          </Box>
          {/* News */}
          <Box>
            <NavLink to='/faq'>
              <Text fontWeight="medium" color="white" fontSize="lg">FAQs</Text>
            </NavLink>
          </Box>
          {/* Contact */}
          <Box>
            <NavLink to='/contact-us'>
              <Text fontWeight="medium" color="white" fontSize="lg">Contact Us</Text>
            </NavLink>
          </Box>
          {user ? <NavLink to='/user/profile'>
            <Text fontWeight="medium" color="white" fontSize="lg">Profile</Text>
          </NavLink>: null}
          {/* CTA */}
          {user ? <Button onClick={handleLogOut} fontWeight="medium" colorScheme="teal" variant="solid" fontSize="lg">Log Out</Button> : <NavLink to='/user/login'>
            <Button fontWeight="medium" colorScheme="teal" variant="solid" fontSize="lg">Sign In/Up</Button>
          </NavLink>}
        </HStack>
      </Flex>
  );
}

export default NavBar;