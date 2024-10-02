import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { actions } from "../features/forms";
import './FormList.css'


const FormList = () => {
    const forms = useSelector(state => state.forms)
    const [newFormInputValue, setNewFormInputValue] = useState('');
    const dispatch = useDispatch();

    const handleCreateNewForm = () => {
        if (newFormInputValue.trim() === ''){
            return
        }
        dispatch(actions.addForm(newFormInputValue));
    }



    return(
        <div className="form-list-container">
                  <h2>FormList</h2>
            <div className="add-form-container">
      
            <input  type="text" value={newFormInputValue} onChange={(e) => setNewFormInputValue(e.target.value)} />
                <button onClick={handleCreateNewForm}>New Form</button>
            </div>
            
            {forms && (
                <ul className="form-list">
                    {forms.map((form) => (
                        <Link to={`forms/${form.formID}`} key={form.formID}><li  className="form-list-item" > {form.name} </li></Link>
                    ))}
                    
                </ul>
            
            )}


        </div>
    )
};

export default FormList;