import { getHashParams } from './utils';

const EXPIRATION_TIME = 3600 * 1000; // 3600 seconds * 1000 = 1 hour in milliseconds

const setTokenTimestamp = () => window.localStorage.setItem('spotify_token_timestamp', Date.now());
const setLocalAccessToken = token => {
  setTokenTimestamp();
  window.localStorage.setItem('spotify_access_token', token);
};
const setLocalRefreshToken = token => window.localStorage.setItem('spotify_refresh_token', token);
const getTokenTimestamp = () => window.localStorage.getItem('spotify_token_timestamp');
const getLocalAccessToken = () => window.localStorage.getItem('spotify_access_token');
const getLocalRefreshToken = () => window.localStorage.getItem('spotify_refresh_token');

// Refresh the token
const refreshAccessToken = async () => {
  try {
    const response = await fetch(`https://tunehub-server.onrender.com/spotify/refresh_token?refresh_token=${getLocalRefreshToken()}`);
    const data = await response.json();
    const { access_token } = data;
    setLocalAccessToken(access_token);
    window.location.reload();
    return;
  } catch (e) {
    console.error(e);
  }
};

// Get access token off of query params (called on application init)
export const getAccessToken = () => {
  const { error, access_token, refresh_token } = getHashParams();

  if (error) {
    console.error(error);
    refreshAccessToken();
  }

  // If token has expired
  if (Date.now() - getTokenTimestamp() > EXPIRATION_TIME) {
    console.warn('Access token has expired, refreshing...');
    refreshAccessToken();
  }

  const localAccessToken = getLocalAccessToken();

  // If there is no ACCESS token in local storage, set it and return `access_token` from params
  if ((!localAccessToken || localAccessToken === 'undefined') && access_token) {
    setLocalAccessToken(access_token);
    setLocalRefreshToken(refresh_token);
    return access_token;
  }

  return localAccessToken;
};

export const token = getAccessToken();

export const logout = () => {
  window.localStorage.removeItem('spotify_token_timestamp');
  window.localStorage.removeItem('spotify_access_token');
  window.localStorage.removeItem('spotify_refresh_token');
  window.location.reload();
};

// Helper function to create headers with the access token
const getHeadersWithToken = () => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
});

/**
 * Use fetch for API calls
 */
const fetchData = async (url, options) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    return await response.json();
  } catch (e) {
    console.error(e);
  }
};

/**
 * Get Current User's Profile
 * https://developer.spotify.com/documentation/web-api/reference/users-profile/get-current-users-profile/
 */
export const getUser = () => fetchData('https://api.spotify.com/v1/me', {
  headers: getHeadersWithToken(),
});

/**
 * Get User's Followed Artists
 * https://developer.spotify.com/documentation/web-api/reference/follow/get-followed/
 */
export const getFollowing = () => fetchData('https://api.spotify.com/v1/me/following?type=artist', {
  headers: getHeadersWithToken(),
});


/**
 * Get Current User's Recently Played Tracks
 * https://developer.spotify.com/documentation/web-api/reference/player/get-recently-played/
 */
export const getRecentlyPlayed = () => fetchData('https://api.spotify.com/v1/me/player/recently-played', {
  headers: getHeadersWithToken(),
});

/**
 * Get a List of Current User's Playlists
 * https://developer.spotify.com/documentation/web-api/reference/playlists/get-a-list-of-current-users-playlists/
 */
export const getPlaylists = () => fetchData('https://api.spotify.com/v1/me/playlists', {
  headers: getHeadersWithToken(),
});

/**
 * Get a User's Top Artists
 * https://developer.spotify.com/documentation/web-api/reference/personalization/get-users-top-artists-and-tracks/
 */
export const getTopArtistsShort = () => fetchData('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=short_term', {
  headers: getHeadersWithToken(),
});
export const getTopArtistsMedium = () => fetchData('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term', {
  headers: getHeadersWithToken(),
});
export const getTopArtistsLong = () => fetchData('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term', {
  headers: getHeadersWithToken(),
});

/**
 * Get a User's Top Tracks
 * https://developer.spotify.com/documentation/web-api/reference/personalization/get-users-top-artists-and-tracks/
 */
export const getTopTracksShort = () => fetchData('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term', {
  headers: getHeadersWithToken(),
});
export const getTopTracksMedium = () => fetchData('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term', {
  headers: getHeadersWithToken(),
});
export const getTopTracksLong = () => fetchData('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term', {
  headers: getHeadersWithToken(),
});

/**
 * Get an Artist
 * https://developer.spotify.com/documentation/web-api/reference/artists/get-artist/
 */
export const getArtist = artistId =>
  fetchData(`https://api.spotify.com/v1/artists/${artistId}`, {
    headers: getHeadersWithToken(),
  });


/**
 * Get a Playlist
 * https://developer.spotify.com/documentation/web-api/reference/playlists/get-playlist/
 */
export const getPlaylist = playlistId =>
  fetchData(`https://api.spotify.com/v1/playlists/${playlistId}`, {
    headers: getHeadersWithToken(),
  });

/**
 * Get a Playlist's Tracks
 * https://developer.spotify.com/documentation/web-api/reference/playlists/get-playlists-tracks/
 */
export const getPlaylistTracks = playlistId =>
  fetchData(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    headers: getHeadersWithToken(),
  });


/**
 * Get a Track
 * https://developer.spotify.com/documentation/web-api/reference/tracks/get-track/
 */
export const getTrack = trackId =>
  fetchData(`https://api.spotify.com/v1/tracks/${trackId}`, {
    headers: getHeadersWithToken(),
  });

export const getUserInfo = async () => {
  try {
    const [userData, followedArtistsData, playlistsData, topArtistsData, topTracksData] = await Promise.all([
      getUser(),
      getFollowing(),
      getPlaylists(),
      getTopArtistsLong(),
      getTopTracksLong()
    ]);

    return {
      user: userData,
      followedArtists: followedArtistsData,
      playlists: playlistsData,
      topArtists: topArtistsData,
      topTracks: topTracksData,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
