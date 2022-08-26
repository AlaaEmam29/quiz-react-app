import React from "react";
import { useGlobalContext } from "../Context/Context";

const Form = () => {
  const { quizSettings, handleSettings, handleSubmit, error } = useGlobalContext();
  return <>
    <div className="container">
     <div className=" quiz-small bg-light shadow p-3 rounded rounded-2">
      <h2>Online Quiz</h2>
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <label className="form-label">number of questions</label>
          <input name='amount' type="number" className="form-control" value={quizSettings.amount} onChange={handleSettings} min={1} max={50} />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select name="category" onChange={handleSettings} value={quizSettings.category} className="form-select">
            <option value='any'>Any Category</option>
            <option value='sports'>sports</option>
            <option value='history'>history</option>
            <option value='politics'>politics</option>
          </select>

        </div>
        <div className="mb-3">
          <label className="form-label">Select Difficulty</label>
          <select name='difficulty' onChange={handleSettings} value={quizSettings.difficulty} className="form-select">
            <option value='any'>Any Difficulty</option>
            <option value='easy'>easy</option>
            <option value='medium'>medium</option>
            <option value='hard'>hard</option>
          </select>

        </div>
        {error.show && <p className='text-danger'>{error.msg}</p>}
        <button className="btn btn-primary w-100 my-3">Start</button>
      </form>
    </div>
    </div>
  </>;
}
export default Form;