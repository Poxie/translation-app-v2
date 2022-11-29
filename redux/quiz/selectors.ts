import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectTerms = (state: RootState) => state.voc.terms;
const selectQuizzes = (state: RootState) => state.quiz.quizzes;
const selectId = (_:any, id: string) => id;
const selectIds = (_:any, ids: string[]) => ids;

export const selectQuizIds = createSelector(
    [selectQuizzes],
    quizzes => quizzes.map(quiz => quiz.id)
)
export const selectQuizById = createSelector(
    [selectQuizzes, selectId],
    (quizzes, quizId) => quizzes.find(quiz => quiz.id === quizId)
)
export const selectTermsByQuiz = createSelector(
    [selectTerms, selectIds],
    (terms, quizTermIds) => terms.filter(term => quizTermIds.includes(term.id))
)