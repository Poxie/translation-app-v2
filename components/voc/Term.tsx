import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity } from 'react-native';
import { useVoc } from '.';
import layout from '../../constants/layout';
import { useColors } from '../../hooks/useColors';
import { useAppSelector } from '../../redux/store';
import { selectTermById } from '../../redux/voc/selectors';
import Text from '../text';

export const Term: React.FC<{
    id: string;
}> = ({ id }) => {
    const { selectable, activeIds, setActive } = useVoc();
    const { text: { secondary } } = useColors();
    const navigation = useNavigation();
    const term = useAppSelector(state => selectTermById(state, id));
    const active = activeIds.includes(id);
    if(!term) return null;

    const editTerm = () => {
        navigation.navigate('Modal', {
            screen: 'Edit Voc Item',
            params: { defaultItem: term, type: 'term', header: 'View term' }
        })
    }

    return(
        <TouchableOpacity 
            style={styles.container}
            onPress={selectable ? () => setActive(id) : editTerm}
        >
            {selectable && (
                <View 
                    style={{
                        borderColor: !active ? secondary : 'transparent', 
                        backgroundColor: active ? secondary : 'transparent',
                        ...styles.checkbox
                    }} 
                />
            )}
            <Text
                style={{ fontStyle: !term.term ? 'italic' : 'normal' }}
            >
                {term.term || `Term name is missing. (Definition: ${term.definition})`}
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