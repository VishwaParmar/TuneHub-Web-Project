import React, { useState, useEffect } from 'react';
import SpotifyProfile from './SpotifyProfile';
import SpotifyLogin from './SpotifyLogin';
import { token } from '../../spotify-integration/SpotifyIntegration';

function SpotifyContainer() {

    const [accessToken, setAccessToken] = useState('');

    useEffect(() => {
        setAccessToken(token);
    }, []);

    return (
        <>
            {accessToken ? <SpotifyProfile /> : <SpotifyLogin />}
        </>
    );
}

export default SpotifyContainer;