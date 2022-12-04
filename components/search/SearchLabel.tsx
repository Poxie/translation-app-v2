import { View } from 'react-native';
import layout from '../../constants/layout';
import { useColors } from '../../hooks/useColors';
import Text from '../text';

export const SearchLabel: React.FC<{
    resultCount: number;
    query: string;
}> = ({ query, resultCount }) => {
    const { background: { tertiary }, text: { secondary } } = useColors();
    return(
        <View style={{
            borderColor: tertiary,
            ...styles.labelContainer
        }}>
            <Text style={{
                color: secondary,
                ...styles.label
            }}>
                {!query ? (
                    'Enter something above to search.'
                ) : (
                    resultCount ? (
                        `Displaying ${resultCount} results.`
                    ) : (
                        `No results were found matching "${query}"`
                    )
                )}
            </Text>
        </View>
    )
}
const styles = {
    labelContainer: {
        borderBottomWidth: layout.borderWidth.secondary,
        paddingBottom: layout.spacing.primary
    },
    label: {
        fontWeight: '600' as '600'
    }
}