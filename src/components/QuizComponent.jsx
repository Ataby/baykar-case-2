import React, { useState, useEffect } from 'react';

const QuizComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isOptionClickable, setIsOptionClickable] = useState(false);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts') // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setQuestions(data.slice(0, 10)); // Take only the first 10 questions
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Timer logic and other handlers go here
  const moveToNextQuestion = () => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setIsOptionClickable(false);
        // Reset the timer for the next question
      } else {
        // Quiz finished, show results
      }
    };

    const handleAnswerClick = (index) => {
      setUserAnswers((prevAnswers) => [
        ...prevAnswers,
        { questionId: questions[currentQuestionIndex].id, answer: index }
      ]);
      moveToNextQuestion();
    };

    const showResults = () => {
      return (
        <div className="results-container">
          <h2 className="text-2xl font-bold">Quiz Results</h2>
          <table className="mt-4">
            <thead>
              <tr>
                <th>Question</th>
                <th>Your Answer</th>
              </tr>
            </thead>
            <tbody>
              {userAnswers.map((answer, index) => (
                <tr key={index}>
                  <td>{questions.find(q => q.id === answer.questionId).question}</td>
                  <td>{questions.find(q => q.id === answer.questionId).options[answer.answer]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };

  return (
    <div>
      {/* <div className="quiz-container p-6 max-w-xl mx-auto">
  <h2 className="text-xl font-bold">{questions[currentQuestionIndex].body}</h2>
  <ul className="mt-4">
    {questions[currentQuestionIndex].options.map((option, index) => (
      <li
        key={index}
        className={`p-4 rounded-lg border ${isOptionClickable ? 'hover:bg-blue-500' : 'cursor-not-allowed'} mt-2`}
        onClick={() => isOptionClickable && handleAnswerClick(index)}
      >
        {option}
      </li>
    ))}
  </ul>
</div> */}
SA
    </div>
  );
};

export default QuizComponent;
