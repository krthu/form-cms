
import { useState } from "react";

const MultipleChoiceQuestion = ({ editMode, questionText, choices, setChoices }) => {

    const [choiceText, setChoiceText] = useState('');
    const handleChoiceAdded = () => {
        if (choiceText.trim() !== '') {
            setChoices(prevChoices => [...prevChoices, choiceText]);
            setChoiceText('');
        }
    }

    const handleRemoveOption = (indexToRemove) => {
        setChoices(choices.filter((choise, index) => index !== indexToRemove))
    }
    return (
        <>
            {editMode ? (
                <>
                    <div>
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
                                        <li key={index}>{choice} <button onClick={() => handleRemoveOption(index)}>X</button></li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    </>
                    ):(
                        <div className="options-list">
                      
                             
                            {choices.map((option, index) => (
                                <label key={index}>{option}
                                    <input
                                        type="radio"
                                        name={questionText}
                                    />

                                </label>
                            ))}
                    
                        </div>
            )}
        </>
    )
}

export default MultipleChoiceQuestion;