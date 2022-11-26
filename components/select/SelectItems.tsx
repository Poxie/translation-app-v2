import { SelectItemScreenProps } from "../../types"
import Text from "../text"
import View from "../view"

export const SelectItems: React.FC<SelectItemScreenProps> = ({ route: { params: { items, active, onChange } } }) => {
    return(
        <View>
            {items.map(item => (
                <Text key={item.id}>
                    {item.text}
                </Text>
            ))}
        </View>
    )
}