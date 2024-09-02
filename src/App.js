import "./style/App.css";
import React, { useState, useEffect } from "react";
import AnswerButton from "./components/answerButtons.js";
import Timer from "./components/timer.js";
import ResultRow from "./components/resultRow.js";

function App() {
  const [timer, setTimer] = useState(30);
  const [options, setOptions] = useState([]);
  const [dataJson, setDataJson] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [isItEnded, setIsItEnd] = useState(false);
  const [isDisable, setisDisable] = useState(false);
  const [timerSpeed, setTimerSpeed] = useState(1000);
  const [currentIndex, setcurrentIndex] = useState(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState([]);

  const resetTimer = () => {
    setisDisable(false);
    setTimer(30);
    setcurrentIndex(currentIndex + 1);
    if (currentIndex >= 10) {
      setIsItEnd(true);
    }
    if (currentIndex >= 9) {
      setTimerSpeed(0);
    }
  };
  const activateButtons = () => {
    setisDisable(true);
  };
  const decreaseTimer = () => {
    if (questions.length <= 0 && options.length <= 0) prepareQuestions();
    setTimer(timer - 1);
    if (timer <= 20) {
      activateButtons();
    }
    if (timer <= 0) {
      handleClick(-1);
      resetTimer();
    }
  };

  const handleClick = (e) => {
    setSelectedAnswerId((oldArray) => [...oldArray, e]);
    console.log(e);
    resetTimer();
  };

  const prepareQuestions = () => {
    if (questions.length <= 0 && options.length <= 0) {
      dataJson.map((item) => {
        setQuestions((oldArray) => [...oldArray, item?.body]);
        setOptions((oldArray) => [...oldArray, [...item?.body.split("\n")]]);
        if (questions.length > 10 && options.length > 0) {
          return;
        }
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts/?_limit=10"
        );
        const data = await response.json();
        setDataJson(data);
        prepareQuestions();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const renderedItems = options[currentIndex]?.map((item, index) => {
    //<div className="flex flex-col justify-center border-2">
    return (
      <AnswerButton
        clickEvent={handleClick}
        key={index}
        selectedID={options[currentIndex].indexOf(item)}
        isActive={isDisable}
        content={item}
      />
    );
    // </div>
  });

  const renderedResults = questions?.map((item, index) => {
    return (
      <ResultRow
        selectedOption={selectedAnswerId[index]}
        options={options[index]}
        key={index}
        question={item}
      />
    );
  });

  return (
    <>
      {!isItEnded && (
        <div className="flex-col flex items-center gap-8 min-w-[800px] border-2 border-red-400  ">
          <div>
            <Timer
              activateButtons={activateButtons}
              timerSpeed={timerSpeed}
              resetFunction={resetTimer}
              time={timer}
              setTime={decreaseTimer}
            />
          </div>
          <div className="border-2 border-blue-300 w-4/5 mx-auto rounded-md text-xl font-bold p-4 min-w-[600px]">
            {questions[currentIndex]}
          </div>
          <div className=" border-2 flex flex-col gap-y-2 w-1/2 ">
            {renderedItems}
          </div>
        </div>
      )}

      {isItEnded && (
        <div className="App w-full h-auto bg-white flex flex-col">
          <div className="flex flex-col border-2 border-blue-500 overflow-auto">
            {renderedResults}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
