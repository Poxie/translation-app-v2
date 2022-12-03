import { AnyAction, createReducer } from "@reduxjs/toolkit";
import { updateObject } from "../utils";
import { QuizState } from "./types";
import { 
    setQuizzes as setQuizzesAction,
    addQuiz as addQuizAction,
    removeQuiz as removeQuizAction,
    removeTermFromQuiz as removeTermFromQuizAction
} from './actions'; 
import { Quiz } from "../../types";

type ReducerAction = (state: QuizState, action: AnyAction) => QuizState;

const setQuizzes: ReducerAction = (state, action) => {
    return updateObject(state, { quizzes: action.payload });
}

const addQuiz: ReducerAction = (state, action) => {
    const newQuizzes = state.quizzes.concat(action.payload);
    return updateObject(state, { quizzes: newQuizzes });
}

const removeQuiz: ReducerAction = (state, action) => {
    const newQuizzes = state.quizzes.filter(quiz => quiz.id !== action.payload);
    return updateObject(state, { quizzes: newQuizzes });
}

const removeTermFromQuiz: ReducerAction = (state, action) => {
    const newQuizzes: Quiz[] = [];
    for(let quiz of state.quizzes) {
        if(quiz.termIds.includes(action.payload)) {
            quiz = updateObject(quiz, {
                termIds: quiz.termIds.filter(termId => termId !== action.payload)
            })
            if(!quiz.termIds.length) continue;
        }
        newQuizzes.push(quiz);
    }

    return updateObject(state, { quizzes: newQuizzes });
}

export const quizReducer = createReducer<QuizState>({
    quizzes: []
}, builder => {
    builder
        .addCase(setQuizzesAction.type, setQuizzes)
        .addCase(addQuizAction.type, addQuiz)
        .addCase(removeQuizAction.type, removeQuiz)
        .addCase(removeTermFromQuizAction.type, removeTermFromQuiz)
})