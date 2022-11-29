import { TouchableOpacity } from "react-native";
import layout from "../../constants/layout";
import Text from "../text";

export const QuizRevealedAnswer: React.FC<{
    hideAnswer: () => void;
    answer: string;
}> = ({ hideAnswer, answer }) => {
    return(
        <>
        <Text style={styles.label}>
            The correct answer is
        </Text>
        <Text style={styles.answer}>
            {answer}
        </Text>
        <TouchableOpacity 
            style={styles.hide}
            onPress={hideAnswer}
        >
            <Text style={styles.label}>
                Hide answer
            </Text>
        </TouchableOpacity>
        </>
    )
}
const styles = {
    answer: {
        fontWeight: '600' as '600',
        fontSize: 18,
        textAlign: 'center' as 'center',
        marginTop: layout.spacing.secondary
    },
    hide: {
        marginTop: layout.spacing.primary
    },
    label: {
        textAlign: 'center' as 'center'
    }
}