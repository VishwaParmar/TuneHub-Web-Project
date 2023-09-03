import { Flex, Text, Input, FormControl, FormLabel, FormErrorMessage, VStack, Button, useToast } from "@chakra-ui/react";
import { useState, React } from 'react';
import { useMediaQuery } from "react-responsive";
import InstaIcon from "../../assets/icon_insta_white.svg";
import TwitterIcon from "../../assets/icon_twitter_white.svg";
import FacebookIcon from "../../assets/icons_facebook.svg";

function ContactUs() {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [message, setMessage] = useState(null);
    const [nameError, setNameError] = useState('');
    const [messageError, setMessageError] = useState('');
    const [emailError, setEmailError] = useState('');
    const toast = useToast()

    const isMobile = useMediaQuery({ query: '(max-width: 1080px)' });

    const handleChangeName = (event) => {
        const inputValue = event.target.value;
        setName(inputValue);
        validateName(inputValue);
    };

    const validateName = (value) => {
        if (!value) {
            setNameError('Name is required!');
        } else {
            setNameError('');
        }
    }

    const handleChangeEmail = (event) => {
        const inputValue = event.target.value;
        setEmail(inputValue);
        validateEmail(inputValue);
    };

    //Regex reference: https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s01.html
    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
            setEmailError('Email is required!');
        } else if (!emailRegex.test(value)) {
            setEmailError('Invalid email address!');
        } else {
            setEmailError('');
        }
    };

    const handleChangeMessage = (event) => {
        const inputValue = event.target.value;
        setMessage(inputValue);
        validateMessage(inputValue);
    };

    const validateMessage = (value) => {
        if (!value) {
            setMessageError('Message is required!');
        } else {
            setMessageError('');
        }
    };

    const handleSubmit = () => {
        if (!nameError && !emailError && !messageError && name && email && message) {
            toast({
                title: 'Message sent',
                description: "We've received your message, you will hear back from us soon!",
                status: 'success',
                duration: 5000,
                isClosable: true,
                backgroundColor:"teal"
            })
        }
    };

    return (
        isMobile ?
            <Flex minH="90vh" backgroundColor="#000C66" direction="column" alignItems="center">
                <Text fontSize="2xl" color="white" fontWeight="medium" mt="16px">Contact Us</Text>

                {/* Form fold */}
                <Flex backgroundColor="#050A30" w="80%" minHeight="24vh" borderRadius="10px" justifyContent="center" mt="24px">
                    <VStack w="90%" gap="8px" mt="16px">
                        <FormControl isRequired isInvalid={nameError}>
                            <FormLabel color="white">Name</FormLabel>
                            <Input
                                type="text"
                                value={name}
                                onChange={handleChangeName}
                                placeholder="John Doe"
                                borderColor="white"
                                focusBorderColor="teal"
                                textColor="white"
                                required="true"
                            />
                            <FormErrorMessage color="white">{nameError}</FormErrorMessage>
                        </FormControl>
                        <FormControl isRequired isInvalid={emailError}>
                            <FormLabel color="white" mt="12px">Email</FormLabel>
                            <Input
                                type="email"
                                value={email}
                                onChange={handleChangeEmail}
                                placeholder="johndoe@email.com"
                                borderColor="white"
                                focusBorderColor="teal"
                                textColor="white"
                                required="true"
                            />
                            <FormErrorMessage color="white">{emailError}</FormErrorMessage>
                        </FormControl>
                        <FormControl isRequired isInvalid={messageError}>
                            <FormLabel color="white" mt="12px">Message</FormLabel>
                            <Input
                                type="text"
                                value={message}
                                onChange={handleChangeMessage}
                                placeholder="How can we help you"
                                borderColor="white"
                                focusBorderColor="teal"
                                textColor="white"
                                required="true"
                            />
                            <FormErrorMessage color="white">{messageError}</FormErrorMessage>
                        </FormControl>
                        {/* Submit */}
                        <Button fontWeight="medium" colorScheme="teal" variant="solid" fontSize="md" w="100%" mt="8px" mb="24px" onClick={handleSubmit}>Send</Button>
                    </VStack>
                </Flex>
                {/* Text fold */}
                <Text fontSize="md" color="white" mt="48px" w="90%" textAlign="center">We would like to hear from you. Let us know how we can help you in improving your experience!</Text>
                {/* Number and email */}

                <Flex mt="16px">
                    <Text fontSize="md" fontWeight="medium" color="white" mr="4px">Number: </Text>
                    <Text fontSize="md" color="white">+1 (902) 989-1xx2</Text>
                </Flex>
                <Flex mt="8px">
                    <Text fontSize="md" fontWeight="medium" color="white" mr="4px">Email: </Text>
                    <Text fontSize="md" color="white">tune.hub@gmail.com</Text>
                </Flex>

                {/* Socials */}
                <Flex justifyContent="center" gap="24px" mt="24px">
                    <button>
                        <img alt="tunehub" src={FacebookIcon} color="white" width="36px"></img>
                    </button>
                    <button>
                        <img alt="tunehub" src={InstaIcon} color="white" width="36px"></img>
                    </button>
                    <button>
                        <img alt="tunehub" src={TwitterIcon} color="white" width="36px"></img>
                    </button>
                </Flex>
            </Flex> :
            <Flex justifyContent="space-evenly" minH="90vh" backgroundColor="#000C66">
                {/* Text Fold */}
                <Flex width="40%" direction="column">
                    <Text fontSize="5xl" color="white" fontWeight="medium" mt="4px">Contact Us</Text>
                    <Text fontSize="md" color="white" mt="128px">We would like to hear from you. Let us know how we can help you in improving your experience!</Text>
                    {/* Number and email */}
                    <Flex justifyContent="space-between" mt="32px">
                        <Flex>
                            <Text fontSize="md" fontWeight="medium" color="white" mr="4px">Number: </Text>
                            <Text fontSize="md" color="white">+1 (902) 989-1xx2</Text>
                        </Flex>
                        <Flex>
                            <Text fontSize="md" fontWeight="medium" color="white" mr="4px">Email: </Text>
                            <Text fontSize="md" color="white">tune.hub@gmail.com</Text>
                        </Flex>
                    </Flex>
                    {/* Socials */}
                    <Flex justifyContent="center" gap="24px" mt="48px">
                        <button>
                            <img alt="tunehub" src={FacebookIcon} color="white" width="36px"></img>
                        </button>
                        <button>
                            <img alt="tunehub" src={InstaIcon} color="white" width="36px"></img>
                        </button>
                        <button>
                            <img alt="tunehub" src={TwitterIcon} color="white" width="36px"></img>
                        </button>
                    </Flex>
                </Flex>
                {/* Form fold */}
                <Flex width="40%" justifyContent="center" alignItems="center">
                    <Flex backgroundColor="#050A30" w="80%" minHeight="24vh" borderRadius="10px" justifyContent="center">
                        <VStack w="90%" gap="8px" mt="16px">
                            <FormControl isRequired isInvalid={nameError}>
                                <FormLabel color="white">Name</FormLabel>
                                <Input
                                    type="text"
                                    value={name}
                                    onChange={handleChangeName}
                                    placeholder="John Doe"
                                    borderColor="white"
                                    focusBorderColor="teal"
                                    textColor="white"
                                    required
                                />
                                <FormErrorMessage color="white">{nameError}</FormErrorMessage>
                            </FormControl>
                            <FormControl isRequired isInvalid={emailError}>
                                <FormLabel color="white" mt="12px">Email</FormLabel>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={handleChangeEmail}
                                    placeholder="johndoe@email.com"
                                    borderColor="white"
                                    focusBorderColor="teal"
                                    textColor="white"
                                    required
                                />
                                <FormErrorMessage color="white">{emailError}</FormErrorMessage>
                            </FormControl>
                            <FormControl isRequired isInvalid={messageError}>
                                <FormLabel color="white" mt="12px">Message</FormLabel>
                                <Input
                                    type="text"
                                    value={message}
                                    onChange={handleChangeMessage}
                                    placeholder="How can we help you"
                                    borderColor="white"
                                    focusBorderColor="teal"
                                    textColor="white"
                                    required
                                />
                                <FormErrorMessage color="white">{messageError}</FormErrorMessage>
                            </FormControl>
                            {/* Submit */}
                            <Button fontWeight="medium" colorScheme="teal" variant="solid" fontSize="md" w="100%" mt="8px" mb="24px" onClick={handleSubmit}>Send</Button>
                        </VStack>
                    </Flex>
                </Flex>
            </Flex>
    );
}

export default ContactUs;