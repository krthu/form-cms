import { useState } from "react";
import { QUESTION_TYPES } from "../features/questionTypes";
import { useDispatch } from "react-redux";

import { actions } from "../features/forms";

const CreateQuestion = () => {
    const [question, setQuestion] = useState('');
    const [choiceText, setChoiceText] = useState('');
    const [type, setType] = useState(QUESTION_TYPES[0].value);
    const [choices, setChoices] = useState([]);

    const dispatch = useDispatch();


    const handleChoiceAdded = () => {
        if (choiceText.trim() !== '' ){
               setChoices(prevChoices => [...prevChoices, choiceText]);
               setChoiceText('');
        }
    }

    const handleSaveQuestion = () => {
        // kolla om alla värden är satta
        if (question.trim() === ''){
            return
        }
        if (type === 'multiple-choice' && choices.length === 0){
            return
        }
        const newQuestion = {
            text: question, 
            type: type
        }

        if (type === 'multiple-choice') {
            newQuestion.options = choices
        }

        dispatch(actions.addQuestion(newQuestion));

        setQuestion('');
        setType(QUESTION_TYPES[0].value);
        setChoiceText('');
        setChoices([]);

        // skapa frågan
        // spara till store

    }


    return(
        <div>
            <h2>Create Question</h2>  
            <div>
                <label>Question</label>
                <input 
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
            </div>
            <div>
                <label>Type</label>
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    >
                        {QUESTION_TYPES.map((questionType) => (
                            <option key={questionType.value} value={questionType.value}>
                                {questionType.label}
                            </option>
                        ))}

                </select>
            </div>   
            {type === 'multiple-choice' && (
                <div>

                    <label>Add choice:</label>
                    <input
                        type="text"
                        value={choiceText}
                        onChange={(e) => setChoiceText(e.target.value)}
                        />
                        <button onClick={handleChoiceAdded}>Add choice</button>

                        {choices.length !== 0 && (
                            <div>
                                <h3>Choices</h3>
                                <ul>
                                    {choices.map((choice, index) => (
                                        <li key={index}>{choice}</li>
                                    ))}
                                </ul>
                            </div>
                )}
                </div>
            )}    
            <button onClick={handleSaveQuestion}>Add</button>


        </div>
    )
}

export default CreateQuestion;