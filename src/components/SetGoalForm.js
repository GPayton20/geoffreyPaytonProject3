import { useState } from 'react';

const SetGoalForm = ({ currentGoal, onSubmit }) => {

  const [goalInput, setGoalInput] = useState(currentGoal); 

  const handleGoalInputChange = event => setGoalInput(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(goalInput);    
  }

  return (
      <form action="submit" className="set-goal-form" onSubmit={handleSubmit}>
      <h2>How many books do you want to read?</h2>
        <input 
          type="number" 
          min="1" 
          max="100"
          step="1" 
          value={goalInput}
          onChange={handleGoalInputChange}/>
        <button>Set goal</button>
      </form>
  )
}

export default SetGoalForm;