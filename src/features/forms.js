import { createAction, createReducer } from "@reduxjs/toolkit";

const addForm = createAction('add form');
const addQuestion = createAction('add question');


const actions = {addForm, addQuestion}

const initialState = [
    {
    formID: 1,
    name: 'Utvärdering 1',
    questions: [{
        id: 1,
        type: 'text',
        text: 'Kalle du?'
        }]
    },
    {
    formID: 2,
    name: 'Utvärdering 2',
    questions: [{
        id: 3,
        type: 'text',
        text: 'Vad heter du?'
        }]
    }
];

// Types of question = text, multiple-choice

const createNewQuestion = (type, text, options) => {
    const newQuestion = {
        id: crypto.randomUUID(),
        type: type,
        text: text
    }

    if (type === 'multiple-choice'){
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
            state.push(newForm)
        })

        .addCase(addQuestion, (state, action) => {
           
            const formToAddTo = state.find(form =>form.formID === action.payload.formID);
            if (formToAddTo){
                const newQuestion = createNewQuestion(action.payload.type, action.payload.text, action.payload.options)
                formToAddTo.questions.push(newQuestion);
               // state.push(newQuestion)
            }
        })
})

export {actions, formsReducer};
