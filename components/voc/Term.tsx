import { useNavigation } from '@react-navigation/native';
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
    const navigation = useNavigation();
    const term = useAppSelector(state => selectTermById(state, id));
    if(!term) return null;
    // const { selectable, activeItems, toggleActive } = useVocabulary();

    const editTerm = () => {
        navigation.navigate('Modal', {
            screen: 'Edit Voc Item',
            params: { defaultItem: term, type: 'term', header: 'View term' }
        })
    }

    return(
        <TouchableOpacity 
            style={styles.container}
            onPress={editTerm}
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