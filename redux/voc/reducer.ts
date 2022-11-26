import { AnyAction, createReducer } from "@reduxjs/toolkit";
import { updateObject } from "../utils";
import { toggleTest as toggleTestAction } from './actions';
import { VocState } from "./types";

type ReducerAction = (state: VocState, action: AnyAction) => VocState;

const toggleTest: ReducerAction = (state, action) => {
    return updateObject(state, { test: !state.test });
}

export const vocReducer = createReducer<VocState>({
    test: true
}, builder => {
    builder.addCase(toggleTestAction, toggleTest)
})