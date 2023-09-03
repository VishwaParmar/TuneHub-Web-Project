const Song = require('../models/songModel.js');
const Review = require('../models/reviewModel.js');
const { v4: uuidv4 } = require('uuid');

// Function to add a review for a specific song
exports.addReview = async (req, res) => {
    const songId = req.params.id;
    const review = req.body;

    // Checking for invalid or empty input data
    if (review.comment === null || review.rating === null || review.userName === null || songId === null) {
        return res.status(422).json({ error: "Invalid or empty input data" });
    }
    try {
        // Find the song to which the review is to be added
        const songToAddReview = await Song.findOne({ id: songId });
        if (songToAddReview === null) {
            return res.status(404).json({ error: "Song not found" });
        }

        // Generate a new ID for the review using uuidv4
        const newId = uuidv4();

        // Create a new Review object and push it to the song's reviews array
        const newReview = new Review({
            reviewId: newId,
            ...review
        })
        songToAddReview.reviews.push(newReview);

        // Save the updated song with the new review
        await songToAddReview.save();

        // Return a success message along with the added review data
        return res.status(200).json({ message: "The review has been added successfully", AddedReview: review });
    } catch (error) {
        // Handling errors and returning a 500 status with an error message
        return res.status(500).json({ error: "Failed to add the review" });
    }
};

// Function to edit a review for a specific song
exports.editReview = async (req, res) => {
    const songId = req.params.id;
    const review = req.body;
    let flag = false;

    // Checking for invalid or empty input data
    if (review.comment === null || review.rating === null || review.reviewId === null ||
        review.userName === null || songId === null) {
        return res.status(422).json({ error: "Invalid or empty input data" });
    }

    try {
        // Find the song to which the review is to be edited
        const songToUpdateReview = await Song.findOne({ id: songId });
        if (songToUpdateReview === null) {
            return res.status(404).json({ error: "Song not found" });
        }

        // Map through the reviews and update the one with matching reviewId
        const updatedReviews = songToUpdateReview.reviews.map(item => {
            if (item.reviewId === review.reviewId) {
                flag = true;
                return review;
            }
            return item;
        });

        if(flag === false)
        {
            return res.status(422).json({ error: "No review with the given review idea exist" });   
        }
        // Update the song's reviews with the edited review
        songToUpdateReview.reviews = updatedReviews;

        // Save the updated song with the edited review
        await songToUpdateReview.save();

        // Return a success message along with the edited review data
        return res.status(200).json({ message: "The review has been edited successfully", EditedReview: review });
    } catch (error) {
        // Handling errors and returning a 500 status with an error message
        return res.status(500).json({ error: "Failed to edit the review" });
    }
};

// Function to remove a review for a specific song
exports.removeReview = async (req, res) => {
    const songId = req.params.id;
    const review = req.body;

    // Checking for invalid or empty input data
    if (review.reviewId === null || songId === null) {
        return res.status(422).json({ error: "Invalid or empty input data" });
    }

    try {
        // Find the song from which the review is to be removed
        const songToRemoveReview = await Song.findOne({ id: songId });
    
        if (songToRemoveReview === null || songToRemoveReview === undefined) {
            return res.status(404).json({ error: "Song not found" });
        }

        // Filter out the review to be removed from the song's reviews array
        const updatedReviews = songToRemoveReview.reviews.filter(item => item.reviewId !== review.reviewId);
        
        if(updatedReviews.length === songToRemoveReview.reviews.length)
        {
            console.log(updatedReviews.length);
        console.log(songToRemoveReview.reviews.length);
            return res.status(422).json({error: "No such review is present in the database"});
        }
        
        songToRemoveReview.reviews = updatedReviews;

        // Save the updated song with the removed review
        await songToRemoveReview.save();

        // Return a success message along with the removed review data
        return res.status(200).json({ message: "The review has been deleted successfully", DeletedReview: review });
    } catch (error) {
        // Handling errors and returning a 500 status with an error message
        return res.status(500).json({ error: "Failed to delete the review" });
    }
};

// Function to get all reviews for a specific song
exports.getReviews = async (req, res) => {
    const songId = req.params.id;

    // Checking for invalid or empty input data
    if (songId === null) {
        return res.status(422).json({ error: "Invalid or empty input data" });
    }

    try {
        // Find the song for which the reviews are to be retrieved
        const songToGetReviews = await Song.findOne({ id: songId });
        if (!songToGetReviews) {
            return res.status(404).json({ error: "Song not found" });
        }

        // Return the reviews for the specified song
        return res.status(200).json(songToGetReviews.reviews);
    } catch (error) {
        // Handling errors and returning a 500 status with an error message
        return res.status(500).json({ error: "Failed to get the reviews" });
    }
};

