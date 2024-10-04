import { QUESTION_TYPE } from "../features/questionTypes";
import EditQuestionTypeSection from "./EditQuestionTypeSection";

const TextQuestion = ({ editMode }) => {




    return (
        <>
            {editMode ? (
                <>

                </>
            ) : (

                <>



                    <input type="text"
                        placeholder="Svar"

                    />


                </>
            )}
        </>
    )
}

export default TextQuestion;