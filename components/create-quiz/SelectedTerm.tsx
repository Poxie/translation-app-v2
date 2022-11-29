import { Feather } from '@expo/vector-icons'; 
import { TouchableOpacity, View } from "react-native";
import layout from "../../constants/layout";
import { useColors } from '../../hooks/useColors';
import { useAppSelector } from "../../redux/store";
import { selectTermById } from "../../redux/voc/selectors";
import Text from "../text";

export const SelectedTerm: React.FC<{
    id: string;
    isLast: boolean;
    removeTerm?: (id: string) => void;
}> = ({ id, isLast, removeTerm }) => {
    const { color: { red } } = useColors();
    const term = useAppSelector(state => selectTermById(state, id));

    return(
        <View style={{
            ...styles.container,
            marginBottom: isLast ? 0 : layout.spacing.primary
        }}>
            <View>
                <Text style={styles.term}>
                    {term?.term}
                </Text>
                <Text style={{ fontStyle: term?.definition ? 'normal' : 'italic' }}>
                    {term?.definition || 'Term definition is missing.'}
                </Text>
            </View>

            {removeTerm && (
                <TouchableOpacity onPress={() => removeTerm(id)}>
                    <Feather
                        name="trash-2" 
                        size={18} 
                        color={red}
                        style={styles.removeButton}
                    />
                </TouchableOpacity>
            )}
        </View>
    )
}
const styles = {
    container: {
        marginBottom: layout.spacing.primary,
        flexDirection: 'row' as 'row',
        justifyContent: 'space-between' as 'space-between',
        alignItems: 'center' as 'center'
    },
    term: {
        fontWeight: '600' as '600',
        marginBottom: 2
    },
    removeButton: {
        padding: 8
    }
}