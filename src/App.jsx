import { useState } from 'react'

import './App.css'
import { useDispatch } from 'react-redux'
import { actions } from './features/questions';
import CreateQuestion from './components/CreateQuestion';
import FormView from './components/FormView.jsx';

function App() {
  const ADD_QUESTION = 'add-question', VIEWFORM = 'view-form'
  const [view, setView] = useState(VIEWFORM);

  let content =  null

  switch (view) {
    case ADD_QUESTION:
      content = <CreateQuestion />
      break;

    case VIEWFORM:
        content = <FormView />
    default:
      content = <FormView />
      break;
  }

  return (
    <div>
      <header>
        <nav>
          <ul>
            <li onClick={() => setView(ADD_QUESTION)}>Add question</li>
            <li onClick={() => setView(VIEWFORM)}>View Form</li>
          </ul>
        </nav>
      </header>
      <main>
        {content}
      </main>
    
    </div>
  )
}

export default App
