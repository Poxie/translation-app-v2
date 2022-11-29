import { View } from "react-native";
import layout from "../../constants/layout";
import { useAppSelector } from "../../redux/store";
import { selectTermById } from "../../redux/voc/selectors";
import Text from "../text";

export const SelectedTerm: React.FC<{
    id: string;
    isLast: boolean;
}> = ({ id, isLast }) => {
    const term = useAppSelector(state => selectTermById(state, id));

    return(
        <View style={{
            ...styles.container,
            marginBottom: isLast ? 0 : layout.spacing.primary
        }}>
            <Text style={styles.term}>
                {term?.term}
            </Text>
            <Text style={{ fontStyle: term?.definition ? 'normal' : 'italic' }}>
                {term?.definition || 'Term definition is missing.'}
            </Text>
        </View>
    )
}
const styles = {
    container: {
        marginBottom: layout.spacing.primary
    },
    term: {
        fontWeight: '600' as '600',
        marginBottom: 2
    }
}