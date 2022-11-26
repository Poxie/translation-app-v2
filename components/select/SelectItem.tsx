import { TouchableOpacity, View, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import layout from '../../constants/layout';
import { useColors } from '../../hooks/useColors';
import Text from '../text';
import { SelectItem as SelectItemType } from './index';

export const SelectItem: React.FC<SelectItemType & {
    onPress: (id: string) => void;
    isLast: boolean;
    active: boolean;
}> = ({ text, id, onPress, isLast, active }) => {
    const { background: { secondary, tertiary }, text: { primary: textPrimary } } = useColors();

    return(
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => onPress(id)}
                style={{
                    backgroundColor: secondary,
                    ...styles.button
                }}
            >
                <Text>
                    {text}
                </Text>

                {active && (
                    <AntDesign name="check" size={18} color={textPrimary} />
                )}
            </TouchableOpacity>
            {!isLast && (
                <View 
                    style={{
                        backgroundColor: tertiary,
                        ...styles.divider
                    }}
                />
            )}
        </View>
    )
}
const styles = {
    container: {
        alignItems: 'center' as 'center',
        position: 'relative' as 'relative'
    },
    button: {
        padding: layout.spacing.primary,
        flexDirection: 'row' as 'row',
        alignItems: 'center' as 'center',
        justifyContent: 'space-between' as 'space-between',
        width: '100%'
    },
    divider: {
        width: Dimensions.get('screen').width - layout.spacing.primary * 4,
        height: 1,
        position: 'absolute' as 'absolute',
        bottom: 0
    }
}