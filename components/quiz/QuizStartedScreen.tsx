import { useRef, useState, useEffect } from "react";
import { View } from "react-native"
import Animated, { EasingNode } from "react-native-reanimated";
import { State } from ".";
import { updateQuizProgress as updateQuizProgressInStorage } from "../../logic";
import { updateQuizProgress } from "../../redux/quiz/actions";
import { selectQuizById, selectTermsByQuiz } from "../../redux/quiz/selectors";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { PlayedTerm } from "../../types";
import Text from "../text";
import { QuizProgressBar } from "./QuizProgressBar";
import { QuizProgressButtons } from "./QuizProgressButtons";
import { QuizRevealAnswer } from "./QuizRevealAnswer";
import { QuizRevealedAnswer } from "./QuizRevealvedAnswer";

export const QuizStartedScreen: React.FC<{
    quizId: string;
    setState: (state: State) => void;
    state: State;
}> = ({ quizId, setState, state }) => {
    const dispatch = useAppDispatch();
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

    // Determining quiz terms
    let termIds: string[] = [];
    if(['play-all', 'continue'].includes(state)) termIds = quiz?.termIds || [];
    const terms = useAppSelector(state => selectTermsByQuiz(state, termIds));
    const playedTerms = useRef<PlayedTerm[]>(
        state === 'continue' ? [...(quiz?.playedTerms || [])] : []
    );

    // Determining start term start index
    let defaultIndex = 0;
    if(state === 'continue') defaultIndex = quiz?.playedTerms?.length || 0;
    const [index, setIndex] = useState(defaultIndex);

    // Game options
    const [showAnswer, setShowAnswer] = useState(false);

    // Determining active term
    const activeTerm = terms[index];

    const nextTerm = (outcome: PlayedTerm['outcome']) => {
        const term = {
            id: activeTerm.id,
            outcome
        }
        playedTerms.current.push(term);
        dispatch(updateQuizProgress(quizId, [...playedTerms.current]));
        updateQuizProgressInStorage(quizId, [...playedTerms.current]);

        if(index === terms.length - 1) {
            Animated.timing(translation, {
                toValue: 0,
                duration: 250,
                easing: EasingNode.ease
            }).start(() => {
                setState('results');
            })
            return;
        }

        Animated.timing(translationTwo, {
            toValue: 0,
            duration: 250,
            easing: EasingNode.ease
        }).start(() => {
            setIndex(prev => prev + 1);
            setShowAnswer(false);

            Animated.timing(translationTwo, {
                toValue: 1,
                duration: 250,
                easing: EasingNode.ease
            }).start();
        })
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