import { Feather } from '@expo/vector-icons';
import { View } from "react-native";
import { PlayedTerm } from ".";
import layout from "../../constants/layout";
import { useColors } from '../../hooks/useColors';
import { useAppSelector } from "../../redux/store";
import { selectTermById } from "../../redux/voc/selectors";
import Text from "../text";

export const QuizResultItem: React.FC<{
    id: string;
    isLast: boolean;
    outcome?: PlayedTerm['outcome'];
}> = ({ id, isLast, outcome }) => {
    const { color: { red, green } } = useColors();
    const term = useAppSelector(state => selectTermById(state, id));

    return(
        <View style={{
            marginBottom: !isLast ? layout.spacing.primary : 0,
            ...styles.container
        }}>
            <View>
                <Text style={styles.term}>
                    {term?.term || ''}
                </Text>
                <Text>
                    {term?.definition || ''}
                </Text>
            </View>

            {outcome === 'correct' && (
                <Feather name="check-circle" size={24} color={green} />
            )}
            {outcome === 'incorrect' && (
                <Feather name="x-circle" size={24} color={red} />
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
        fontSize: 16,
        fontWeight: '600' as '600',
        marginBottom: 4
    }
}