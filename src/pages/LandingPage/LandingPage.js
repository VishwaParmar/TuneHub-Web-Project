import { StarIcon } from '@chakra-ui/icons';
import { Button, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import LandingPageSVG from '../../assets/landingpage.svg';
import { NavLink } from 'react-router-dom';
import { isAuthenticated } from '../../services/AuthenticationServices/AuthenticationServices';

function LandingPage() {
    const isMobile = useMediaQuery({ query: '(max-width: 1080px)' });
    return (
        isMobile ?
            <Flex w="100%" minHeight="90vh" backgroundColor="#000C66" flexDir="column" alignItems="center" justifyContent="start">
                {/* Display Image*/}
                <Flex mt="16px" w="100%" justifyContent="center">
                    <img alt="TuneHub" src={LandingPageSVG} height="40%" width="80%" />
                </Flex>
                {/* Menu Items */}
                <Flex direction="column" gap="8px" mt="64px" mb="16px">
                    <Flex alignItems="center">
                        <StarIcon boxSize="4" color="white" mr="24px" />
                        <Text fontSize="lg" fontWeight="medium" color="white">Song Recommendations</Text>
                    </Flex>
                    <Flex alignItems="center">
                        <StarIcon boxSize="4" color="white" mr="24px" />
                        <Text fontSize="lg" fontWeight="medium" color="white">News and Updates</Text>
                    </Flex>
                    <Flex alignItems="center">
                        <StarIcon boxSize="4" color="white" mr="24px" />
                        <Text fontSize="lg" fontWeight="medium" color="white">Spotify Integration</Text>
                    </Flex>
                </Flex>
                {/* CTA */}
                <NavLink to={isAuthenticated() ? "/spotify" : "/user/login"}>
                    <Button fontSize="md" fontWeight="medium" colorScheme='teal' mt="16px" height="40px" width="69%">Get Started</Button>
                </NavLink>
            </Flex>
            :
            <Flex w="100%" minHeight="90vh" backgroundColor="#000C66" alignItems="center" justifyContent="space-evenly">
                <Flex flexDir="column" gap="12px" width="35%">
                    {/* Menu Items */}
                    <Flex alignItems="center">
                        <StarIcon boxSize="8" color="white" mr="24px" />
                        <Text fontSize="4xl" fontWeight="medium" color="white">Song Recommendations</Text>
                    </Flex>
                    <Flex alignItems="center">
                        <StarIcon boxSize="8" color="white" mr="24px" />
                        <Text fontSize="4xl" fontWeight="medium" color="white">News and Updates</Text>
                    </Flex>
                    <Flex alignItems="center">
                        <StarIcon boxSize="8" color="white" mr="24px" />
                        <Text fontSize="4xl" fontWeight="medium" color="white">Spotify Integration</Text>
                    </Flex>
                    {/* CTA */}
                    <NavLink to={isAuthenticated() ? "/spotify" : "/user/login"}>
                        <Button fontSize="2xl" fontWeight="medium" colorScheme='teal' mt="16px" height="48px">Get Started</Button>
                    </NavLink>
                </Flex>
                {/* Display Image*/}
                <img alt="TuneHub" src={LandingPageSVG} width="50%" />
            </Flex>
    );
}

export default LandingPage;