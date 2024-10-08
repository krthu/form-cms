import { useState } from "react";
import { QUESTION_TYPES } from "../features/questionTypes";
import { QUESTION_TYPE } from "../features/questionTypes";
import { useDispatch } from "react-redux";
import { actions } from "../features/forms";
import TextQuestion from "./TextQuestion";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion.jsx";
import EditQuestionTypeSection from "./EditQuestionTypeSection.jsx";

const Question = (props) => {
    const question = props.question;
    const formID = props.formID;

    const [editMode, setEditMode] = useState(false)
    const [questionText, setQuestionText] = useState(question.text || '');
    // const [choiceText, setChoiceText] = useState('');
    const [type, setType] = useState(question.type || QUESTION_TYPE.TEXT.key);
    const [choices, setChoices] = useState(question.options || []);



    const dispatch = useDispatch();


    const toggleEdit = () => {
        let mode = !editMode;
        
       if (mode){
        setDefaultState();
       }
        
        setEditMode(mode);
    }

    const setDefaultState = () => {
        setQuestionText(question.text || '')
        setChoices(question.options || []);
        setType(question.type || QUESTION_TYPE.TEXT.key)
    }

    // const handleChoiceAdded = () => {
    //     if (choiceText.trim() !== '') {
    //         setChoices(prevChoices => [...prevChoices, choiceText]);
    //         setChoiceText('');
    //     }
    // }

    const handleSaveQuestion = () => {
        if (editMode) {
            const newQuestion = {
                id: question.id,
                formID: formID,
                text: questionText,
                type: type
            }

            if (type === QUESTION_TYPE.MULTIPLE_CHOICE.key) {
                newQuestion.options = choices
            }

            dispatch(actions.editQuestion(newQuestion));

        }
        toggleEdit();
    }
    const handleDelete = () => {
        const deletePayload = {
            formID: formID,
            questionID: question.id
        }
        dispatch(actions.deleteQuestion(deletePayload))
    }

    const renderQuestion = () => {
        switch (type) {
            case QUESTION_TYPE.TEXT.key:
                return (
                    <TextQuestion
                        editMode={editMode}
                    />

                );
            case QUESTION_TYPE.MULTIPLE_CHOICE.key:
                return (
                    <MultipleChoiceQuestion
                        editMode={editMode}

                        choices={choices}
                        setChoices={setChoices}
                    />
                );

            default:
                return (
                    <div>Unknown question type!</div>
                )
        }
    }




    return (

        <div key={question.id} className="question">
            {editMode ? (
                <>
                    <input
                        type="text"
                        value={questionText}
                        onChange={(e) => { setQuestionText(e.target.value) }}
                    />
                    <EditQuestionTypeSection type={type} setType={setType} />
                </>
            ) : (
                <h3>{question.text}</h3>
            )}

            {renderQuestion()}



            <div className="button-container">
                <button onClick={handleSaveQuestion}>{editMode ? "Save" : "Edit"}</button>
                {editMode && (
                    <>
                        <button onClick={toggleEdit}>Cancel</button>
                        <button onClick={handleDelete} className="question-delete-button">Delete</button>
                    </>

                )}
            </div>
        </div>

    )
}

export default Question;