import { createAction } from "@reduxjs/toolkit";
import { ADD_QUIZ, SET_QUIZZES } from "./constants";

export const setQuizzes = createAction(SET_QUIZZES, quizzes => ({
    type: SET_QUIZZES,
    payload: quizzes
}))
export const addQuiz = createAction(ADD_QUIZ, quiz => ({
    type: ADD_QUIZ,
    payload: quiz
}))