import { Flex, Grid, GridItem, Heading, Image, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import * as React from "react";
import { useMediaQuery } from "react-responsive";
import image1 from '../../assets/image1.svg';
import image2 from '../../assets/image2.svg';
import image3 from '../../assets/image3.svg';
import image4 from '../../assets/image4.svg';

function AboutUs() {
    const isMobile = useMediaQuery({ query: '(max-width: 1080px)' });
    return (
        isMobile ?
            <Flex justifyContent="start" alignItems="center" minH="100vh" backgroundColor="#000C66" direction="column">
                <Heading as="h1" size="2xl" fontWeight="medium" ml="30px" mt="32px" mb="64px" color="white">
                    About Us
                </Heading>
                <Grid templateColumns="repeat(1, 1fr)" gap={6} placeItems="center" ml="30px" mr="20px" color="white">
                    <GridItem colSpan={1} align="center">
                        <Image src={image1} height="60%" width="60%" />
                    </GridItem>
                    <GridItem colSpan={1} mb="40px">
                        <Heading size="lg" mb="10px" align="center"> OUR MISSION </Heading>
                        <Text align="center"> We aim to bring you the best music according to your taste and help you find what you've always been looking for
                        </Text>
                    </GridItem>
                    <GridItem colSpan={1} align="center">
                        <Image src={image2} height="60%" width="60%" />
                    </GridItem>
                    <GridItem colSpan={1} mb="40px">
                        <Heading size="lg" mb="10px" align="center"> OUR JOURNEY </Heading>
                        <Text align="center"> Our Team has come a long way by researching and bridging the gap between music available and you.
                        </Text>
                    </GridItem>
                    <GridItem colSpan={1} align="center">
                        <Image src={image4} height="60%" width="60%" />
                    </GridItem>
                    <GridItem colSpan={1} mb="40px">
                        <Heading size="lg" mb="10px" align="center"> OUR SERVICES </Heading>
                        <Text align="center"> We recommend, we help you search, we help you integrate with spottify and mainly, we help you find your music.
                        </Text>
                    </GridItem>
                    <GridItem colSpan={1} align="center">
                        <Image src={image3} height="60%" width="60%" />
                    </GridItem>
                    <GridItem colSpan={1} mb="40px">
                        <Heading size="lg" mb="10px" align="center"> OUR TEAM </Heading>
                        <UnorderedList styleType="none" align="center" spacing="4px">
                            <ListItem>Harsh: Project Manager</ListItem>
                            <ListItem>Dev: Web Designer</ListItem>
                            <ListItem>Kainat: Security Specialist</ListItem>
                            <ListItem>Preeti: Database Administrator</ListItem>
                            <ListItem>Vishwa: DevOps Engineer</ListItem>
                        </UnorderedList>
                    </GridItem>
                </Grid>
            </Flex>
            :
            <Flex justifyContent="start" alignItems="center" minH="90vh" backgroundColor="#000C66" direction="column">
                <Text as="h1" fontSize="5xl" fontWeight="medium" ml="30px" mt="32px" mb="64px" color="white">
                    About Us
                </Text>
                <Grid templateColumns="repeat(4, 1fr)" gap={6} placeItems="center" ml="30px" mr="20px" color="white">
                    <GridItem colSpan={1}>
                        <Heading size="lg" mb="10px"> OUR MISSION </Heading>
                        <Text> We aim to bring you the best music according to your taste and help you find what you've always been looking for
                        </Text>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Image src={image1} height="70%" width="70%" />

                    </GridItem>
                    <GridItem colSpan={1}>
                        <Heading size="lg" mb="10px"> OUR JOURNEY </Heading>
                        <Text> Our Team has come a long way by researching and bridging the gap between music available and you.
                        </Text>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Image src={image2} height="70%" width="70%" />

                    </GridItem>
                    <GridItem colSpan={1}>
                        <Image src={image4} height="70%" width="70%" />

                    </GridItem>
                    <GridItem colSpan={1}>
                        <Heading size="lg" mb="10px"> OUR SERVICES </Heading>
                        <Text> We recommend, we help you search, we help you integrate with spottify and mainly, we help you find your music.
                        </Text>

                    </GridItem>
                    <GridItem colSpan={1}>
                        <Image src={image3} height="70%" width="70%" />

                    </GridItem>
                    <GridItem colSpan={1} >
                        <Heading size="lg" mb="10px" > OUR TEAM </Heading>
                        <UnorderedList styleType="none" spacing="4px">
                            <ListItem>Harsh: Project Manager</ListItem>
                            <ListItem>Dev: Web Designer</ListItem>
                            <ListItem>Kainat: Security Specialist</ListItem>
                            <ListItem>Preeti: Database Administrator</ListItem>
                            <ListItem>Vishwa: DevOps Engineer</ListItem>
                        </UnorderedList>

                    </GridItem>
                </Grid>
            </Flex>

    );
}

export default AboutUs;