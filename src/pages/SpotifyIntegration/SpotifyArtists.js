import { Avatar, Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { getTopArtistsLong } from '../../spotify-integration/SpotifyIntegration';
import SpotifySidePanel from '../../components/SpotifySidePanel/SpotifySidePanel';
import { useMediaQuery } from 'react-responsive';

function SpotifyArtists() {
    const [topArtists, setTopArtists] = useState(null);
    const selectedTab = 2;
    const isMobile = useMediaQuery({ query: '(max-width: 1080px)' });

    useEffect(() => {
        const fetchData = async () => {
            const data = await getTopArtistsLong();
            setTopArtists(data);
        };
        fetchData();
    }, []);

    return (
        isMobile ?
            <Flex w="100%" backgroundColor="#000C66" minHeight="90vh" flexDirection="column">
                <Flex w="100%">
                    <SpotifySidePanel selectedTab={selectedTab} />
                </Flex>

                <Flex flexDirection="column" w="100%" pr="16px" pl="16px">

                    {
                        topArtists ?
                            <>
                                <Flex justifyContent="space-between">
                                    <Text fontSize="2xl" fontWeight="medium" color="white" mt="24px" alignSelf="center">Top Artists</Text>
                                    <Text fontSize="2xl" fontWeight="medium" color="white" mt="24px">All Time</Text>
                                </Flex>
                                <Flex wrap="wrap" gap="24px" rowGap="40px" mt="32px" justifyContent="space-around">
                                    {
                                        topArtists.items.map((artist, ind) => <Flex flexDirection="column" alignItems="center">
                                            {artist.images.length && <Avatar src={artist.images[1].url} alt="Artist" size="2xl" />}
                                            <Text mt="12px" fontSize="lg" fontWeight="medium" color="white">{artist.name}</Text>
                                        </Flex>)
                                    }
                                </Flex>
                            </>
                            :
                            <Text>Loading</Text>
                    }
                </Flex>
            </Flex>
            :
            <Flex w="100%" backgroundColor="#000C66" minHeight="90vh">
                <Flex w="10%">
                    <SpotifySidePanel selectedTab={selectedTab} />
                </Flex>
                <Flex w="90%" justifyContent="center">
                    <Flex flexDirection="column" w="75%">

                        {
                            topArtists ?
                                <>
                                    <Flex justifyContent="space-between">
                                        <Text fontSize="2xl" fontWeight="medium" color="white" mt="24px" alignSelf="center">Top Artists</Text>
                                        <Text fontSize="2xl" fontWeight="medium" color="white" mt="24px">All Time</Text>
                                    </Flex>
                                    <Flex wrap="wrap" gap="40px" rowGap="64px" mt="32px" justifyContent="space-around">
                                        {
                                            topArtists.items.map((artist, ind) => <Flex flexDirection="column" alignItems="center">
                                                {artist.images.length && <Avatar src={artist.images[1].url} alt="Artist" size="2xl" />}
                                                <Text mt="12px" fontSize="lg" fontWeight="medium" color="white">{artist.name}</Text>
                                            </Flex>)
                                        }
                                    </Flex>
                                </>
                                :
                                <Text>Loading</Text>
                        }
                    </Flex>
                </Flex>

            </Flex>
    );
}

export default SpotifyArtists;