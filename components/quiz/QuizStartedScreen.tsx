import { useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native"
import { State } from ".";
import layout from "../../constants/layout";
import { selectQuizById, selectTermsByQuiz } from "../../redux/quiz/selectors";
import { useAppSelector } from "../../redux/store";
import Button from "../button";
import Text from "../text";
import { QuizProgressBar } from "./QuizProgressBar";
import { QuizProgressButtons } from "./QuizProgressButtons";
import { QuizRevealAnswer } from "./QuizRevealAnswer";
import { QuizRevealedAnswer } from "./QuizRevealvedAnswer";

export type PlayedTerm = {
    id: string;
    outcome: 'correct' | 'incorrect';
}
export const QuizStartedScreen: React.FC<{
    quizId: string;
    setState: (state: State) => void;
}> = ({ quizId, setState }) => {
    const quiz = useAppSelector(state => selectQuizById(state, quizId));
    const terms = useAppSelector(state => selectTermsByQuiz(state, quiz?.termIds || []));
    const [index, setIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const playedTerms = useRef<PlayedTerm[]>([]);

    const activeTerm = terms[index];

    const nextTerm = (outcome: PlayedTerm['outcome']) => {
        // Adding term with outcome to played terms
        const term = {
            id: activeTerm.id,
            outcome
        }
        playedTerms.current.push(term);
        
        // If term was last term, show results
        if(index === terms.length - 1) return setState('results');

        // Increasing active index
        setIndex(prev => prev + 1);

        // Resetting board
        setShowAnswer(false);
    }
    const onCorrect = () => {
        nextTerm('correct')
    }
    const onIncorrect = () => {
        nextTerm('incorrect')
    }
    
    return(
        <View>
            <QuizProgressBar 
                index={index}
                count={terms.length}
            />
            <Text style={styles.header}>
                What is the definition of '{activeTerm?.term || ''}'?
            </Text>
            
            <View style={styles.options}>
                {!showAnswer && (
                    <QuizRevealAnswer 
                        revealAnswer={() => setShowAnswer(true)}
                    />
                )}

                {showAnswer && (
                    <>
                    <QuizRevealedAnswer 
                        hideAnswer={() => setShowAnswer(false)}
                        answer={activeTerm.definition || ''}
                    />

                    <QuizProgressButtons 
                        onCorrect={onCorrect}
                        onIncorrect={onIncorrect}
                    />
                    </>
                )}
            </View>
        </View>
    )
}
const styles = {
    header: {
        fontSize: 20,
        fontWeight: '600' as '600',
        textAlign: 'center' as 'center'
    },
    options: {
        marginTop: 30
    },
    label: {
        textAlign: 'center' as 'center'
    },
}