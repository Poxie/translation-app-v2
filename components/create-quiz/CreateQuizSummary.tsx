import { ScrollView, View } from "react-native";
import layout from "../../constants/layout";
import { useColors } from "../../hooks/useColors";
import Button from "../button";
import Input from "../input";
import Text from "../text";
import { SelectedTerm } from "./SelectedTerm";

export const CreateQuizSummary: React.FC<{
    removeTerm: (termId: string) => void;
    termIds: string[];
    name: string;
}> = ({ removeTerm, termIds, name }) => {
    const { background: { secondary, tertiary }, text: { secondary: textSecondary } } = useColors();

    return(
        <>
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={{
                color: textSecondary,
                ...styles.label
            }}>
                Name
            </Text>

            <Input 
                onTextChange={() => {}}
                defaultValue={name}
                editable={false}
                containerStyle={styles.input}
            />

            <Text style={{
                color: textSecondary,
                ...styles.label
            }}>
                Terms
            </Text>

            <View style={{
                backgroundColor: secondary,
                borderColor: tertiary,
                ...styles.termContainer
            }}>
                {termIds.length === 0 && (
                    <Text>
                        No terms have been selected. You may not create a quiz with no terms.
                    </Text>
                )}

                {termIds.map((termId, key) => (
                    <SelectedTerm 
                        id={termId}
                        isLast={key === termIds.length - 1}
                        removeTerm={removeTerm}
                        key={termId}
                    />
                ))}
            </View>
        </ScrollView>

        <Button 
            style={styles.button}
            disabled={!termIds.length}
        >
            Create quiz
        </Button>
        </>
    )
}
const styles = {
    container: {
        padding: layout.spacing.primary
    },
    label: {
        marginBottom: layout.spacing.secondary,
        fontWeight: '600' as '600'
    },
    input: {
        marginBottom: layout.spacing.primary
    },
    termContainer: {
        padding: layout.spacing.primary,
        borderWidth: layout.borderWidth.primary,
        borderRadius: layout.borderRadius.secondary
    },
    button: {
        marginHorizontal: layout.spacing.primary
    }
}