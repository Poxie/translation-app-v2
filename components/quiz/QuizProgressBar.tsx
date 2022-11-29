import { View } from "react-native"
import layout from "../../constants/layout";
import { useColors } from "../../hooks/useColors";
import Text from "../text";

export const QuizProgressBar: React.FC<{
    index: number;
    count: number;
}> = ({ index, count }) => {
    const { color: { primary }, background: { tertiary }, text: { secondary } } = useColors();
    const percentage = (index / count) * 100;
    const width = `${percentage}%`;

    return(
        <View style={{
            borderColor: tertiary,
            ...styles.container
        }}>
            <View style={{
                backgroundColor: tertiary,
                ...styles.progress
            }}>
                <View style={{
                    ...styles.bar,
                    backgroundColor: primary,
                    width: width,
                }} />
            </View>
            <View style={styles.labels}>
                <Text style={{
                    color: secondary,
                    ...styles.label
                }}>
                    {width}
                </Text>
                <Text style={{
                    color: secondary,
                    ...styles.label
                }}>
                    {index.toString()}/{count.toString()} terms
                </Text>
            </View>
        </View>
    )
}
const styles = {
    container: {
        padding: layout.spacing.primary,
        marginBottom: layout.spacing.primary,
        borderBottomWidth: layout.borderWidth.secondary,
    },
    progress: {
        position: 'relative' as 'relative',
        marginBottom: layout.spacing.secondary,
        borderRadius: 120,
    },
    bar: {
        height: 6,
        width: '100%',
        borderRadius: 120,
    },
    labels: {
        flexDirection: 'row' as 'row',
        justifyContent: 'space-between' as 'space-between'
    },
    label:{
        fontSize: 12,
        fontWeight: '600' as '600',
    }
}