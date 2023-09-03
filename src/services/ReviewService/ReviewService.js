export const getReviews = async (songID) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }

    try {
        const response = await fetch(`https://tunehub-server.onrender.com/review/reviews/${songID}`, options);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return null;
    }
}

export const deleteReview = async (songID, review) => {
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({review})
    }

    try {
        const response = await fetch(`https://tunehub-server.onrender.com/review/delete/${songID}`, options);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error removing review:', error);
        return null;
    }
}

export const addReview = async (songID, review) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(review)
    }

    try {
        const response = await fetch(`https://tunehub-server.onrender.com/review/add/${songID}`, options);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding review:', error);
        return null;
    }
};

export const editReview = async (songID, review) => {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ review })
    }

    try {
        const response = await fetch(`https://tunehub-server.onrender.com/review/edit/${songID}`, options);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error editing review:', error);
        return null;
    }
};