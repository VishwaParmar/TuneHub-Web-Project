import { Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import SongContainer from '../../components/SongContainer/SongContainer';
import { getTopTracksLong } from '../../spotify-integration/SpotifyIntegration';
import SpotifySidePanel from '../../components/SpotifySidePanel/SpotifySidePanel';
import { useMediaQuery } from 'react-responsive';


function SpotifyTopSongs() {
    const [topTracks, setTopTracks] = useState(null);
    const selectedTab = 1;
    const isMobile = useMediaQuery({ query: '(max-width: 1080px)' });

    useEffect(() => {
        const fetchData = async () => {
            const data = await getTopTracksLong();
            setTopTracks(data);
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
                        topTracks ?
                            <>
                                <Flex justifyContent="space-between" w="100%">
                                    <Text fontSize="lg" fontWeight="medium" color="white" mt="24px" alignSelf="center">Top Tracks</Text>
                                    <Text fontSize="lg" fontWeight="medium" color="white" mt="24px">All Time</Text>
                                </Flex>
                                {
                                    topTracks.items.map((track, ind) => <SongContainer track={track} key={ind} />)
                                }
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
                            topTracks ?
                                <>
                                    <Flex justifyContent="space-between">
                                        <Text fontSize="2xl" fontWeight="medium" color="white" mt="24px" alignSelf="center">Top Tracks</Text>
                                        <Text fontSize="2xl" fontWeight="medium" color="white" mt="24px">All Time</Text>
                                    </Flex>
                                    {
                                        topTracks.items.map((track, ind) => <SongContainer track={track} key={ind} />)
                                    }
                                </>
                                :
                                <Text>Loading</Text>
                        }
                    </Flex>
                </Flex>

            </Flex>
    );
}

export default SpotifyTopSongs;