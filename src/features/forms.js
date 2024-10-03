import { createAction, createReducer } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const addForm = createAction('add form');
const editForm = createAction('edit form');
const deleteForm = createAction('delete form');
const addQuestion = createAction('add question');
const editQuestion = createAction('edit question');
const deleteQuestion = createAction('delete question');



const actions = { addForm, editForm, deleteForm, addQuestion, editQuestion, deleteQuestion }

const initialState = [
    {
        formID: '1',
        name: 'Utvärdering 1',
        questions: [{
            id: '1',
            type: 'text',
            text: 'Kalle du?'
        }]
    },
    {
        formID: '2',
        name: 'Utvärdering 2',
        questions: [{
            id: '3',
            type: 'text',
            text: 'Vad heter du?'
        },

        {
            id: '5',
            type: 'multiple-choice',
            text: 'Tycker du ett eller 2',
            options: ['val 1', 'val 2']
        }
        ]
    }
];

// Types of question = text, multiple-choice

const createNewQuestion = (type, text, options, id = crypto.randomUUID()) => {
    const newQuestion = {
        id: id,
        type: type,
        text: text
    }

    if (type === 'multiple-choice') {
        newQuestion.options = options || [];
    }
    return newQuestion

}

const formsReducer = createReducer(initialState, builder => {
    builder

        .addCase(addForm, (state, action) => {
            const newForm = {
                formID: crypto.randomUUID(),
                name: action.payload,
                questions: []
            };

            return ([...state, newForm])
        })

        .addCase(editForm, (state, action) => {
            return state.map(form => {
                return form.formID === action.payload.formID
                    ? { ...form, name: action.payload.name }
                    : form
            });
        })

        .addCase(deleteForm, (state, action) => {
            return state.filter(( form => form.formID != action.payload));
        })

        .addCase(addQuestion, (state, action) => {
            const newState = state.map(form => {
                if (form.formID === action.payload.formID) {
                    const newQuestion = createNewQuestion(action.payload.type, action.payload.text, action.payload.options)
                    return {
                        ...form,
                        questions: [...form.questions, newQuestion]
                    }
                }
                return form;

            });
            return newState;
            // Worked !
            // const formToAddTo = state.find(form =>form.formID === action.payload.formID);


            // if (formToAddTo){
            //     const newQuestion = createNewQuestion(action.payload.type, action.payload.text, action.payload.options)
            //     formToAddTo.questions.push(newQuestion);
            //    // state.push(newQuestion)
            // }
        })

        .addCase(editQuestion, (state, action) => {
            const newState = state.map(form => {
                if (form.formID === action.payload.formID) {
                    const newQuestionsArray = form.questions.map(question => {
                        if (question.id === action.payload.id) {
                            const editedQuestion = createNewQuestion(action.payload.type, action.payload.text, action.payload.options, action.payload.id)
                            return editedQuestion;
                        } else {
                            return question
                        }
                    })
                    return { ...form, questions: newQuestionsArray }
                }
                return form;

            })
            return newState;


            // const form = state.find(form => form.formID === action.payload.formID)



            // const newQuestionsArray = []
            // form.questions.forEach(question => {
            //     if (question.id !== action.payload.id){
            //         newQuestionsArray.push(question);
            //     } else{
            //         const newQuestion = createNewQuestion(action.payload.type, action.payload.text, action.payload.options, action.payload.id)
            //         newQuestionsArray.push(newQuestion);
            //     }
            // })

            // form.questions = newQuestionsArray;

        })

        .addCase(deleteQuestion, (state, action) => {
            return state.map(form => {
                return form.formID === action.payload.formID
                    ? { ...form, questions: form.questions.filter(q => q.id !== action.payload.questionID) }
                    : form
            })

            // return(state.map(form => {
            //     if(form.formID === action.payload.formID){
            //         return(form.questions.map(question => {
            //             if(question.id !== action.payload.questionID){
            //                 return question
            //             }
            //         }))
            //     }
            //     return form
            // }))


            // const form = state.find(f => f.formID === action.payload.formID);
            // const newQuestionsArray = [];
            // form.questions.forEach(question => {
            //     if (question.id !== action.payload.questionID){
            //         newQuestionsArray.push(question);
            //     }
            // })
            // form.questions = newQuestionsArray
        })
})

export { actions, formsReducer };
