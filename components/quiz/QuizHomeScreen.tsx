import { useRef, useEffect } from 'react';
import { View as DefaultView, View } from "react-native"
import Animated, { EasingNode } from 'react-native-reanimated';
import { State } from "."
import layout from "../../constants/layout"
import { useColors } from "../../hooks/useColors"
import { selectQuizById } from "../../redux/quiz/selectors"
import { useAppSelector } from "../../redux/store"
import Button from "../button"
import { SelectedTerm } from "../create-quiz/SelectedTerm"
import Text from "../text"

export const QuizHomeScreen: React.FC<{
    quizId: string;
    setState: (state: State) => void;
}> = ({ quizId, setState }) => {
    const { background: { secondary, tertiary }, text: { secondary: textSecondary } } = useColors();
    const quiz = useAppSelector(state => selectQuizById(state, quizId));
    const translation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(translation, {
            toValue: 1,
            duration: 250,
            easing: EasingNode.ease
        }).start();
    }, []);

    const startQuiz = () => {
        Animated.timing(translation, {
            toValue: 0,
            duration: 250,
            easing: EasingNode.ease
        }).start(() => {
            setState('play-all');
        })
    }

    if(!quiz) return <Text>Quiz was not found.</Text>;

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

    return(
        <>
        <Animated.ScrollView style={{
            transform: [{
                translateY: topTranslation
            }],
            opacity: opacityTranslation,
            ...styles.content
        }}>
            <>
            <View style={styles.header}>
                <Text style={{
                    color: textSecondary,
                    ...styles.label
                }}>
                    {quiz.name}
                </Text>
                <Text>
                    {quiz.termIds.length.toString()} terms
                </Text>
            </View>

            <DefaultView style={{
                backgroundColor: secondary,
                borderColor: tertiary,
                ...styles.termContainer
            }}>
                {quiz?.termIds.map((id, key) => (
                    <SelectedTerm 
                        id={id}
                        isLast={key === quiz.termIds.length - 1}
                        key={id} 
                    />
                ))}
            </DefaultView>
            </>
        </Animated.ScrollView>
        <Animated.View style={{
            transform: [{
                translateY: bottomTranslation 
            }],
            opacity: opacityTranslation
        }}>
            <Button 
                onPress={startQuiz}
                style={styles.button}
            >
                Start quiz
            </Button>
        </Animated.View>
        </>
    )
}
const styles = {
    content: {
        padding: layout.spacing.primary,
    },
    termContainer: {
        padding: layout.spacing.secondary,
        borderWidth: layout.borderWidth.secondary,
        borderRadius: layout.borderRadius.secondary
    },
    header: {
        flexDirection: 'row' as 'row',
        justifyContent: 'space-between' as 'space-between',
        alignItems: 'center' as 'center',
        marginBottom: layout.spacing.secondary
    },
    label: {
        fontSize: 16,
        fontWeight: '600' as '600'
    },
    button: {
        marginHorizontal: layout.spacing.primary
    }
}