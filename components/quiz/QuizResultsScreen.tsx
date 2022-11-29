import { ScrollView, View } from "react-native"
import { PlayedTerm } from "."
import layout from "../../constants/layout";
import { useColors } from "../../hooks/useColors";
import Button from "../button";
import Text from "../text"
import { QuizResultItem } from "./QuizResultItem";

export const QuizResultsScreen: React.FC<{
    results: PlayedTerm[];
}> = ({ results }) => {
    const { background: { secondary, tertiary }, text: { secondary: textSecondary } } = useColors();
    const correctCount = results.filter(term => term.outcome === 'correct').length;

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
        </ScrollView>

        <View style={styles.buttons}>
            <Button 
                type={'secondary'}
                style={styles.button}
            >
                Replay quiz
            </Button>
            <Button>
                Replay failed terms
            </Button>
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
    buttons: {
        paddingHorizontal: layout.spacing.primary
    },
    button: {
        marginBottom: layout.spacing.secondary
    }
}