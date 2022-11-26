import { AnyAction, createReducer } from "@reduxjs/toolkit";
import { updateObject } from "../utils";
import { addTerm as addTermAction } from './actions';
import { VocState } from "./types";

type ReducerAction = (state: VocState, action: AnyAction) => VocState;

const addTerm: ReducerAction = (state, action) => {
    const newTerms = state.terms.concat(action.payload);
    return updateObject(state, { terms: newTerms });
}

export const vocReducer = createReducer<VocState>({
    terms: []
}, builder => {
    builder.addCase(addTermAction, addTerm)
})