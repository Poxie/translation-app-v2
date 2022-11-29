import { $CombinedState } from "redux";
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { VocState } from "./voc/types";
import { vocReducer } from "./voc/reducer";
import { QuizState } from "./quiz/types";
import { quizReducer } from "./quiz/reducer";

const combinedReducer = combineReducers({
    voc: vocReducer,
    quiz: quizReducer
});

export const store = configureStore({ reducer: combinedReducer });

export type RootState = {
    readonly [$CombinedState]?: undefined
} & {
    voc: VocState;
    quiz: QuizState;
}
export type AppDispatch = typeof store.dispatch;

// Hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;