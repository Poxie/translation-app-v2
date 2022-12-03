import { useNavigation } from '@react-navigation/native';
import { ScrollView, View } from "react-native";
import layout from "../../constants/layout";
import { useColors } from "../../hooks/useColors";
import { addQuiz as addQuizInStorage } from '../../logic';
import { addQuiz } from '../../redux/quiz/actions';
import { useAppDispatch } from '../../redux/store';
import { Quiz } from '../../types';
import Button from "../button";
import Input from "../input";
import Text from "../text";
import { SelectedTerm } from "./SelectedTerm";

export const CreateQuizSummary: React.FC<{
    removeTerm: (termId: string) => void;
    setName: (name: string) => void;
    termIds: string[];
    name: string;
}> = ({ removeTerm, setName, termIds, name }) => {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const { background: { secondary, tertiary }, text: { secondary: textSecondary } } = useColors();

    const createQuiz = async () => {
        const id = Math.random().toString();
        const quiz: Quiz = {
            id,
            name,
            termIds,
            playedTerms: []
        }

        dispatch(addQuiz(quiz));
        await addQuizInStorage(quiz);

        // Navigating to created quiz
        navigation.navigate('Root', {
            screen: 'Quizzes',
            params: { quizId: id }
        })
    }

    const addTerm = () => {
        navigation.navigate('Root', {
            screen: 'Voc',
            params: { 
                header: 'Select terms', 
                pathAfterSelection: 'Create Quiz', 
                selectable: true,
                defaultActiveIds: termIds
            }
        })
    }

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
                onTextChange={setName}
                defaultValue={name}
                containerStyle={styles.input}
                placeholder={'Quiz name cannot be empty...'}
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

            <Button 
                type={'transparent'}
                onPress={addTerm}
            >
                Add term
            </Button>
        </ScrollView>

        <Button 
            style={styles.button}
            disabled={!termIds.length || !name}
            onPress={createQuiz}
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