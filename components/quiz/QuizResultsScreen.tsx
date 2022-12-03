import { useRef, useEffect } from 'react';
import { View } from "react-native"
import Animated, { EasingNode } from "react-native-reanimated";
import layout from "../../constants/layout";
import { useColors } from "../../hooks/useColors";
import { selectQuizById } from "../../redux/quiz/selectors";
import { useAppSelector } from "../../redux/store";
import Button from "../button";
import Text from "../text"
import { QuizResultItem } from "./QuizResultItem";

export const QuizResultsScreen: React.FC<{
    quizId: string;
    replayAll: () => void;
    replayFailed: () => void;
}> = ({ quizId, replayAll, replayFailed }) => {
    const { background: { secondary, tertiary }, text: { secondary: textSecondary } } = useColors();
    const quiz = useAppSelector(state => selectQuizById(state, quizId));
    const results = quiz?.playedTerms || [];

    // Handling translations
    const translation = useRef(new Animated.Value(0)).current;

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
    const bottomTranslation = translation.interpolate({
        inputRange: [0, 1],
        outputRange: [25, 0]
    })
    const opacityTranslation = translation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    })

    // Restarting quiz
    const beforeRestart = (func: () => void) => {
        Animated.timing(translation, {
            toValue: 0,
            duration: 250,
            easing: EasingNode.ease
        }).start(func);
    }
    
    // Getting non-played terms
    const playedIds = results.map(result => result.id);
    const allTerms = useAppSelector(state => selectQuizById(state, quizId))?.termIds || [];
    const nonPlayedTermIds = allTerms.filter(term => !playedIds.includes(term));

    const correctCount = results.filter(term => term.outcome === 'correct').length;
    const incorrectCount = results.filter(term => term.outcome === 'incorrect').length;

    return(
        <>
        <Animated.ScrollView style={{
            transform: [{
                translateY: topTranslation
            }],
            opacity: opacityTranslation,
            ...styles.container
        }}>
            <View style={styles.header}>
                <Text style={{
                    color: textSecondary,
                    ...styles.label
                }}>
                    Results
                </Text>
                <Text style={{
                    color: textSecondary,
                    ...styles.label
                }}>
                    {correctCount.toString()}/{results.length.toString()} correct terms
                </Text>
            </View>
            <View style={{
                backgroundColor: secondary,
                borderColor: tertiary,
                ...styles.resultContainer
            }}>
                {results.map((result, key) => (
                    <QuizResultItem 
                        {...result}
                        isLast={key === results.length -  1}
                        key={result.id}
                    />
                ))}
            </View>

            {nonPlayedTermIds.length !== 0 && (
                <View style={styles.notPlayedContainer}>
                    <View style={styles.header}>
                        <Text style={{
                            color: textSecondary,
                            ...styles.label
                        }}>
                            Not played terms
                        </Text>
                        <Text style={{
                            color: textSecondary,
                            ...styles.label
                        }}>
                            {nonPlayedTermIds.length.toString()} terms
                        </Text>
                    </View>

                    <View style={{
                        backgroundColor: secondary,
                        borderColor: tertiary,
                        ...styles.resultContainer
                    }}>
                        {nonPlayedTermIds.map((id, key) => (
                            <QuizResultItem 
                                id={id}
                                isLast={key === results.length -  1}
                                key={id}
                            />
                        ))}
                    </View>
                </View>
            )}
        </Animated.ScrollView>

        <Animated.View style={{
            transform: [{
                translateY: bottomTranslation
            }],
            opacity: opacityTranslation,
            ...styles.buttons
        }}>
            <Button 
                type={'secondary'}
                onPress={() => beforeRestart(replayAll)}
            >
                Replay quiz
            </Button>

            {incorrectCount !== 0 && (
                <Button 
                    onPress={() => beforeRestart(replayFailed)}
                    style={styles.button}
                >
                    Replay failed terms
                </Button>
            )}
        </Animated.View>
        </>
    )
}
const styles = {
    container: {
        padding: layout.spacing.primary
    },
    header: {
        flexDirection: 'row' as 'row',
        alignItems: 'center' as 'center',
        justifyContent: 'space-between' as 'space-between'
    },
    label: {
        fontWeight: '600' as '600',
        marginBottom: layout.spacing.secondary
    },
    resultContainer: {
        padding: layout.spacing.secondary,
        borderRadius: layout.borderRadius.secondary,
        borderWidth: layout.borderWidth.secondary
    },
    notPlayedContainer: {
        marginTop: layout.spacing.primary * 2
    },
    buttons: {
        paddingHorizontal: layout.spacing.primary
    },
    button: {
        marginTop: layout.spacing.secondary
    }
}