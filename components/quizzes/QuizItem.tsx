import { TouchableOpacity, View } from "react-native";
import layout from "../../constants/layout";
import { useColors } from "../../hooks/useColors";
import { selectQuizById } from "../../redux/quiz/selectors";
import { useAppSelector } from "../../redux/store";
import Text from "../text";

export const QuizItem: React.FC<{
    id: string;
}> = ({ id }) => {
    const { background: { secondary, tertiary }, text: { secondary: textSecondary } } = useColors();
    const quiz = useAppSelector(state => selectQuizById(state, id));
    if(!quiz) return null;

    return(
        <TouchableOpacity style={{
            backgroundColor: secondary,
            borderColor: tertiary,
            ...styles.container
        }}>
            <Text style={{
                color: textSecondary,
                ...styles.name
            }}>
                {quiz.name}
            </Text>

            <Text>
                {quiz.termIds.length.toString()} terms
            </Text>
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
    name: {
        fontWeight: '600' as '600',
        marginBottom: 6,
        fontSize: 15,
    }
}