import { ScrollView, View } from 'react-native';
import layout from '../../constants/layout';
import { useColors } from '../../hooks/useColors';
import { VocItem } from '../../types';
import Text from '../text';
import { Term } from './Term';

export const SearchResults: React.FC<{
    results: string[];
    query: string;
}> = ({ results, query }) => {
    const { background: { tertiary }, text: { secondary } } = useColors();

    if(!results.length) {
        return(
            <View style={styles.container}>
                <Text style={{
                    color: secondary,
                    ...styles.label
                }}>
                    No items were found matching "{query}".
                </Text>
            </View>
        )
    } 

    return(
        <ScrollView contentContainerStyle={styles.container}>
            <View style={{
                borderColor: tertiary,
                ...styles.labelContainer
            }}>
                <Text style={{
                    color: secondary,
                    borderColor: tertiary,
                    ...styles.label
                }}>
                    Displaying {results.length.toString()} results.
                </Text>
            </View>

            {results.map(result => (
                <Term 
                    id={result}
                    key={result}
                />
            ))}
        </ScrollView>
    )
}
const styles = {
    container: {
        padding: layout.spacing.primary
    },
    labelContainer: {
        borderBottomWidth: layout.borderWidth.secondary,
        paddingBottom: layout.spacing.primary,
        marginBottom: layout.spacing.secondary /( 2)
    },
    label: {
        fontWeight: '600' as '600',
    }
}