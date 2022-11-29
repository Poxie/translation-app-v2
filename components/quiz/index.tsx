import { useState } from "react";
import { ScrollView, View as DefaultView } from "react-native";
import layout from "../../constants/layout";
import { useColors } from "../../hooks/useColors";
import { selectQuizById } from "../../redux/quiz/selectors";
import { useAppSelector } from "../../redux/store";
import { QuizScreenProps } from "../../types";
import Button from "../button";
import { SelectedTerm } from "../create-quiz/SelectedTerm";
import Text from "../text";
import View from "../view";
import { QuizHomeScreen } from "./QuizHomeScreen";
import { QuizResultsScreen } from "./QuizResultsScreen";
import { QuizStartedScreen } from "./QuizStartedScreen";

export type State = 'home' | 'started' | 'results';
export type PlayedTerm = {
    id: string;
    outcome: 'correct' | 'incorrect';
}
export default function Quiz({ route: { params: { quizId } }}: QuizScreenProps ) {
    const [state, setState] = useState<State>('home');
    const [results, setResults] = useState<PlayedTerm[]>([]);

    return(
        <View safeAreaView>
            {state === 'home' && (
                <QuizHomeScreen 
                    quizId={quizId}
                    setState={setState} 
                />
            )}

            {state === 'started' && (
                <QuizStartedScreen 
                    quizId={quizId}
                    setState={setState}
                    setResults={setResults}
                />
            )}

            {state === 'results' && (
                <QuizResultsScreen 
                    results={results}
                    replayAll={() => setState('started')}
                />
            )}
        </View>
    )
}