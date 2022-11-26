import { View, TouchableOpacity } from 'react-native';
import layout from '../../constants/layout';
import { useColors } from '../../hooks/useColors';
import { useAppSelector } from '../../redux/store';
import { selectTermById } from '../../redux/voc/selectors';
import Text from '../text';

export const Term: React.FC<{
    id: string;
}> = ({ id }) => {
    const colors = useColors();
    const term = useAppSelector(state => selectTermById(state, id));
    if(!term) return null;
    // const { selectable, activeItems, toggleActive } = useVocabulary();

    return(
        <TouchableOpacity 
            style={styles.container}
        >
            <View 
                style={[
                    styles.checkbox,
                    // { 
                    //     borderColor: !active ? colors.textSecondary : 'transparent', 
                    //     backgroundColor: active ? colors.textSecondary : 'transparent' 
                    // }
                ]} 
            />
            <Text>
                {term.term}
            </Text>
        </TouchableOpacity>
    )
}
const styles = {
    container: {
        paddingVertical: layout.spacing.secondary,
        flexDirection: 'row' as 'row',
        alignItems: 'center' as 'center'
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderRadius: 4,
        marginRight: layout.spacing.primary
    }
}