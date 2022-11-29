import { View } from "react-native";
import { PlayedTerm } from ".";
import { useAppSelector } from "../../redux/store";
import { selectTermById } from "../../redux/voc/selectors";
import Text from "../text";

export const QuizResultItem: React.FC<{
    id: string;
    outcome: PlayedTerm['outcome'];
}> = ({ id, outcome }) => {
    const term = useAppSelector(state => selectTermById(state, id));

    return(
        <View>
            <Text>
                {term?.term || ''}: {outcome}
            </Text>
        </View>
    )
}