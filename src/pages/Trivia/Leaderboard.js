import { Box, Flex, Image, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import LeaderboardSVG from '../../assets/learderboard.svg';
import { fetchLeaderboardData } from '../../services/TriviaServices/LeaderboardServices';


function Leaderboard() {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const isMobile = useMediaQuery({ query: '(max-width: 1080px)' });

    // Function to fetch leaderboard data from the backend
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchLeaderboardData();
            setLeaderboardData(data);
        };
        fetchData();
    }, []);


    return (
        isMobile ?
        <Flex justifyContent="space-around" minH="90vh" backgroundColor="#000C66" w="100%" flexDirection="column" >

        <Flex w="60%"  alignSelf="center" m="24px">
            <Image src={LeaderboardSVG} alt="Animated Woman with Power"  />
        </Flex>
        <Flex w="100%" flexDirection="column"  padding="20px" >
           
                <Text as="h1" fontSize="4xl" color="white"   mb="22px" fontWeight="medium"  alignSelf="center">
                    Leaderboard
                </Text>
                {leaderboardData.map((data, index) => (
                    <Box
                        key={data._id}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        width="100%"
                        padding="10px"
                        color="white"
                        mb="24px"
                        backgroundColor="#0a1c5a"
                        borderRadius="8px"
                        boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
                    >
                        <Box fontSize="xl">
                            {index + 1}.
                        </Box>
                        <Box fontWeight="medium">
                            {data.name}
                        </Box>
                        <Text>{data.score} points</Text>
                    </Box>
                ))}
            
        </Flex>

    </Flex>

        :
        <Flex justifyContent="space-around" minH="90vh" backgroundColor="#000C66" w="100%" >

            
            <Flex w="45%" justifyContent="center">
                <VStack spacing="4"   color="white" order={[2, 2, 1]} mb="24px" mt="32px">
                    <Text as="h1" fontSize="5xl" fontWeight="medium" color="white" mb="1">
                        Leaderboard
                    </Text>
                    {leaderboardData.map((data, index) => (
                        <Box
                            key={data._id}
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            width="400px"
                            padding="10px"
                            backgroundColor="#0a1c5a"
                            borderRadius="8px"
                            boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
                        >
                            <Box fontSize="xl">
                                {index + 1}.
                            </Box>
                            <Box fontWeight="medium">
                                {data.name}
                            </Box>
                            <Text>{data.score} points</Text>
                        </Box>
                    ))}
                </VStack>
            </Flex>
            <Flex w="45%"  alignItems="center">
            <Image src={LeaderboardSVG} alt="Animated Woman with Power" boxSize="500px" />
        </Flex>

        </Flex>
    );
}

export default Leaderboard;
