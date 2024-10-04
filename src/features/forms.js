import { createAction, createReducer } from "@reduxjs/toolkit";
import { QUESTION_TYPE } from "./questionTypes";


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
            type: QUESTION_TYPE.TEXT.key,
            text: 'Vad tycker du var bra med evenemanget?'
        },{
            id: 10,
            type: QUESTION_TYPE.MULTIPLE_CHOICE.key,
            text: 'Vilken Pokemon väljer du?',
            options: ['Bulbasaur', 'Charmander', 'Squirtle']
        }
    
        ]
    },
    {
        formID: '2',
        name: 'Utvärdering 2',
        questions: [{
            id: '3',
            type: QUESTION_TYPE.TEXT.key,
            text: 'Vad heter du?'
        },

        {
            id: '5',
            type: QUESTION_TYPE.MULTIPLE_CHOICE.key,
            text: 'Tycker du 1 eller 2',
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

        })

        .addCase(deleteQuestion, (state, action) => {
            return state.map(form => {
                return form.formID === action.payload.formID
                    ? { ...form, questions: form.questions.filter(q => q.id !== action.payload.questionID) }
                    : form
            })

        })
})

export { actions, formsReducer };
