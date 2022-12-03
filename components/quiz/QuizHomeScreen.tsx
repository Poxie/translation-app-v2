import { useNavigation } from '@react-navigation/native';
import { useRef, useEffect, useState } from 'react';
import { TouchableOpacity, View as DefaultView, View } from "react-native"
import { deleteQuiz as deleteQuizInStorage } from '../../logic';
import Animated, { EasingNode } from 'react-native-reanimated';
import { State } from "."
import layout from "../../constants/layout"
import { useColors } from "../../hooks/useColors"
import { removeQuiz } from '../../redux/quiz/actions';
import { selectQuizById } from "../../redux/quiz/selectors"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import Button from "../button"
import { SelectedTerm } from "../create-quiz/SelectedTerm"
import Text from "../text"
import { QuizResultItem } from './QuizResultItem';

export const QuizHomeScreen: React.FC<{
    quizId: string;
    setState: (state: State) => void;
}> = ({ quizId, setState }) => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation();
    const { background: { secondary, tertiary }, text: { secondary: textSecondary } } = useColors();
    const quiz = useAppSelector(state => selectQuizById(state, quizId));
    const translation = useRef(new Animated.Value(0)).current;
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const toggleEditing = () => setIsEditing(prev => !prev);

        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={toggleEditing}>
                    <Text>
                        {isEditing ? 'Done' : 'Edit'}
                    </Text>
                </TouchableOpacity>
            )
        });
    }, [isEditing]);

    useEffect(() => {
        // Initial animation
        Animated.timing(translation, {
            toValue: 1,
            duration: 250,
            easing: EasingNode.ease
        }).start();

        // Removing edit option
        return () => navigation.setOptions({ headerRight: null });
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

    const deleteQuiz = () => {
        navigation.goBack();
        dispatch(removeQuiz(quizId));
        deleteQuizInStorage(quizId);
    }

    const editTerms = () => {
        navigation.navigate('Root', {
            screen: 'Voc',
            params: {
                header: 'Select quiz terms',
                defaultActiveIds: quiz?.termIds,
                pathAfterSelection: 'Quiz',
                paramsAfterSelection: { quizId },
                selectable: true
            }
        })
    }

    if(!quiz) return <Text>Quiz was not found.</Text>;

    // Transitions
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

    // Checking for quiz progress
    const playedTerms = quiz.playedTerms;

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

            {isEditing && (
                <Button 
                    type={'transparent'}
                    onPress={editTerms}
                >
                    Edit terms
                </Button>
            )}

            {!isEditing && (
                <View style={styles.progress}>
                    <Text style={{
                        color: textSecondary,
                        ...styles.progressHeader
                    }}>
                        Previous Progress
                    </Text>

                    <View style={{
                        borderColor: tertiary,
                        backgroundColor: secondary,
                        ...styles.termContainer
                    }}>
                        {playedTerms.map((term, key) => (
                            <QuizResultItem 
                                id={term.id}
                                outcome={term.outcome}
                                isLast={key === playedTerms.length - 1}
                                key={term.id}
                            />
                        ))}
                    </View>
                </View>
            )}
            </>
        </Animated.ScrollView>
        <Animated.View style={{
            transform: [{
                translateY: bottomTranslation 
            }],
            opacity: opacityTranslation
        }}>
            {!isEditing ? (
                <Button 
                    onPress={startQuiz}
                    style={styles.button}
                >
                    Start quiz
                </Button>
            ) : (
                <Button 
                    onPress={deleteQuiz}
                    style={styles.button}
                    type={'danger'}
                >
                    Delete quiz
                </Button>
            )}
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
    },
    progress: {
        marginTop: layout.spacing.primary
    },
    progressHeader: {
        marginBottom: layout.spacing.secondary,
        fontWeight: '600' as '600',
        fontSize: 14
    }
}