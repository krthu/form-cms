import { useSelector } from "react-redux";
import './FormView.css'

import { Link, useParams } from "react-router-dom";
import Question from "./Question";

const FormView = () => {

    const forms = useSelector(state => state.forms)
    const params = useParams();
    const formID = params.formID
    const form = forms.find(f => f.formID === formID)

    if (!form){
        return(
            <div>Form not found</div>
        )
    }



    return (
        <div>
            <h2>FormView</h2>
            
            <Link to={`/forms/${formID}/add-question`}>Add Question</Link>
            <h3 className="form-name">{form.name}</h3>
  
            {form && (
                <div className="questions-container">


                    {form.questions.map((question) => (
                        <Question question={question} formID={formID}/>
   
                    ))}
                    
                </div>
            )}

        </div>
    )
}

export default FormView;