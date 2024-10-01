import { useState } from 'react'

import './App.css'
import { useDispatch } from 'react-redux'
import { actions } from './features/forms.js';
import CreateQuestion from './components/CreateQuestion';
import FormView from './components/FormView.jsx';
import FormList from './components/FormList.jsx';

function App() {
  const ADD_QUESTION = 'add-question', VIEW_FORM = 'view-form', FORM_LIST = 'form-list'
  const [view, setView] = useState(VIEW_FORM);

  let content =  null

  

  switch (view) {
    case ADD_QUESTION:
      content = <CreateQuestion />
      break;

    case FORM_LIST:
      content = <FormList />
      break;

    case VIEW_FORM:
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
            <li onClick={() => setView(FORM_LIST)}>Forms</li>
            <li onClick={() => setView(VIEW_FORM)}>View Form</li>
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
