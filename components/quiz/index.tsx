import { useEffect, useState } from "react";
import { setQuizTerms } from "../../redux/quiz/actions";
import { setQuizTerms as setQuizTermsInStorage } from '../../logic';
import { selectQuizById } from "../../redux/quiz/selectors";
import { useAppDispatch, useAppSelector } from "../../redux/store";
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
export default function Quiz({ route: { params: { quizId, termIds } }}: QuizScreenProps ) {
    const dispatch = useAppDispatch();
    const [state, setState] = useState<State>('home');
    const [results, setResults] = useState<PlayedTerm[]>([]);
    const failedTerms = results.filter(term => term.outcome === 'incorrect');
    const quiz = useAppSelector(state => selectQuizById(state, quizId));

    useEffect(() => {
        if(!termIds) return;
        if(JSON.stringify(termIds) === JSON.stringify(quiz?.termIds)) return;

        // Updating quiz termIds
        dispatch(setQuizTerms(quizId, termIds));
        setQuizTermsInStorage(quizId, termIds);
    }, [termIds, quiz?.termIds]);
    
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