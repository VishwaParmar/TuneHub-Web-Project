import { Flex, AccordionIcon, AccordionPanel, AccordionItem, AccordionButton, Box, Accordion, Text } from '@chakra-ui/react';
import React from 'react';
import FAQs from '../../assets/faq.json';
import { useMediaQuery } from 'react-responsive';


function FAQ() {
    const isMobile = useMediaQuery({ query: '(max-width: 1080px)' });
    return (
        isMobile ?
            <Flex direction="column" w="100%" minHeight="90vh" backgroundColor="#000C66" alignItems="center" color="white">
                {/* Title */}
                <Text fontSize="xl" color="white" fontWeight="medium" mt="24px" mb="40px" ml="8px" mr="8px">Frequently Asked Questions</Text>
                {/* Expandable accordion */}
                <Accordion allowMultiple width="80%" >
                    {
                        FAQs.map((item, index) => (
                            <AccordionItem pt="8px" pb="8px">
                                <h2>
                                    <AccordionButton>
                                        <Box as="span" flex='1' textAlign='left' fontWeight="medium" fontSize="md">
                                            {item.question}
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    {item.answer}
                                </AccordionPanel>
                            </AccordionItem>
                        ))
                    }
                </Accordion>
            </Flex>
            :
            <Flex direction="column" w="100%" minHeight="90vh" backgroundColor="#000C66" alignItems="center" color="white">
                {/* Title */}
                <Text fontSize="5xl" color="white" fontWeight="medium" mt="32px" mb="64px">Frequently Asked Questions</Text>
                {/* Expandable accordion */}
                <Accordion allowMultiple width="1080px" >
                    {
                        FAQs.map((item, index) => (
                            <AccordionItem pt="8px" pb="8px">
                                <h2>
                                    <AccordionButton>
                                        <Box as="span" flex='1' textAlign='left' fontWeight="medium" fontSize="xl">
                                            {item.question}
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    {item.answer}
                                </AccordionPanel>
                            </AccordionItem>
                        ))
                    }
                </Accordion>
            </Flex>
    );
}

export default FAQ;