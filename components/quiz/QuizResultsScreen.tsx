import { ScrollView, View } from "react-native"
import { PlayedTerm } from "."
import layout from "../../constants/layout";
import { useColors } from "../../hooks/useColors";
import Text from "../text"
import { QuizResultItem } from "./QuizResultItem";

export const QuizResultsScreen: React.FC<{
    results: PlayedTerm[];
}> = ({ results }) => {
    const { background: { secondary, tertiary }, text: { secondary: textSecondary } } = useColors();

    return(
        <ScrollView style={styles.container}>
            <Text style={{
                color: textSecondary,
                ...styles.header
            }}>
                Results
            </Text>
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
    )
}
const styles = {
    container: {
        padding: layout.spacing.primary
    },
    header: {
        fontWeight: '600' as '600',
        marginBottom: layout.spacing.secondary
    },
    resultContainer: {
        padding: layout.spacing.secondary,
        borderRadius: layout.borderRadius.secondary,
        borderWidth: layout.borderWidth.secondary
    }
}