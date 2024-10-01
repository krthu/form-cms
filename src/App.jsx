import { useState } from 'react'

import './App.css'
import { useDispatch } from 'react-redux'
import { actions } from './features/questions';
import CreateQuestion from './components/CreateQuestion';
import FormView from './components/FormView.jsx';

function App() {

  return (
    <div>
      <FormView />
      <CreateQuestion />
    
    </div>
  )
}

export default App
