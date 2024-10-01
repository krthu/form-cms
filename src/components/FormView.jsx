import { useSelector } from "react-redux";

const FormView = () => {

    const questions = useSelector(state => state.questions)



    return (
        <div>
            <h2>FormView</h2>

            {questions && (
                <div>
                    {questions.map((question) => (
                        <div key={question.id}>
                            <h3>{question.text}</h3>
                            {question.type === 'text' && (
                                <input type="text"
                                    
                                />
                            )}
                            {question.type === 'multiple-choice' && (
                                <div>
                                    {question.options.map(( option) => (
                                        <label>{option}
                                     <input 
                                        type="radio"
                                        name={question.id}
                                     />
                                     {option}   
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