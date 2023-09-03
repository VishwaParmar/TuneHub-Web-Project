const Leaderboard = require('../models/leaderboardModel');

// Function to get the leaderboard in descending order of score
async function getLeaderboard(req, res) {
  try {
    const leaderboardData = await Leaderboard.find({}).sort({ score: -1 });
    res.json(leaderboardData);
  } catch (error) {
    console.error('Error fetching Leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch Leaderboard' });
  }
}

// Function to update a user's score based on the right answer given
async function editLeaderboard(req, res) {
    try {
      const { id, rightAnswerScore } = req.body;
  
      // Assuming the userId and rightAnswerScore are received in the request body
      // You can use this data to update the user's score accordingly in your database
      // For example, you could add the rightAnswerScore to the user's current score.
  
      // Update the user's score in the database using updateOne
      await Leaderboard.updateOne({ id: id }, { $inc: { score: rightAnswerScore } });

  
      // Send a response indicating success
      res.json({ message: 'User score updated successfully' });
    } catch (error) {
      console.error('Error updating user score:', error);
      res.status(500).json({ error: 'Failed to update user score' });
    }
  }
  

module.exports = {
  getLeaderboard,
  editLeaderboard,
};
