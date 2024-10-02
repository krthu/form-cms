import { useSelector } from "react-redux";

import { Link, useParams } from "react-router-dom";

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
            
            {form && (
                <div>
                    <h4>Questions</h4>
                    {form.questions.map((question) => (
                        <div key={question.id}>
                            <h3>{question.text}</h3>
                            {question.type === 'text' && (
                                <input type="text"
                                    
                                />
                            )}
                            {question.type === 'multiple-choice' && (
                                <div>
                                    {question.options.map(( option, index) => (
                                    <label key={index}>{option}
                                        <input 
                                            type="radio"
                                            name={question.id}
                                        />
                                     
                                     </label>
                                    ))}
                                </div>
                                
                                )}
                        
                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}

export default FormView;