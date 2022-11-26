import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View } from 'react-native';
import layout from '../../constants/layout';
import { useAppSelector } from '../../redux/store';
import { selectSelectors, selectTermById } from '../../redux/voc/selectors';
import { VocItem } from "../../types"
import Text from '../text';

export const SearchResult: React.FC<{
    id: string;
}> = ({ id }) => {
    const navigation = useNavigation();
    const item = useAppSelector(state => selectTermById(state, id));
    const selectors = useAppSelector(selectSelectors);
    if(!item) return null;
    
    const { term, definition, selectors: selectorIds } = item;
    const activeSelectors = (
        selectors
            .filter(selector => selectorIds?.includes(selector.id))
            .map(selector => selector.text)
    );

    const viewItem = () => {
        navigation.navigate('Modal', {
            screen: 'Edit Voc Item',
            params: { defaultItem: item, header: `View term`, type: 'term' }
        })
    }

    return(
        <TouchableOpacity 
            onPress={viewItem}
            style={styles.container}
        >
            <View style={styles.header}>
                <Text
                    style={{ 
                        fontStyle: !term ? 'italic' : 'normal',
                        ...styles.term
                    }}
                >
                    {term || 'Term name missing.'}
                </Text>
                {activeSelectors.length !== 0 && (
                    <Text style={styles.selectors}>
                        ({activeSelectors.join(', ')})
                    </Text>
                )}
            </View>
            <Text
                style={{ fontStyle: !definition ? 'italic' : 'normal' }}
            >
                {definition || 'Definition is missing.'}
            </Text>
        </TouchableOpacity>
    )
}
const styles = {
    container: {
        marginBottom: layout.spacing.primary
    },
    header: {
        marginBottom: 4,
        flexDirection: 'row' as 'row'
    },
    term: {
        fontWeight: '600' as '600'
    },
    selectors: {
        marginLeft: 6,
        fontStyle: 'italic' as 'italic',
        fontSize: 13
    }
}