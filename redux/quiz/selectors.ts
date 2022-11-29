import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectQuizzes = (state: RootState) => state.quiz.quizzes;
const selectId = (_:any, id: string) => id;

export const selectQuizIds = createSelector(
    [selectQuizzes],
    quizzes => quizzes.map(quiz => quiz.id)
)
export const selectQuizById = createSelector(
    [selectQuizzes, selectId],
    (quizzes, quizId) => quizzes.find(quiz => quiz.id === quizId)
)