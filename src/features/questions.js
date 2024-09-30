import { createAction, createReducer } from "@reduxjs/toolkit";

const addQuestion = createAction('add question');


const actions = {addQuestion}

const initialState = [{
    id: 1,
    type: 'text',
    text: 'Vad heter du?'
}]

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

const questionReducer = createReducer(initialState, builder => {
    builder
        .addCase(addQuestion, (state, action) => {
            const newQuestion = createNewQuestion(action.payload.type, action.payload.text, action.payload.options)

            state.push(newQuestion)

        })
})

export {actions, questionReducer};
