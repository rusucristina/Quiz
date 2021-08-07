import './App.css';
import Quiz from './components/Quiz';
import 'bootstrap/dist/css/bootstrap.css'
import React, { useState } from 'react';
function App() {
  const [selectedNumber, setSelectedNumber] = useState(10)
  const [selectedDifficulty, setSelectedDifficulty] = useState("medium")
  const [selectedType, setSelectedType] = useState("multiple")
  const [result, setResult] = useState([])
  const [counter, setCounter] = useState(0)
  const [finishGame, setFinishGame] = useState(false)
  const [place, setPlace] = useState([])
  const [questionNumber, setQuestionNumber] = useState([])
  const [number, setNumber] = useState(0)
  const [startGame, setStartGame] = useState(false)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  console.log(selectedAnswers)

  const handleNumber = (e) => {
    setSelectedNumber(e.target.value)
  }

  const handleDifficulty = (e) => {
    setSelectedDifficulty(e.target.value)
  }

  const handleType = (e) => {
    setSelectedType(e.target.value)
  }
  //Buton start
  const start = async () => {
    let response = await fetch(`https://opentdb.com/api.php?amount=${selectedNumber}&difficulty=${selectedDifficulty}&type=${selectedType}`)
    let result = await response.json();
    setResult(
      result.results.map((question) => ({
        ...question,
        answers: shuffleArray([
          ...question.incorrect_answers,
          question.correct_answer
        ])
      })))
    setCounter(0)
    setNumber(0)
    setStartGame(true)
    setFinishGame(false)
  }


  const shuffleArray = (array) =>
    [...array].sort(() => Math.random() - 0.5);
  //Buton finish
  const finishQuiz = () => {
    setFinishGame(true)
    setResult([])
    place.unshift(counter)
    questionNumber.unshift(selectedNumber)
    setNumber(0)
    setSelectedAnswers({})
  }


  const handleAnswer = (answer) => {
    let copyUserAnswers = { ...selectedAnswers }
    copyUserAnswers[number] = true
    if (result[number].correct_answer === answer) {
      setCounter(counter => counter + 1)

    }
    setSelectedAnswers(copyUserAnswers)

  }

  return (
    <>
      {/* Alegere*/}
      <div className="form-floating mt-5 mb-2 container d-flex justify-content-center">
        <select onChange={handleNumber} className="form-select" id="floatingSelect" aria-label="Floating label select example">
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
        <label htmfor="floatingSelect mt-5">How many questions?</label>
      </div>
      <div className="form-floating container d-flex justify-content-center">
        <select onChange={handleDifficulty} className="form-select" id="floatingSelect" aria-label="Floating label select example">
          <option value="easy">easy</option>
          <option value="medium">medium</option>
          <option value="hard">hard</option>
        </select>
        <label htmlfor="floatingSelect">Select Difficulty:</label>
      </div>
      <div className="form-floating mt-2 mb-2 container d-flex justify-content-center">
        <select onChange={handleType} type="text" className="form-select" id="floatingSelect" aria-label="Floating label select example">
          <option value="multiple">multiple choice</option>
          <option value="boolean">true/false</option>
        </select>
        <label htmlfor="floatingSelect">Select Type:</label>
      </div>
      {/* Buton start */}
      <div>
        <button
          type="button"
          className="btn btn-primary mt-2 mb-2 container d-flex justify-content-center"
          onClick={start}

        >Start Quiz</button>
        {startGame && !finishGame &&
          <Quiz
            result={result}
            key={result[number]}
            category={result[number].category}
            question={result[number].question}
            correctAnswer={result[number].correct_answer}
            setNumber={setNumber}
            number={number}
            setCounter={setCounter}
            answers={result[number].answers}
            setFinishGame={setFinishGame}
            setStartGame={setStartGame}
            setResult={setResult}
            handleAnswer={handleAnswer}
            userAnswered={selectedAnswers[number]}
          />
        }
        {/* Buton de finisare, rezultat */}
        <button type="button" className="btn btn-warning container d-flex justify-content-center" type="submit" onClick={finishQuiz}>Submit Game</button>
        <h5 className="container d-flex justify-content-center mt-2">Your result is {counter}/{selectedNumber}</h5>
      </div>
      {/* Tabel */}
      <h5 className="d-flex justify-content-center mt-5">Last 3 Results:</h5>
      <div className="container d-flex justify-content-center mt-2">
        <table className="table">
          <thead>
            <tr>
              <th className="table-primary" scope="col">Correct Answers</th>
              <th className="table-primary" scope="col">The Number of Questions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{place[0]}</td>
              <td>{questionNumber[0]}</td>
            </tr>
            <tr>
              <td>{place[1]}</td>
              <td>{questionNumber[1]}</td>
            </tr>
            <tr>
              <td>{place[2]}</td>
              <td>{questionNumber[2]}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;