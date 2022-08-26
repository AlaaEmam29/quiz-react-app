import React from "react";
import { useGlobalContext } from "../Context/Context";
import Form from "../Form/Form";
import Loading from "../Loading/Loading";
import ModelAnswer from "../ModelAnswer/ModelAnswer";

const App = () => {
  const { isLoading, waitingForm, handleCheckAnswer, handleNextQuestion,
    questions, index, correctAnswer, isModalOpen, error } = useGlobalContext();
  if (isLoading) {
    return <Loading />
  }
  if (waitingForm) {
    return <Form />;
  }
  const { question, correct_answer, incorrect_answers } = questions[index];
  const answers = [correct_answer, ...incorrect_answers];
  const shuffledAnswers = answers.sort(() => Math.random() - 0.5);
console.log(error);
  return <>
    <div className="container text-center  py-5">
      {isModalOpen && <ModelAnswer />}
      <div className="quiz quiz-large shadow p-4 rounded bg-light rounded-2">
        <p className='quiz-correct text-success text-end'>correct answers: {correctAnswer} / {index}</p>
        <article>
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className="quiz-answers mt-4 d-flex flex-column">
            {shuffledAnswers.map((answer, index) => {
              return <button key={index} className="btn btn-primary btn-lg mb-3"
                onClick={() => handleCheckAnswer(correct_answer === answer)}
                dangerouslySetInnerHTML={{ __html: answer }} />
            }
            )}
          </div>
          <div className="btn-next mt-1 text-end">
            <button className="btn btn-warning " onClick={handleNextQuestion}>
              next question
            </button>
          </div>
        </article>
      </div>
    </div>
  </>;
}
export default App;