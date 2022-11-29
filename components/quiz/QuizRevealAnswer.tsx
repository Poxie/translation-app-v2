import layout from "../../constants/layout";
import Button from "../button";
import Text from "../text"

export const QuizRevealAnswer: React.FC<{
    revealAnswer: () => void;
}> = ({ revealAnswer }) => {
    return(
        <>
        <Text style={styles.label}>
            When you are ready, you may reveal the answer.
        </Text>
        <Button 
            onPress={revealAnswer}
            type={'transparent'}
            style={styles.button}
        >
            Reveal answer
        </Button>
        </>
    )
}
const styles = {
    label: {
        textAlign: 'center' as 'center'
    },
    button: {
        marginHorizontal: layout.spacing.primary,
    }
}