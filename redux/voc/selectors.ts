import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store"

export const selectTerms = (state: RootState) => state.voc.terms;
export const selectCategories = (state: RootState) => state.voc.categories;
const selectFloatingTerms = (state: RootState) => state.voc.terms.filter(term => !term.parentId);
const selectFloatingCategories = (state: RootState) => state.voc.categories.filter(category => !category.parentId);
const selectId = (_:any, id: string) => id;

export const selectFloatingTermIds = createSelector(
    [selectFloatingTerms],
    items => items.map(item => item.id)
)
export const selectTermById = createSelector(
    [selectTerms, selectId],
    (terms, termId) => terms.find(term => term.id === termId)
)

export const selectFloatingCategoryIds = createSelector(
    [selectFloatingCategories],
    categories => categories.map(item => item.id)
)
export const selectCategoryById = createSelector(
    [selectCategories, selectId],
    (categories, categoryId) => categories.find(category => category.id === categoryId)
)
export const selectCategoryChildren = createSelector(
    [selectCategories, selectTerms, selectId],
    (categories, terms, categoryId) => [...categories, ...terms].filter(item => item.parentId === categoryId)
)