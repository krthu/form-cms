import { useDispatch, useSelector } from "react-redux";
import './FormView.css'

import { Link, useParams } from "react-router-dom";
import Question from "./Question";
import { actions } from "../features/forms";

const FormView = () => {

    const forms = useSelector(state => state.forms)
    const params = useParams();
    const formID = params.formID
    const form = forms.find(f => f.formID === formID)
    const dispatch = useDispatch();

    if (!form){
        return(
            <div>Form not found</div>
        )
    }

    const handleAddQuestion = () => {
        const newQuestion = {
            formID: formID,
            text : 'Edit me!',
            type: 'text'
        }
        dispatch(actions.addQuestion(newQuestion));
    }



    return (
        <div>
            <h2>FormView</h2>
            
      
            
            <h3 className="form-name">{form.name}</h3>
  
            {form && (
                <div className="questions-container">


                    {form.questions.map((question) => (
                        <Question question={question} formID={formID} key={question.id}/>
   
                    ))}
                    
                </div>
            )}
            <button className="add-question-button" onClick={handleAddQuestion}>Add question</button>

        </div>
    )
}

export default FormView;