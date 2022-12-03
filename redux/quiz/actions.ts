import { createAction } from "@reduxjs/toolkit";
import { ADD_QUIZ, REMOVE_QUIZ, REMOVE_TERM_FROM_QUIZ, SET_QUIZZES, SET_QUIZ_TERM_IDS, UPDATE_QUIZ_PROGRESS } from "./constants";

export const setQuizzes = createAction(SET_QUIZZES, quizzes => ({
    type: SET_QUIZZES,
    payload: quizzes
}))
export const addQuiz = createAction(ADD_QUIZ, quiz => ({
    type: ADD_QUIZ,
    payload: quiz
}))
export const removeQuiz = createAction(REMOVE_QUIZ, quizId => ({
    type: REMOVE_QUIZ,
    payload: quizId
}))

export const removeTermFromQuiz = createAction(REMOVE_TERM_FROM_QUIZ, termId => ({
    type: REMOVE_TERM_FROM_QUIZ,
    payload: termId
}))
export const setQuizTerms = createAction(SET_QUIZ_TERM_IDS, (quizId, termIds) => ({
    type: SET_QUIZ_TERM_IDS,
    payload: { id: quizId, termIds }
}))
export const updateQuizProgress = createAction(UPDATE_QUIZ_PROGRESS, (quizId, playedTerms) => ({
    type: UPDATE_QUIZ_PROGRESS,
    payload: { id: quizId, playedTerms }
}))