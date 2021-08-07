import React, { useState } from "react"
const Quiz = ({ question, result, category, answers, correctAnswer, setCounter, setNumber, number, setFinishGame, setResult, setStartGame, handleAnswer, userAnswered }) => {

    const next = () => {
        setNumber(number => number + 1)
    }
    const previous = () => {
        setNumber(number => number - 1)
    }
    console.log(userAnswered)
    return (
        <div className="container">
            <h5>Category: {category}</h5>
            <div > {question}</div>
            <ul className="mb-2">
                {answers?.map((answer, index) =>
                    <div className="mb-2">
                        <button
                            disabled={userAnswered}
                            onClick={() => handleAnswer(answer)}
                            key={index}
                            className="btn btn-outline-success">{answer}</button>
                    </div>
                )}
                <div className="d-flex flex-row">
                    {number > 0 &&
                        <button
                            className="btn btn-primary mt-2 mb-2 d-flex justify-content-start"
                            onClick={previous}
                        >Previous Question</button>}
                    {result.length - 1 > number &&
                        <button
                            className="btn btn-primary mt-2 mb-2 d-flex justify-content-end"
                            onClick={next}
                        >Next Question</button>}

                </div>
                <div className="btn btn-primary">
                    {
                        [...Array(result.length)].map((item, index) => (
                            <button
                                className={index === number ? "active" : ""}
                                key={index}
                                onClick={() => setNumber(index)}
                            >
                                {index + 1}
                            </button>
                        ))
                    }
                </div>
            </ul>
        </div>
    )
}
export default Quiz