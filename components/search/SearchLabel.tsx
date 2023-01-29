import { View } from 'react-native';
import { StyleProps } from 'react-native-reanimated';
import layout from '../../constants/layout';
import { useColors } from '../../hooks/useColors';
import Text from '../text';

export const SearchLabel: React.FC<{
    resultCount: number;
    query: string;
    style?: StyleProps;
}> = ({ query, resultCount, style }) => {
    const { background: { secondary }, text: { secondary: textSecondary } } = useColors();
    return(
        <View style={{
            borderColor: secondary,
            ...styles.labelContainer,
            ...style
        }}>
            <Text style={{
                color: textSecondary,
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