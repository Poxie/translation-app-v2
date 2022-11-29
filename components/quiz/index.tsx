import { ScrollView, View as DefaultView } from "react-native";
import layout from "../../constants/layout";
import { useColors } from "../../hooks/useColors";
import { selectQuizById } from "../../redux/quiz/selectors";
import { useAppSelector } from "../../redux/store";
import { QuizScreenProps } from "../../types";
import Button from "../button";
import { SelectedTerm } from "../create-quiz/SelectedTerm";
import Text from "../text";
import View from "../view";

export default function Quiz({ route: { params: { quizId } }}: QuizScreenProps ) {
    const { background: { secondary, tertiary }, text: { secondary: textSecondary } } = useColors();
    const quiz = useAppSelector(state => selectQuizById(state, quizId));
    if(!quiz) return <Text>Quiz was not found.</Text>;

    return(
        <View safeAreaView>
            <ScrollView style={styles.content}>
                <>
                <Text style={{
                    color: textSecondary,
                    ...styles.label
                }}>
                    {quiz.termIds.length.toString()} terms
                </Text>

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
            </ScrollView>
            <Button style={styles.button}>
                Start quiz
            </Button>
        </View>
    )
}
const styles = {
    content: {
        padding: layout.spacing.secondary,
    },
    termContainer: {
        padding: layout.spacing.secondary,
        borderWidth: layout.borderWidth.secondary,
        borderRadius: layout.borderRadius.secondary
    },
    label: {
        fontWeight: '600' as '600',
        marginBottom: layout.spacing.secondary
    },
    button: {
        marginHorizontal: layout.spacing.primary
    }
}