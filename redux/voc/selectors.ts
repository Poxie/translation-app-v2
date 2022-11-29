import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store"

export const selectTranslations = (state: RootState) => state.voc.translations;
export const selectTerms = (state: RootState) => state.voc.terms;
export const selectCategories = (state: RootState) => state.voc.categories;
export const selectLanguages = (state: RootState) => state.voc.languages;
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

export const selectTermTranslationIds = createSelector(
    [selectTranslations, selectTermById],
    (translations, term) => term?.translation ? translations[term.translation]?.filter(id => id !== term.id) : undefined
)
export const selectTermTranslations = createSelector(
    [selectTerms, selectTermTranslationIds],
    (terms, ids) => terms.filter(term => ids?.includes(term.id))
)

export const selectSelectors = (state: RootState) => state.voc.selectors;