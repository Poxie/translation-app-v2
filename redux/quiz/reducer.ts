import { AnyAction, createReducer } from "@reduxjs/toolkit";
import { updateItemInArray, updateObject } from "../utils";
import { QuizState } from "./types";
import { 
    setQuizzes as setQuizzesAction,
    addQuiz as addQuizAction,
    removeQuiz as removeQuizAction,
    removeTermFromQuiz as removeTermFromQuizAction,
    setQuizTerms as setQuizTermsAction,
    updateQuizProgress as updateQuizProgressAction
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

const setQuizTerms: ReducerAction = (state, action) => {
    const newQuizzes = updateItemInArray(state.quizzes, action.payload.id, quiz => {
        return updateObject(quiz, {
            termIds: action.payload.termIds,
            playedTerms: quiz.playedTerms.filter(term => action.payload.termIds.includes(term.id))
        })
    })
    return updateObject(state, { quizzes: newQuizzes });
}

const updateQuizProgress: ReducerAction = (state, action) => {
    const newQuizzes = updateItemInArray(state.quizzes, action.payload.id, quiz => {
        return updateObject(quiz, {
            playedTerms: action.payload.playedTerms
        })
    })
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
        .addCase(setQuizTermsAction.type, setQuizTerms)
        .addCase(updateQuizProgressAction.type, updateQuizProgress)
})