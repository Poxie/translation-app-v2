import layout from '../../constants/layout';
import { View, TouchableOpacity } from 'react-native';
import { useAppSelector } from '../../redux/store';
import { selectSelectors, selectTermById } from '../../redux/voc/selectors';
import Text from '../text';

export const SearchTermResult: React.FC<{
    id: string;
    onPress: (id: string) => void;
}> = ({ id, onPress }) => {
    const item = useAppSelector(state => selectTermById(state, id));
    const selectors = useAppSelector(selectSelectors);
    if(!item) return null;

    const { term, definition, selectors: selectorIds } = item;
    const activeSelectors = (
        selectors
            .filter(selector => selectorIds?.includes(selector.id))
            .map(selector => selector.text)
    );
    return(
        <TouchableOpacity 
            style={styles.container}
            onPress={() => onPress(id)}
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
                {activeSelectors?.length !== 0 && (
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