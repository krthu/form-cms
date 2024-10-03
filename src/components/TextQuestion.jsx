import { QUESTION_TYPE } from "../features/questionTypes";
import EditQuestionTypeSection from "./EditQuestionTypeSection";

const TextQuestion = ({editMode, questionText, setQuestionText, type, setType}) => {




    return (
        <>
         {/* <div className="question"> */}
            {editMode ? (
                <>
                    {/* <input
                        type="text"
                        value={questionText}
                        onChange={(e) => {setQuestionText(e.target.value) }}
                    /> */}
                    {/* <EditQuestionTypeSection type={type} setType={setType}/> */}

                </>
            ) : (

                <>
                    {/* <h3>{questionText}</h3> */}
              
              
                        <input type="text"
                            placeholder="Svar"

                        />
              

                </>
            )}


         {/* </div> */}
        </>
    )
}

export default TextQuestion;