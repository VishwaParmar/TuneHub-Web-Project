import { Tab, TabList, Tabs } from '@chakra-ui/react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

function LeftSidePanel({ selectedTab }) {
  // Check if the screen is mobile or not
  const isMobile = useMediaQuery({ query: '(max-width: 1080px)' });

  return (
    // Conditional rendering based on the device screen width
    isMobile ? (
      <Tabs
        index={selectedTab}
        orientation="horizontal"
        backgroundColor="#050A30"
        w="100%"
        pr="0px"
        variant="unstyled"
        justifyContent="center"
      >
        <TabList  gap = "8px">
          {/* NavLink for the "Songs" tab */}
          <NavLink to="/admin">
            <Tab color="white" width="16vw" _selected={{ bg: 'teal', color: 'white', borderRadius: '4px' }}>
              Songs
            </Tab>
          </NavLink>
          {/* NavLink for the "Add Song" tab */}
          <NavLink to="/admin/addSong">
            <Tab color="white" width="16vw" _selected={{ bg: 'teal', color: 'white', borderRadius: '4px' }}>
              Add Song
            </Tab>
          </NavLink>
          <NavLink to = "/admin/addArtist">
            <Tab color="white" width="16vw" _selected={{ bg: 'teal', color: 'white', borderRadius: '4px' }}>
              Add Artist
            </Tab>
          </NavLink>
        </TabList>
      </Tabs>
    ) : (
      <Tabs
        index={selectedTab}
        orientation="vertical"
        backgroundColor="#050A30"
        h="100%"
        pt="12px"
        pr="0px"
        variant="unstyled"
        justifyContent="center"
      >
        <TabList gap="8px" mt="8px">
          {/* NavLink for the "Songs" tab */}
          <NavLink to="/admin">
            <Tab color="white" width="11vw" _selected={{ bg: 'teal', color: 'white', borderRadius: '4px' }}>
              Songs
            </Tab>
          </NavLink>
          {/* NavLink for the "Add Song" tab */}
          <NavLink to="/admin/addSong">
            <Tab color="white" width="11vw" _selected={{ bg: 'teal', color: 'white', borderRadius: '4px' }}>
              Add Song
            </Tab>
          </NavLink>
          <NavLink to = "/admin/addArtist">
            <Tab color="white" width="11vw" _selected={{ bg: 'teal', color: 'white', borderRadius: '4px' }}>
              Add Artist
            </Tab>
          </NavLink>
        </TabList>
      </Tabs>
    )
  );
}

export default LeftSidePanel;
