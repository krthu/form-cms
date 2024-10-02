import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { actions } from "../features/forms";


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
        <div>
            <h2>FormList</h2>
            <button onClick={handleCreateNewForm}>New Form</button>
            <input type="text" value={newFormInputValue} onChange={(e) => setNewFormInputValue(e.target.value)} />
            {forms && (
                <ul>
                    {forms.map((form) => (
                        <li key={form.formID} ><Link to={`forms/${form.formID}`}> {form.name} </Link></li>
                    ))}
                    
                </ul>
            
            )}


        </div>
    )
};

export default FormList;