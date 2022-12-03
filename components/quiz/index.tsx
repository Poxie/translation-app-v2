import { useState } from "react";
import { QuizScreenProps } from "../../types";
import View from "../view";
import { QuizHomeScreen } from "./QuizHomeScreen";
import { QuizResultsScreen } from "./QuizResultsScreen";
import { QuizStartedScreen } from "./QuizStartedScreen";

export type State = 'home' | 'play-all' | 'play-failed' | 'results';
export type PlayedTerm = {
    id: string;
    outcome: 'correct' | 'incorrect';
}
export default function Quiz({ route: { params: { quizId } }}: QuizScreenProps ) {
    const [state, setState] = useState<State>('home');
    const [results, setResults] = useState<PlayedTerm[]>([]);
    const failedTerms = results.filter(term => term.outcome === 'incorrect');
    
    return(
        <View safeAreaView>
            {state === 'home' && (
                <QuizHomeScreen 
                    quizId={quizId}
                    setState={setState} 
                />
            )}

            {['play-all', 'play-failed'].includes(state) && (
                <QuizStartedScreen 
                    quizId={quizId}
                    setState={setState}
                    setResults={setResults}
                    failedTerms={failedTerms}
                    state={state}
                />
            )}

            {state === 'results' && (
                <QuizResultsScreen 
                    quizId={quizId}
                    results={results}
                    replayAll={() => setState('play-all')}
                    replayFailed={() => setState('play-failed')}
                />
            )}
        </View>
    )
}