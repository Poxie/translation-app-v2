import { View } from "react-native";
import Text from "../text";

export const SelectedTerms: React.FC<{
    termIds: string[];
}> = ({ termIds }) => {
    return(
        <View>
            {termIds.map(termId => (
                <Text>
                    {termId}
                </Text>
            ))}
        </View>
    )
}