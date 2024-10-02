import { useState } from 'react'

import './App.css'
import { useDispatch } from 'react-redux'
import { actions } from './features/forms.js';
import CreateQuestion from './components/CreateQuestion';
import FormView from './components/FormView.jsx';
import FormList from './components/FormList.jsx';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  // const ADD_QUESTION = 'add-question', VIEW_FORM = 'view-form', FORM_LIST = 'form-list'
  // const [view, setView] = useState(VIEW_FORM);
  // const [selectedForm, setSelectedForm] = useState(null);
  

  // let content =  null

  // const handleViewChange = (newView) => {
    
  //   setView(newView);

  // }


 



  // switch (view) {
  //   case ADD_QUESTION:
  //     content = <CreateQuestion />
  //     break;

  //   case FORM_LIST:
  //     content = <FormList />
  //     break;

  //   case VIEW_FORM:
  //       content = <FormView />


  //   default:
  //     content = <FormView />
  //     break;
  // }

  return (
    <div className='container'>
      <header>
        <nav>
          <ul>
            {/* <li onClick={() => setView(ADD_QUESTION)}>Add question</li>
            <li onClick={() => setView(FORM_LIST)}>Forms</li>
            <li onClick={() => setView(VIEW_FORM)}>View Form</li> */}
            {/* <li><Link to={'add-question'}>Add question</Link> </li> */}
            <li><Link to={'/'}>Forms</Link></li>
            {/* <li>View Form</li> */}
          </ul>
        </nav>
      </header>
      <main>
        {/* {content} */}
        <Routes>
          <Route path="/" element={<FormList />}/>
          <Route path="/forms/:formID" element={<FormView />}/>
          <Route path="/forms/:formID/add-question" element={<CreateQuestion />} />

          {/* Default route för att hantera 404 */}
          <Route path="*" element={<FormList />} />
        </Routes>
      </main>
    
    </div>
  )
}

export default App
