import { Avatar, Button, Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { getUserInfo, logout } from '../../spotify-integration/SpotifyIntegration';
import SpotifySidePanel from '../../components/SpotifySidePanel/SpotifySidePanel';
import { useMediaQuery } from 'react-responsive';


function SpotifyProfile() {
    const [user, setUser] = useState(null);
    const [followedArtists, setFollowedArtists] = useState(null);
    const [playlists, setPlaylists] = useState(null);
    const selectedTab = 0;
    const isMobile = useMediaQuery({ query: '(max-width: 1080px)' });

    useEffect(() => {
        const fetchData = async () => {
            const { user, followedArtists, playlists } = await getUserInfo();
            setUser(user);
            setFollowedArtists(followedArtists);
            setPlaylists(playlists);

        };
        fetchData();
    }, []);

    return (
        isMobile ?
            <Flex w="100%" backgroundColor="#000C66" minHeight="90vh" flexDirection="column">
                <Flex w="100%">
                    <SpotifySidePanel selectedTab={selectedTab} />
                </Flex>
                <Flex flexDirection="column" w="100%" alignItems="center">
                    {
                        user ?
                            <>
                                <Text fontSize="xl" fontWeight="medium" color="white" mt="24px">My Spotify</Text>
                                {user.images.length > 0 ? (
                                    <Avatar src={user.images[1].url} alt="avatar" size="2xl" mt="48px" />
                                ) : (
                                    <Avatar size="2xl" mt="48px" />
                                )}
                                <Text fontSize="3xl" fontWeight="medium" color="white" mt="8px">{user.display_name}</Text>
                                <Flex w="100%" justifyContent="space-around" mt="64px">
                                    <Flex flexDirection="column" alignItems="center">
                                        <Text fontSize="md" fontWeight="medium" color='#1DB954'>{user.followers.total}</Text>
                                        <Text fontSize="md" fontWeight="medium" color='white' mt="8px">Followers</Text>
                                    </Flex>
                                    {
                                        followedArtists && (
                                            <Flex flexDirection="column" alignItems="center">
                                                <Text fontSize="md" fontWeight="medium" color='#1DB954'>{followedArtists.artists.items.length}</Text>
                                                <Text fontSize="md" fontWeight="medium" color='white' mt="8px">Following</Text>
                                            </Flex>
                                        )
                                    }
                                    <Flex flexDirection="column" alignItems="center">
                                        <Text fontSize="md" fontWeight="medium" color='#1DB954'>{playlists ? playlists.total : 0}</Text>
                                        <Text fontSize="md" fontWeight="medium" color='white' mt="8px">Playlists</Text>
                                    </Flex>
                                </Flex>
                                <Button onClick={logout} variant="solid" colorScheme='teal' mt="48px" w="160px">Log Out</Button>
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
                    <Flex flexDirection="column" w="75%" alignItems="center">
                        {
                            user ?
                                <>
                                    <Text fontSize="4xl" fontWeight="medium" color="white" mt="24px">My Spotify</Text>
                                    {user.images.length > 0 ? (
                                        <Avatar src={user.images[1].url} alt="avatar" size="2xl" mt="48px" />
                                    ) : (
                                        <Avatar size="2xl" mt="48px" />
                                    )}
                                    <Text fontSize="5xl" fontWeight="medium" color="white" mt="8px">{user.display_name}</Text>
                                    <Flex w="720px" justifyContent="space-around" mt="64px">
                                        <Flex flexDirection="column" alignItems="center">
                                            <Text fontSize="xl" fontWeight="medium" color='#1DB954'>{user.followers.total}</Text>
                                            <Text fontSize="xl" fontWeight="medium" color='white' mt="8px">Followers</Text>
                                        </Flex>
                                        {
                                            followedArtists && (
                                                <Flex flexDirection="column" alignItems="center">
                                                    <Text fontSize="xl" fontWeight="medium" color='#1DB954'>{followedArtists.artists.items.length}</Text>
                                                    <Text fontSize="xl" fontWeight="medium" color='white' mt="8px">Following</Text>
                                                </Flex>
                                            )
                                        }
                                        <Flex flexDirection="column" alignItems="center">
                                            <Text fontSize="xl" fontWeight="medium" color='#1DB954'>{playlists ? playlists.total : 0}</Text>
                                            <Text fontSize="xl" fontWeight="medium" color='white' mt="8px">Playlists</Text>
                                        </Flex>
                                    </Flex>
                                    <Button onClick={logout} variant="solid" colorScheme='teal' mt="48px" w="160px">Log Out</Button>
                                </>
                                :
                                <Text>Loading</Text>
                        }
                    </Flex>
                </Flex>

            </Flex>
    );
}

export default SpotifyProfile;