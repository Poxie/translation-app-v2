import { useRef, useState, useEffect } from "react";
import { View } from "react-native"
import Animated, { EasingNode } from "react-native-reanimated";
import { PlayedTerm, State } from ".";
import { selectQuizById, selectTermsByQuiz } from "../../redux/quiz/selectors";
import { useAppSelector } from "../../redux/store";
import Text from "../text";
import { QuizProgressBar } from "./QuizProgressBar";
import { QuizProgressButtons } from "./QuizProgressButtons";
import { QuizRevealAnswer } from "./QuizRevealAnswer";
import { QuizRevealedAnswer } from "./QuizRevealvedAnswer";

export const QuizStartedScreen: React.FC<{
    quizId: string;
    setState: (state: State) => void;
    setResults: (terms: PlayedTerm[]) => void;
    failedTerms: PlayedTerm[];
    state: State;
}> = ({ quizId, setState, setResults, state, failedTerms }) => {
    const quiz = useAppSelector(state => selectQuizById(state, quizId));

    // Handling animations
    const translation = useRef(new Animated.Value(0)).current;
    const translationTwo = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.timing(translation, {
            toValue: 1,
            duration: 250,
            easing: EasingNode.ease
        }).start();
    }, []);
    
    const topTranslation = translation.interpolate({
        inputRange: [0, 1],
        outputRange: [-25, 0]
    })
    const opacityTranslation = translation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    });

    const headerTranslation = translationTwo.interpolate({
        inputRange: [0, 1],
        outputRange: [-25, 0]
    })
    const headerOpacityTranslation = translationTwo.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    })
    
    if(!quiz) return null;

    // Determining what terms to use
    let termIds: string[] = [];
    if(state === 'play-all') termIds = quiz.termIds;
    if(state === 'play-failed') termIds = failedTerms.map(term => term.id);

    // Fetching terms to use
    const terms = useAppSelector(state => selectTermsByQuiz(state, termIds));

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
        if(index === terms.length - 1) {
            Animated.timing(translation, {
                toValue: 0,
                duration: 250,
                easing: EasingNode.ease
            }).start(() => {
                setResults(playedTerms.current);
                setState('results');
            })
            return;
        }

        Animated.timing(translationTwo, {
            toValue: 0,
            duration: 250,
            easing: EasingNode.ease
        }).start(() => {
            // Increasing active index
            setIndex(prev => prev + 1);

            // Resetting board
            setShowAnswer(false);

            Animated.timing(translationTwo, {
                toValue: 1,
                duration: 250,
                easing: EasingNode.ease
            }).start();
        });
    }
    const onCorrect = () => {
        nextTerm('correct')
    }
    const onIncorrect = () => {
        nextTerm('incorrect')
    }
    
    return(
        <Animated.View style={{
            transform: [{ translateY: topTranslation }],
            opacity: opacityTranslation
        }}>
            <QuizProgressBar 
                index={index}
                count={terms.length}
            />

            <Animated.View style={{
                transform: [{
                    translateY: headerTranslation
                }],
                opacity: headerOpacityTranslation
            }}>
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
            </Animated.View>
        </Animated.View>
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