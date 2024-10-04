// import { useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";
// import { QUESTION_TYPES } from "../features/questionTypes";
// import { actions } from "../features/forms";
// import { QUESTION_TYPE } from "../features/questionTypes";

// const EditQuestion = (props) => {
//     const question = props.question;
//     const params = useParams();

//     const formID = params.formID;

//     const [questionText, setQuestionText] = useState(question.text || '');
//     const [choiceText, setChoiceText] = useState('');
//     const [type, setType] = useState(question.type || QUESTION_TYPES[0].value);
//     const [choices, setChoices] = useState(question.options || []);
//     const dispatch = useDispatch();

//     const handleChoiceAdded = () => {
//         if (choiceText.trim() !== '') {
//             setChoices(prevChoices => [...prevChoices, choiceText]);
//             setChoiceText('');
//         }
//     }

//     const handleSaveQuestion = () => {
//         if (editMode){
//             const newQuestion = {
//                 id: question.id,
//                 formID: formID,
//                 text: questionText, 
//                 type: type
//             }
    
//             // if (type === 'multiple-choice') {
//                 if (type === QUESTION_TYPE.MULTIPLE_CHOICE.key) {
//                 newQuestion.options = choices
//             }
        
//             dispatch(actions.editQuestion(newQuestion));
            
//         } 
//         toggleEdit();
//     }
//     const handleDelete = () => {
//         const deletePayload = {
//             formID: formID,
//             questionID: question.id
//         }
//         dispatch(actions.deleteQuestion(deletePayload))
//     }

//     const handleRemoveOption = (indexToRemove) => {
//         setChoices(choices.filter((choise, index) => index !== indexToRemove))
//     }


//     return(
//         <div className="question">

//         <input
//             type="text"
//             value={questionText}
//             onChange={(e) => { setQuestionText(e.target.value) }}
//         />
//         {/* Egen component? */}
//         <div className="type-section">
//             <label>Type</label>
//             <select
//                 value={type}
//                 onChange={(e) => setType(e.target.value)}>
//                 {QUESTION_TYPE.map((questionType) => (
//                     <option key={questionType.key} value={questionType.key}>
//                         {questionType.label}
//                     </option>
//                 ))}

//             </select>
//         </div>

//         {type === QUESTION_TYPE.MULTIPLE_CHOICE.label && (
//             <div>
//                 {/* Egen component? */}
//                 <input
//                     type="text"
//                     value={choiceText}
//                     onChange={(e) => setChoiceText(e.target.value)}
//                     placeholder="option"
//                 />
//                 <button onClick={handleChoiceAdded}>Add choice</button>

//                 {choices.length !== 0 && (
//                     <div>
//                         <h3>Options</h3>
//                         <ul className="options-list">
//                             {choices.map((choice, index) => (
//                                 <li key={index}>{choice} <button onClick={() => handleRemoveOption(index)}>X</button></li>
//                             ))}
//                         </ul>
//                     </div>
//                 )}
//             </div>
//         )}
//                             <button onClick={toggleEdit}>Cancel</button>
//                             <button onClick={handleDelete} className="question-delete-button">Delete</button>
//     </div>
//     )
// }

// export default EditQuestion;