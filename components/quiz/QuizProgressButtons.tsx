import { TouchableOpacity, View } from "react-native"
import layout from "../../constants/layout";
import { useColors } from "../../hooks/useColors";
import Text from "../text";

export const QuizProgressButtons: React.FC<{
    onCorrect: () => void;
    onIncorrect: () => void;
}> = () => {
    const { color: { red, green } } = useColors();

    return(
        <View style={styles.progressButtons}>
            <TouchableOpacity style={styles.button}>
                <Text style={{
                    color: green,
                    ...styles.text
                }}>
                    Yes, I was correct.
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={{
                    color: red,
                    ...styles.text
                }}>
                    No, I was incorrect.
                </Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = {
    progressButtons: {
        alignItems: 'center' as 'center',
        marginTop: 30 - layout.spacing.secondary
    },
    button: {
        padding: layout.spacing.secondary
    },
    text: {
        fontSize: 15,
        fontWeight: '600' as '600'
    }
}