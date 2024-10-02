import { useDispatch, useSelector } from "react-redux";
import './FormView.css'

import { Link, useParams } from "react-router-dom";
import Question from "./Question";
import { actions } from "../features/forms";
import { useState } from "react";

const FormView = () => {

    const forms = useSelector(state => state.forms)
    const params = useParams();
    const formID = params.formID
    const form = forms.find(f => f.formID === formID)
    const dispatch = useDispatch();
    const [editForm, setEditForm] = useState(false)
    const [formNameInput, setFormNameInput] = useState(form.name)

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

    const toggleEditForm = () => {
        setEditForm(!editForm);
    }

    const handleBlur = () => {

        const payload = {formID: formID, name: formNameInput};
        dispatch(actions.editForm(payload));
        setFormNameInput(form.name);
        toggleEditForm();

    }

    return (
        <div>
            <h2>FormView</h2>
            
      
            {editForm ? (
                <>
                    <input type="text"
                        value={formNameInput}
                        onChange={(e) => {setFormNameInput(e.target.value)}}
                        autoFocus
                        onBlur={handleBlur}
                        className="form-name"
                    />

                </> 
            ):(
                <h3 className="form-name" onClick={toggleEditForm}>{form.name}</h3>
            )}
            
            {/* <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
            </label> */}

            
  
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