import { ScrollView, View } from "react-native"
import { PlayedTerm } from "."
import layout from "../../constants/layout";
import { useColors } from "../../hooks/useColors";
import { selectQuizById } from "../../redux/quiz/selectors";
import { useAppSelector } from "../../redux/store";
import Button from "../button";
import Text from "../text"
import { QuizResultItem } from "./QuizResultItem";

export const QuizResultsScreen: React.FC<{
    quizId: string;
    results: PlayedTerm[];
    replayAll: () => void;
    replayFailed: () => void;
}> = ({ quizId, results, replayAll, replayFailed }) => {
    const { background: { secondary, tertiary }, text: { secondary: textSecondary } } = useColors();
    
    // Getting non-played terms
    const playedIds = results.map(result => result.id);
    const allTerms = useAppSelector(state => selectQuizById(state, quizId))?.termIds || [];
    const nonPlayedTermIds = allTerms.filter(term => !playedIds.includes(term));

    const correctCount = results.filter(term => term.outcome === 'correct').length;
    const incorrectCount = results.filter(term => term.outcome === 'incorrect').length;

    return(
        <>
        <ScrollView style={styles.container}>
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
        </ScrollView>

        <View style={styles.buttons}>
            <Button 
                type={'secondary'}
                onPress={replayAll}
            >
                Replay quiz
            </Button>

            {incorrectCount !== 0 && (
                <Button 
                    onPress={replayFailed}
                    style={styles.button}
                >
                    Replay failed terms
                </Button>
            )}
        </View>
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