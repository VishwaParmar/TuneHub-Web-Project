const fetchQuizQuestions = async () => {
    try {
      const response = await fetch("https://tunehub-server.onrender.com/trivia");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
      return [];
    }
  };
  
  export default fetchQuizQuestions;
  