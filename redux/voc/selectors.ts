import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store"

const selectTerms = (state: RootState) => state.voc.terms;
const selectFloatingTerms = (state: RootState) => state.voc.terms.filter(term => !term.parentId);
const selectId = (_:any, id: string) => id;

export const selectFloatingTermIds = createSelector(
    [selectFloatingTerms],
    terms => terms.map(term => term.id)
)
export const selectTermById = createSelector(
    [selectTerms, selectId],
    (terms, termId) => terms.find(term => term.id === termId)
)