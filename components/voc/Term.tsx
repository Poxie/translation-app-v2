import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity } from 'react-native';
import { useVoc } from '.';
import layout from '../../constants/layout';
import { useColors } from '../../hooks/useColors';
import { useAppSelector } from '../../redux/store';
import { selectTermById } from '../../redux/voc/selectors';
import { SearchResult } from '../search/SearchResult';
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
            params: { id, type: 'term', header: 'View term' }
        })
    }

    return(
        <TouchableOpacity 
            style={styles.container}
            onPress={selectable ? () => setActive(id) : editTerm}
        >
            <SearchResult 
                id={term.id}
                onPress={selectable ? () => setActive(id) : editTerm}
            />
            {selectable && (
                <View 
                    style={{
                        borderColor: !active ? secondary : 'transparent', 
                        backgroundColor: active ? secondary : 'transparent',
                        ...styles.checkbox
                    }} 
                />
            )}
        </TouchableOpacity>
    )
}
const styles = {
    container: {
        // width: '100%',
        flexDirection: 'row' as 'row',
        // alignItems: 'center' as 'center',
        // justifyContent: 'space-between' as 'space-between'
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderRadius: 4,
        marginTop: layout.spacing.secondary
    }
}