// Function to fetch artist information by ID
export const fetchArtistById = async (id) => {

    try {
        const response = await fetch(`https://tunehub-server.onrender.com/artist/${id}`);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching artist:', error);
        return null;
    }
};

export const getAllSongs = async () => {
    try {
        const response = await fetch('https://tunehub-server.onrender.com/songs');
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error fetching songs');
        return null;
    }

};

export const deleteSong = async (id) => {
    try {
        const deleteOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const response = await fetch(`https://tunehub-server.onrender.com/delete/song/${id}`, deleteOptions);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error fetching songs');
        return null;
    }
}

export const addSong = async (songData) => {
    try {
        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(songData)
        }

        const response = await fetch(`https://tunehub-server.onrender.com/add/song`, postOptions);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error while adding songs');
        return null;
    }
}

export const addArtist = async (artistData) => {
    try
    {
        const postOperations = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(artistData)
        }
        const response = await fetch('https://tunehub-server.onrender.com/artist/add', postOperations);
        const data = await response.json();
        return data;
    }
    catch(error)
    {
        console.error('Error while adding artist');
        return null;
    }
}

