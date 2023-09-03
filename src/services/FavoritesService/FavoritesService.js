export const addToFavorites = async (userID, songID) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ songID: songID })
    }

    try {
        const response = await fetch(`https://tunehub-server.onrender.com/favorites/${userID}`, options);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding to favorites:', error);
        return null;
    }
};

export const deleteFromFavorites = async (userID, songID) => {
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ songID: songID })
    }

    try {
        const response = await fetch(`https://tunehub-server.onrender.com/favorites/${userID}`, options);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error removing from favorites:', error);
        return null;
    }
}

export const getFavorites = async (userID) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }

    try {
        const response = await fetch(`https://tunehub-server.onrender.com/favorites/${userID}`, options);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching favorites:', error);
        return null;
    }
}

export const isFavorite = async (userID, songID) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ songID: songID })
    }

    try {
        const response = await fetch(`https://tunehub-server.onrender.com/favorites/${userID}/isFav`, options);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error checking if favorites:', error);
        return null;
    }
}
