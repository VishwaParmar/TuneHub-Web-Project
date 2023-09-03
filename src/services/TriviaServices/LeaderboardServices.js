// LeaderboardServices.js

export async function fetchLeaderboardData() {
    try {
      const response = await fetch('https://tunehub-server.onrender.com/leaderboard');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
      return [];
    }
  }
  
  export async function submitScore(userID, rightAnswerScore) {
    try {
      const response = await fetch('https://tunehub-server.onrender.com/leaderboard/edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: userID, rightAnswerScore: rightAnswerScore }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit score');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error submitting score:', error);
      return null;
    }
  }
  