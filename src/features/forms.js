import { createAction, createReducer } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const addForm = createAction('add form');
const addQuestion = createAction('add question');
const editQuestion = createAction('edit question');
const deleteQuestion = createAction('delete question');


const actions = {addForm, addQuestion, editQuestion, deleteQuestion}

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

const createNewQuestion = (type, text, options, id=crypto.randomUUID()) => {
    const newQuestion = {
        id: id,
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

        .addCase(editQuestion, (state, action) => {
            // const form = state.find(form => form.formID === action.payload.formID)
            // if (!form) {
            //     return;
            // }
            // const question = form.questions.find(q => q.id === action.payload.id);

            // // Handle the case where the question is not found
            // if (!question) {
            //     return;
            // }
            // question.text = action.payload.text;
            // question.type = action.payload.type;
            // if (question.type === 'multiple-choice') {
            //     question.options = action.payload.options || [];
            // }
            // return state;



            const form = state.find(form => form.formID === action.payload.formID)
            const newQuestionsArray = []
            form.questions.forEach(question => {
                if (question.id !== action.payload.id){
                    newQuestionsArray.push(question);
                } else{
                    const newQuestion = createNewQuestion(action.payload.type, action.payload.text, action.payload.options, action.payload.id)
                    newQuestionsArray.push(newQuestion);
                }
            })
        
            form.questions = newQuestionsArray;
            // const newState = [];

            // state.forEach(formState => {
            //     if(form.formID === formState.formID){
            //         newState.push(form);
            //     } else{
            //         newState.push(formState);
            //     }
            // })

            // return newState;
            // const question = form.questions.find(question.id === action.payload.id)
        })

        .addCase(deleteQuestion, (state, action) => {
            const form = state.find(f => f.formID === action.payload.formID);
            const newQuestionsArray = [];
            form.questions.forEach(question => {
                if (question.id !== action.payload.questionID){
                    newQuestionsArray.push(question);
                }
            })
            form.questions = newQuestionsArray
        })
})

export {actions, formsReducer};
