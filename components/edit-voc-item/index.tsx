import { EditVocItemScreenProps } from "../../types";
import Text from "../text";
import View from "../view";

export default function EditVocItem({ route: { params: {
    defaultItem,
    type
} } }: EditVocItemScreenProps) {
    return(
        <View>
            <Text>
                {type}
            </Text>
        </View>
    )
}