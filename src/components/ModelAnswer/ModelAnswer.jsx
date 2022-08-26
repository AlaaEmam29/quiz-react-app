import React from "react";
import { useGlobalContext } from "../Context/Context";

const ModelAnswer = () => {
  const { handlePlayAgain, questions, correctAnswer } = useGlobalContext();
  const presentAnswer = (correctAnswer / questions.length)* 100;
  let words = "";

  if (presentAnswer <= 100 && presentAnswer >= 60) {
    words = "congrats , You are a genius !!";
  }
  else if (presentAnswer < 60 && presentAnswer >= 40) {
    words = "good";
  }
  else if (presentAnswer < 40 && presentAnswer >= 20) {
    words = "bad";
  }
  else if (presentAnswer < 20 && presentAnswer >= 0) {
    words = "very bad";
  }

  return <div className="wrapper">
    <div className="model bg-light shadow rounded rounded-2">
      <h2>{words}</h2>
      <p>You answered {presentAnswer} % of questions correctly</p>
      <button className="btn btn-warning" onClick={handlePlayAgain}>play again</button>
    </div>
  </div>;
}
export default ModelAnswer;
