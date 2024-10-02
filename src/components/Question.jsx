import { useState } from "react";
import { QUESTION_TYPES } from "../features/questionTypes";
import { useDispatch } from "react-redux";
import { actions } from "../features/forms";

const Question = (props) => {
    const question = props.question;
    const formID = props.formID;

    const [editMode, setEditMode] = useState(false)
    const [questionText, setQuestionText] = useState(question.text || '');
    const [choiceText, setChoiceText] = useState('');
    const [type, setType] = useState(question.type || QUESTION_TYPES[0].value);
    const [choices, setChoices] = useState(question.options || []);
    const dispatch = useDispatch();


    const toggleEdit = () => {
        setEditMode(!editMode);
    }

    const handleChoiceAdded = () => {
        if (choiceText.trim() !== '') {
            setChoices(prevChoices => [...prevChoices, choiceText]);
            setChoiceText('');
        }
    }

    const handleSaveQuestion = () => {
        if (editMode){
            const newQuestion = {
                id: question.id,
                formID: formID,
                text: questionText, 
                type: type
            }
    
            if (type === 'multiple-choice') {
                newQuestion.options = choices
            }
        
            dispatch(actions.editQuestion(newQuestion));
            
        } 
        toggleEdit();
        // // Check all values present
        // if (question.trim() === ''){
        //     return
        // }
        // if (type === 'multiple-choice' && choices.length === 0){
        //     return
        // }

    }
    const handleDelete = () => {
        const deletePayload = {
            formID: formID,
            questionID: question.id
        }
        dispatch(actions.deleteQuestion(deletePayload))
    }
    return (
        <div key={question.id}>
            {editMode ? (
                <div className="question">

                    <input
                        type="text"
                        value={questionText}
                        onChange={(e) => { setQuestionText(e.target.value) }}
                    />
                    {/* Egen component? */}
                    <div className="type-section">
                        <label>Type</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}>
                            {QUESTION_TYPES.map((questionType) => (
                                <option key={questionType.value} value={questionType.value}>
                                    {questionType.label}
                                </option>
                            ))}

                        </select>


                    </div>

                    {type === 'multiple-choice' && (
                        <div>
                            {/* Egen component? */}
                            <input
                                type="text"
                                value={choiceText}
                                onChange={(e) => setChoiceText(e.target.value)}
                                placeholder="option"
                            />
                            <button onClick={handleChoiceAdded}>Add choice</button>

                            {choices.length !== 0 && (
                                <div>
                                    <h3>Options</h3>
                                    <ul className="options-list">
                                        {choices.map((choice, index) => (
                                            <li key={index}>{choice}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                
                </div>

            ) : (
                <div className="question">
                    <h3>{question.text}</h3>
                    {question.type === 'text' && (
                        <input type="text"
                            placeholder="Svar"

                        />
                    )}
                    {question.type === 'multiple-choice' && (
                        <div className='options-container'>
                            {question.options.map((option, index) => (
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
            )}
            
            <button onClick={handleSaveQuestion}>{editMode ? "Save" : "Edit"}</button>
            {editMode && ( <button onClick={handleDelete}>Delete</button>)}
        </div>

    )
}

export default Question;