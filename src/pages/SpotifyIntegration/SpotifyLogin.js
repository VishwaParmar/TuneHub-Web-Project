import { Button, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import SpotifyLogo from '../../assets/spotify.png';

function SpotifyLogin() {
    // const LOGIN_URI = process.env.LOGIN_URI;
    const isMobile = useMediaQuery({ query: '(max-width: 1080px)' });

    return (
        isMobile ?
            <Flex w="100%" minHeight="90vh" backgroundColor="#000C66" flexDir="column" alignItems="center" justifyContent="start">
                <Text fontSize="4xl" fontWeight="medium" color="white" mt="24px" mb="80px">My Spotify</Text>
                <img src={SpotifyLogo} alt='Spotify' />
                <Text fontSize="xl" fontWeight="medium" color="white" mt="24px" textAlign="center" mr="8px" ml="8px">Connect with Spotify to unlock your Spotify Dashboard</Text>
                <Button variant="solid" colorScheme='teal' mt="32px">
                    <a href="https://tunehub-server.onrender.com/spotify/login">Login to Spotify</a>
                </Button>
            </Flex>
            :
            <Flex w="100%" minH="90vh" backgroundColor="#000C66" flexDirection="column" alignItems="center">
                <Text fontSize="4xl" fontWeight="medium" color="white" mt="24px" mb="128px">My Spotify</Text>
                <img src={SpotifyLogo} alt='Spotify' />
                <Text fontSize="xl" fontWeight="medium" color="white" mt="24px">Connect with Spotify to unlock your Spotify Dashboard</Text>
                <Button variant="solid" colorScheme='teal' mt="32px">
                    <a href="https://tunehub-server.onrender.com/spotify/login">Login to Spotify</a>
                </Button>
            </Flex>
    );
}

export default SpotifyLogin;