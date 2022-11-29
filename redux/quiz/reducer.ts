import { AnyAction, createReducer } from "@reduxjs/toolkit";
import { updateObject } from "../utils";
import { QuizState } from "./types";
import { 
    setQuizzes as setQuizzesAction,
    addQuiz as addQuizAction 
} from './actions'; 

type ReducerAction = (state: QuizState, action: AnyAction) => QuizState;

const setQuizzes: ReducerAction = (state, action) => {
    return updateObject(state, { quizzes: action.payload });
}

const addQuiz: ReducerAction = (state, action) => {
    const newQuizzes = state.quizzes.concat(action.payload);
    return updateObject(state, { quizzes: newQuizzes });
}

export const quizReducer = createReducer<QuizState>({
    quizzes: []
}, builder => {
    builder
        .addCase(setQuizzesAction.type, setQuizzes)
        .addCase(addQuizAction.type, addQuiz)
})