import { QUESTION_TYPE, QUESTION_TYPES } from "../features/questionTypes";

const EditQuestionTypeSection = ({type, setType}) => {

    const types = Object.keys(QUESTION_TYPES);


    return (
        <div className="type-section">
            <label>Type</label>
            <select
                value={type}
                onChange={(e) => setType(e.target.value)}>


                {/* {QUESTION_TYPE.map((questionType) => ( */}
                { Object.entries(QUESTION_TYPE).map(([key, questionType]) => (
                    <option key={questionType.key} value={questionType.key}>
                        {questionType.label}
                    </option>
                ))}

            </select>
    </div>
    )
}
export default EditQuestionTypeSection;