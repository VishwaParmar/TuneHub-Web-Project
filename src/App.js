import {
  ChakraProvider,
  theme
} from '@chakra-ui/react';
import React from 'react';
import { Navigate, RouterProvider, createBrowserRouter, } from "react-router-dom";
import Login from './pages/Authentication/Login';
import Register from './pages/Registration/Register';
import ViewProfile from './pages/UserProfile/ViewProfile';
import ContactUs from './pages/ContactUs/ContactUs';
import AboutUs from './pages/ContactUs/AboutUs';
import FAQ from './pages/FAQ/FAQ';
import LandingPage from './pages/LandingPage/LandingPage';
import AdminPage from './pages/Admin/Admin';
import LayoutWithNav from './pages/Layout/LayoutWithNav';
import LayoutWithoutNav from './pages/Layout/LayoutWithoutNav';
import Quiz from './pages/Trivia/quiz';
import Leaderboard from './pages/Trivia/Leaderboard';
import SpotifyContainer from './pages/SpotifyIntegration/SpotifyContainer';
import SpotifyTopSongs from './pages/SpotifyIntegration/SpotifyTopSongs';
import SpotifyArtists from './pages/SpotifyIntegration/SpotifyArtists';
import SpotifyRecentlyPlayed from './pages/SpotifyIntegration/SpotifyRecentlyPlayed';
import SongForm from './pages/Admin/SongForm';
import ArtistForm from './pages/Admin/ArtistForm';
import SearchSong from './pages/Search/SearchSong';
import SearchArtist from './pages/Search/SearchArtist';
import ChangePassword from './pages/Authentication/ChangePassword';
import MyFavorites from './pages/Favorites/MyFavorites';
import SongPage from './pages/Song/SongPage';
import AddReview from './pages/Song/AddReview';
import { isAuthenticated } from './services/AuthenticationServices/AuthenticationServices';

const router = createBrowserRouter([
  {
    element: <LayoutWithNav />,
    children: [
      {
        path: "/",
        element: <LandingPage />
      },
      {
        path: "/faq",
        element: <FAQ />
      },
      {
        path: "/about-us",
        element: <AboutUs />
      },
      {
        path: "/contact-us",
        element: <ContactUs />
      },
      {
        path:"/trivia",
        element: isAuthenticated() ? <Quiz/> :<Navigate to="/user/login"/>
      },
      {
        path: "/leaderboard",
        element: isAuthenticated() ? <Leaderboard /> : <Navigate to="/user/login"/>
      },
      {
        path: "/user/profile",
        element: isAuthenticated() ? <ViewProfile /> : <Navigate to="/user/login"/>
      },
      {
        path: "/spotify",
        element: <SpotifyContainer />
      },
      {
        path: "/spotify/top-songs",
        element: <SpotifyTopSongs />
      },
      {
        path: "/spotify/top-artists",
        element: <SpotifyArtists />
      },
      {
        path: "/spotify/recently-played",
        element: <SpotifyRecentlyPlayed />
      },
      {
        path: "/admin",
        element: isAuthenticated() ? <AdminPage /> : <Navigate to="/user/login"/>
      },
      {
        path: "/admin/addSong",
        element: isAuthenticated() ? <SongForm /> : <Navigate to="/user/login"/>
      },
      {
        path: "/admin/addArtist",
        element: isAuthenticated() ? <ArtistForm /> : <Navigate to="/user/login"/>
      },
      {
        path: "/my-favorites",
        element: isAuthenticated() ? <MyFavorites /> : <Navigate to="/user/login"/>
      },
      {
        path: "/song/:songID",
        element: isAuthenticated() ? <SongPage /> : <Navigate to="/user/login"/>
      },
      {
        path: "/search/song",
        element : isAuthenticated() ? <SearchSong/> : <Navigate to="/user/login"/>
      },
      {
        path: "/song/:songID/add-review",
        element: isAuthenticated() ? <AddReview/> : <Navigate to="/user/login"/>
      },
      {
        path : "/search/artist",
        element : isAuthenticated() ? <SearchArtist/> : <Navigate to="/user/login"/>
      }
    ]
  },
  {
    element: <LayoutWithoutNav />,
    children: [
      {
        path: "/user/login",
        element: <Login />
      },
      {
        path: "/user/register",
        element: <Register />
      },
      {
        path: "/user/change-password",
        element: <ChangePassword />
      },

    ]
  }

]);

function App() {
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
