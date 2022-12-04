import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View } from 'react-native';
import layout from '../../constants/layout';
import { useColors } from '../../hooks/useColors';
import { useAppSelector } from '../../redux/store';
import { selectLanguages, selectSelectors, selectTermById } from '../../redux/voc/selectors';
import { VocItem } from "../../types"
import Text from '../text';

export const SearchResult: React.FC<{
    id: string;
    onPress?: () => void;
}> = ({ id, onPress }) => {
    const { text: { secondary } } = useColors();
    const navigation = useNavigation();
    const item = useAppSelector(state => selectTermById(state, id));
    const selectors = useAppSelector(selectSelectors);
    const languages = useAppSelector(selectLanguages);
    const language = languages.find(language => language.id === item?.language);
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
            params: { id, header: `View term`, type: 'term' }
        })
    }

    return(
        <TouchableOpacity 
            onPress={onPress ? onPress : viewItem}
            style={styles.container}
        >
            <View style={styles.header}>
                <View style={styles.headerMain}>
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
                {language && (
                    <Text style={{
                        color: secondary,
                        ...styles.language
                    }}>
                        {language.text}
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
        marginBottom: layout.spacing.primary,
        flex: 1
    },
    header: {
        marginBottom: 4,
        flexDirection: 'row' as 'row',
        justifyContent: 'space-between' as 'space-between'
    },
    headerMain: {
        flexDirection: 'row' as 'row'
    },
    term: {
        fontWeight: '600' as '600'
    },
    selectors: {
        marginLeft: 6,
        fontStyle: 'italic' as 'italic',
        fontSize: 13
    },
    language: {
        marginLeft: 10,
        fontSize: 13
    }
}