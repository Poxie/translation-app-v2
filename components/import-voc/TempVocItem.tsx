import { Feather } from '@expo/vector-icons'; 
import { View } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import layout from "../../constants/layout";
import { useColors } from '../../hooks/useColors';
import { VocItem } from "../../types";
import Text from "../text";

export const TempVocItem: React.FC<VocItem & {
    isLast: boolean;
    onItemRemove: ((id: string) => void) | undefined;
}> = ({ id, term, definition, isLast, onItemRemove }) => {
    const { color: { red } } = useColors();

    return(
        <View style={{
            marginBottom: !isLast ? layout.spacing.primary : 0,
            ...styles.container
        }}>
            <View>
                <Text style={styles.term}>
                    {term}
                </Text>
                <Text>
                    {definition}
                </Text>
            </View>

            {onItemRemove && (
                <TouchableOpacity onPress={() => onItemRemove(id)}>
                    <Feather 
                        style={styles.button} 
                        name="trash-2" 
                        size={18} 
                        color={red} 
                    />
                </TouchableOpacity>
            )}
        </View>
    )
}
const styles = {
    container: {
        flexDirection: 'row' as 'row',
        justifyContent: 'space-between' as 'space-between',
        alignItems: 'center' as 'center'
    },
    term: {
        marginBottom: 4,
        fontWeight: '600' as '600'
    },
    button: {
        padding: 8
    }
}