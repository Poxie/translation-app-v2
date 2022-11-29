import { useNavigation } from '@react-navigation/native';
import Text from "../text";
import View from "../view";

export default function CreateQuiz() {
    const navigation = useNavigation();

    return(
        <View>
            <Text>
                Create quiz
            </Text>
        </View>
    )
}