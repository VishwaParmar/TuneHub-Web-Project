import { Box, Button, Flex, FormControl, FormLabel, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Textarea, Text, Image, Heading, CircularProgress } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate, useParams } from 'react-router-dom';
import { getSong } from '../../services/SongService/SongService';
import image1 from '../../assets/headphone.png';
import { addReview } from '../../services/ReviewService/ReviewService';



function AddReview() {

    const isMobile = useMediaQuery({ query: '(max-width: 1080px)' });
    const { songID } = useParams();
    const [rating, setRating] = useState(3);
    const [review, setReview] = useState('');
    const userName = JSON.parse(localStorage.getItem("user")).firstName;
    const [song, setSong] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
       
        const fetchData = async () => {
            const data = await getSong(songID);
            setSong(data);

        };
        fetchData();
    }, [songID]);

    const handleRatingChange = (value) => {
        setRating(value);
    };

    const handleReviewChange = (event) => {
        setReview(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const reviewObj = {
            userName: userName,
            comment: review,
            rating: rating
        }

        await addReview(songID, reviewObj);
        navigate(`/song/${songID}`);

    };

    return (
        isMobile ?
            song ? <Flex w="100%" backgroundColor="#000C66" minHeight="90vh" flexDirection="column" alignItems="center">

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

                <Flex w="90%" flexDirection="column" alignItems="center">
                    <FormControl mt="32px">
                        <FormLabel color="white">Rating (out of 5)</FormLabel>
                        <Slider
                            defaultValue={rating}
                            onChange={handleRatingChange}
                            min={0}
                            max={5}
                            step={1}
                            colorScheme="teal"
                        >
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb boxSize={6} />
                        </Slider>
                        <Box textAlign="center" mt={2}>
                            <Text color="white" fontSize="lg" fontWeight="bold">
                                {rating}
                            </Text>
                        </Box>
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel color="white">Review</FormLabel>
                        <Textarea
                            value={review}
                            onChange={handleReviewChange}
                            placeholder="Write your review here..."
                            color="white"
                        />
                    </FormControl>

                    <Button onClick={handleSubmit} mt={4} colorScheme="teal" mb="64px">
                        Submit
                    </Button>
                </Flex>

            </Flex> :
                <Flex w="100%" backgroundColor="#000C66" minHeight="90vh" flexDirection="column" alignItems="center" justifyContent="center">
                    <CircularProgress isIndeterminate color="teal" />
                </Flex>
            :
            song ? <Flex w="100%" backgroundColor="#000C66" minHeight="90vh" flexDirection="column" alignItems="center">
                <Flex w="1080px" flexDirection="column">
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

                        </Flex>
                    </Flex>

                    <FormControl mt="32px">
                        <FormLabel color="white">Rating (out of 5)</FormLabel>
                        <Slider
                            defaultValue={rating}
                            onChange={handleRatingChange}
                            min={0}
                            max={5}
                            step={1}
                            colorScheme="teal"
                        >
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb boxSize={6} />
                        </Slider>
                        <Box textAlign="center" mt={2}>
                            <Text color="white" fontSize="lg" fontWeight="bold">
                                {rating}
                            </Text>
                        </Box>
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel color="white">Review</FormLabel>
                        <Textarea
                            value={review}
                            onChange={handleReviewChange}
                            placeholder="Write your review here..."
                            color="white"
                        />
                    </FormControl>

                    <Button onClick={handleSubmit} mt={4} colorScheme="teal">
                        Submit
                    </Button>
                </Flex>
            </Flex> :
                <Flex w="100%" backgroundColor="#000C66" minHeight="90vh" flexDirection="column" alignItems="center" justifyContent="center">
                    <CircularProgress isIndeterminate color="teal" />
                </Flex>
    );
}

export default AddReview;