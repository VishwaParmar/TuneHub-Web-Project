import { CircularProgress, Flex, Heading, Image, Text, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
// import { useMediaQuery } from 'react-responsive';
import { NavLink, useParams } from 'react-router-dom';
import { getSong } from '../../services/SongService/SongService';
import image1 from '../../assets/headphone.png';
import { isFavorite, addToFavorites, deleteFromFavorites } from '../../services/FavoritesService/FavoritesService';
import { getReviews } from '../../services/ReviewService/ReviewService';
import { useMediaQuery } from 'react-responsive';
import ReviewContainer from '../../components/ReviewComponent/ReviewContainer';


function SongPage() {
    // const isMobile = useMediaQuery({ query: '(max-width: 1080px)' });
    const userid = JSON.parse(localStorage.getItem("user")).id;
    const [song, setSong] = useState(null);
    const { songID } = useParams();
    const [isFav, setIsFav] = useState(false);
    const [reviews, setReviews] = useState([]);
    const isMobile = useMediaQuery({ query: '(max-width: 1080px)' });


    useEffect(() => {
        
        const fetchData = async () => {
            const reviewData = await getReviews(songID);
            const data = await getSong(songID);
            const dataRes = await isFavorite(userid, songID);

            setReviews(reviewData);
            setIsFav(dataRes.isFav);
            setSong(data);

        };
        fetchData();
    }, [songID, userid]);

    const removeFromFavorites = async () => {
        await deleteFromFavorites(userid, songID);
        const dataRes = await isFavorite(userid, songID);
        setIsFav(dataRes.isFav);
    }

    const addFavorite = async () => {
        await addToFavorites(userid, songID);
        const dataRes = await isFavorite(userid, songID);

        setIsFav(dataRes.isFav);
    }

    return (
        isMobile ?

            song ?
                <Flex w="100%" backgroundColor="#000C66" minHeight="90vh" flexDirection="column" alignItems="center">

                    {/* Photo */}
                    <Flex minH="30vh" flexDirection="column" minW="30vh" maxH="30vh" maxW="30vh" mt="5vh">
                        <Image src={song.image ?? image1} alt="Song Image" maxHeight="40vh" w="30vh" objectFit="cover" />
                    </Flex>
                    {/* Song details */}

                    <Heading color="white" mt="16px">{song.name}</Heading>
                    <Text fontWeight="medium" fontSize="2xl" color="white" mt="20px">
                        {song.artist?.map((item) => (
                            item + " "
                        ))}
                    </Text>
                    <Text fontSize="lg" fontWeight="medium" color="white" mt="32px">Genres: </Text>
                    <Text fontWeight="medium" color="white" mt="4px">
                        {song.genres?.map((item) => (
                            item + " "
                        ))}
                    </Text>
                    <Text fontWeight="medium" color="white" mt="20px">Duration {song.duration}</Text>


                    <Flex mt="32px" flexDirection="column" gap="12px">
                        {isFav === "true" ? <Button onClick={removeFromFavorites} variant="solid" colorScheme="teal">Remove from Favorites</Button> : <Button onClick={addFavorite} variant="solid" colorScheme="teal">Add to Favorites</Button>}
                        <NavLink to={"/song/" + songID + "/add-review"}>
                            <Button variant="solid" colorScheme="teal" ml="16px">Add review</Button>
                        </NavLink>
                    </Flex>
                    <Flex flexDirection="column" w="90%" alignItems="center">
                        <Text fontSize="xl" color="white" fontWeight="medium" mt="32px">Reviews </Text>
                        {
                            reviews ?
                                reviews?.map((review, ind) => {
                                    return <ReviewContainer key={ind} {...review} />
                                }) : <Flex w="100%" backgroundColor="#000C66" flexDirection="column" alignItems="center" justifyContent="center">
                                    <CircularProgress isIndeterminate color="teal" />
                                </Flex>
                        }
                    </Flex>
                </Flex>
                :
                <Flex w="100%" backgroundColor="#000C66" minHeight="90vh" flexDirection="column" alignItems="center" justifyContent="center">
                    <CircularProgress isIndeterminate color="teal" />
                </Flex>
            : song ?
                <Flex w="100%" backgroundColor="#000C66" minHeight="90vh" flexDirection="column" alignItems="center">
                    <Flex mt="64px" w="1080px">
                        {/* Photo */}
                        <Flex minH="30vh" minW="30vh" maxH="30vh" maxW="30vh">
                            <Image src={song.image ?? image1} alt="Song Image" maxHeight="40vh" w="30vh" objectFit="cover" />
                        </Flex>
                        {/* Song details */}
                        <Flex minH="30vh" flexDirection="column" justifyContent="end" ml="32px">
                            <Heading color="white">{song.name}</Heading>
                            <Text fontWeight="medium" color="white">
                                {song.artist?.map((item) => (
                                    item + " "
                                ))}
                            </Text>
                            <Text fontSize="lg" fontWeight="medium" color="white" mt="16px">Genres: </Text>
                            <Text fontWeight="normal" color="white">
                                {song.genres?.map((item) => (
                                    item + " "
                                ))}
                            </Text>
                            <Text fontWeight="medium" color="white" mt="8px">Duration {song.duration}</Text>
                            <Flex mt="32px">
                                {isFav === "true" ? <Button onClick={removeFromFavorites} variant="solid" colorScheme="teal">Remove from Favorites</Button> : <Button onClick={addFavorite} variant="solid" colorScheme="teal">Add to Favorites</Button>}
                                <NavLink to={"/song/" + songID + "/add-review"}>
                                    <Button variant="solid" colorScheme="teal" ml="16px">Add review</Button>
                                </NavLink>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex flexDirection="column" w="1080px">
                        <Text fontSize="xl" color="white" fontWeight="medium" mt="32px">Reviews </Text>
                        {
                            reviews ?
                                reviews?.map((review, ind) => {
                                    return <ReviewContainer key={ind} {...review} />
                                }) : <Flex w="100%" backgroundColor="#000C66" flexDirection="column" alignItems="center" justifyContent="center">
                                    <CircularProgress isIndeterminate color="teal" />
                                </Flex>
                        }
                    </Flex>
                </Flex>
                :
                <Flex w="100%" backgroundColor="#000C66" minHeight="90vh" flexDirection="column" alignItems="center" justifyContent="center">
                    <CircularProgress isIndeterminate color="teal" />
                </Flex>
    );


}

export default SongPage;
