import { ScrollView, View as DefaultView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import layout from "../../constants/layout";
import Button from "../button";
import Text from "../text";
import View from "../view";

export default function Quizzes() {
    const navigation = useNavigation()
    const quizzes = [];

    const goToCreatePage = () => {
        navigation.navigate('Root', {
            screen: 'Create Quiz',
            params: {}
        })
    }

    return(
        <View safeAreaView>
            <ScrollView style={styles.content}>
                {quizzes.length === 0 && (
                    <Text>
                        Looks like you don't have any quizzes yet. Create one!
                    </Text>
                )}
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
    button: {
        marginHorizontal: layout.spacing.primary
    }
}