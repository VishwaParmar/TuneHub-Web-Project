import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useMediaQuery } from 'react-responsive';


function ReviewContainer(props) {
    const { userName, comment, rating } = props;
    const isMobile = useMediaQuery({ query: '(max-width: 1080px)' });

    return (
        isMobile ?
            <Flex w="100%" mt="32px" flexDirection="column">
                <Flex w="100%" justifyContent="space-between">
                    <Text color="white" fontWeight="medium" fontSize="md">{userName}</Text>
                    <Text color="white" fontWeight="medium" fontSize="md">Rating: {rating}/5</Text>
                </Flex>
                <Text color="white" fontWeight="normal" mt="8px">{comment}</Text>
            </Flex>
            :
            <Flex w="100%" mt="32px" flexDirection="column">
                <Flex w="100%" justifyContent="space-between">
                    <Text color="white" fontWeight="medium" fontSize="md">{userName}</Text>
                    <Text color="white" fontWeight="medium" fontSize="md">Rating: {rating}/5</Text>
                </Flex>
                <Text color="white" fontWeight="normal" mt="8px">{comment}</Text>
            </Flex>
    );
}

export default ReviewContainer;