import { ScrollView, View as DefaultView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import layout from "../../constants/layout";
import Button from "../button";
import Text from "../text";
import View from "../view";
import { useAppSelector } from "../../redux/store";
import { selectQuizIds } from "../../redux/quiz/selectors";
import { QuizItem } from "./QuizItem";
import { QuizzesScreenProps } from "../../types";
import { useEffect } from "react";
import { useColors } from "../../hooks/useColors";

export default function Quizzes({ route }: QuizzesScreenProps) {
    const { text: { secondary } } = useColors();
    const navigation = useNavigation()
    const quizIds = useAppSelector(selectQuizIds);

    // Navigating to quiz if quizId is present
    useEffect(() => {
        if(!route.params?.quizId) return;

        navigation.navigate('Root', {
            screen: 'Quiz',
            params: { quizId: route.params.quizId }
        })
    }, [route.params?.quizId]);

    // Creataing new quiz
    const goToCreatePage = () => {
        navigation.navigate('Root', {
            screen: 'Create Quiz',
            params: {}
        })
    }

    return(
        <View safeAreaView>
            <ScrollView style={styles.content}>
                {quizIds.length === 0 && (
                    <Text>
                        Looks like you don't have any quizzes yet. Create one!
                    </Text>
                )}

                {quizIds.length !== 0 && (
                    <Text style={{
                        color: secondary,
                        ...styles.label
                    }}>
                        Current quizzes
                    </Text>
                )}

                {quizIds.map(quizId => (
                    <QuizItem 
                        id={quizId} 
                        key={quizId} 
                    />
                ))}
            </ScrollView>
            <Button 
                type={'secondary'}
                style={styles.button}
                onPress={goToCreatePage}
            >
                Create quiz
            </Button>
        </View>
    )
}
const styles = {
    container: {
        justifyContent: 'space-between' as 'space-between'
    },
    content: {
        padding: layout.spacing.primary
    },
    label: {
        fontWeight: '600' as '600',
        marginBottom: layout.spacing.secondary
    },
    button: {
        marginHorizontal: layout.spacing.primary
    }
}