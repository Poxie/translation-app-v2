import { View } from "react-native";
import Text from "../text";

export const QuizItem: React.FC<{
    id: string;
}> = ({ id }) => {
    return(
        <View>
            <Text>
                {id}
            </Text>
        </View>
    )
}