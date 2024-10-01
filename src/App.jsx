import { useState } from 'react'

import './App.css'
import { useDispatch } from 'react-redux'
import { actions } from './features/questions';
import CreateQuestion from './components/CreateQuestion';

function App() {

  const dispatch = useDispatch();

  const handleNewQuestion = () => {
    dispatch(actions.addQuestion({text: "Det här är texten", type: 'text', options: [1, 2, 3]}))
  }



  return (
    <div>
      <CreateQuestion />
      <button onClick={handleNewQuestion}>Add</button>
    </div>
  )
}

export default App
