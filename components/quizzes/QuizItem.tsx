import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View } from "react-native";
import layout from "../../constants/layout";
import { useColors } from "../../hooks/useColors";
import { selectQuizById } from "../../redux/quiz/selectors";
import { useAppSelector } from "../../redux/store";
import Text from "../text";

export const QuizItem: React.FC<{
    id: string;
}> = ({ id }) => {
    const { background: { secondary, tertiary }, text: { secondary: textSecondary }, color: { primary } } = useColors();
    const navigation = useNavigation();
    const quiz = useAppSelector(state => selectQuizById(state, id));
    if(!quiz) return null;

    const goToQuiz = () => {
        navigation.navigate('Root', {
            screen: 'Quiz',
            params: { quizId: quiz.id }
        })
    }

    const completedPercentage = (quiz.playedTerms.length / quiz.termIds.length) * 100;

    return(
        <TouchableOpacity
            onPress={goToQuiz}
            style={{
                backgroundColor: secondary,
                borderColor: tertiary,
                ...styles.container
            }}
        >
            <View style={styles.header}>
                <Text style={{
                    color: textSecondary,
                    ...styles.name
                }}>
                    {quiz.name}
                </Text>

                <Text style={{
                    color: textSecondary,
                    ...styles.termCount
                }}>
                    {quiz.termIds.length.toString()} terms
                </Text>
            </View>

            <View style={styles.progressContainer}>
                <View style={{
                    backgroundColor: tertiary,
                    ...styles.progress
                }}>
                    <View 
                        style={{ 
                            width: `${completedPercentage}%`,
                            backgroundColor: primary,
                            ...styles.progress
                        }}
                    />
                </View>
                <View style={styles.progressFooter}>
                    <Text style={{
                        color: textSecondary,
                        ...styles.progressText
                    }}>
                        Progress
                    </Text>
                    <Text style={{
                        color: textSecondary,
                        ...styles.progressText
                    }}>
                        {quiz.playedTerms.length.toString()}/{quiz.termIds.length.toString()} terms played
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
const styles = {
    container: {
        padding: layout.spacing.secondary,
        borderWidth: layout.borderWidth.secondary,
        borderRadius: layout.borderRadius.secondary,
        marginBottom: layout.spacing.secondary
    },
    header: {
        flexDirection: 'row' as 'row',
        alignItems: 'center' as 'center',
        justifyContent: 'space-between' as 'space-between'
    },
    name: {
        fontWeight: '600' as '600',
        marginRight: 6,
        fontSize: 15,
    },
    termCount: {
        fontSize: 13,
        fontWeight: '600' as '600'
    },
    progressContainer: {
        marginTop: layout.spacing.primary
    },
    progress: {
        height: 6,
        borderRadius: 4,
    },
    progressFooter: {
        flexDirection: 'row' as 'row',
        justifyContent: 'space-between' as 'space-between',
        marginTop: 6
    },
    progressText: {
        fontWeight: '600' as '600',
        fontSize: 12
    }
}