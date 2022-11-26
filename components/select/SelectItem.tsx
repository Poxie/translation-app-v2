import { TouchableOpacity, View, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import layout from '../../constants/layout';
import { useColors } from '../../hooks/useColors';
import Text from '../text';
import { SelectItem as SelectItemType } from './index';

export const SelectItem: React.FC<SelectItemType & {
    onPress: (id: string) => void;
    onDeletePress: (id: string) => void;
    isLast: boolean;
    active: boolean;
    isEditing: boolean;
}> = ({ text, id, onPress, isLast, active, isEditing, onDeletePress }) => {
    const { background: { secondary, tertiary }, text: { primary: textPrimary }, color: { red } } = useColors();

    return(
        <View style={styles.container}>
            <TouchableOpacity
                disabled={isEditing}
                onPress={() => onPress(id)}
                style={{
                    backgroundColor: secondary,
                    ...styles.button
                }}
            >
                <Text style={styles.text}>
                    {text}
                </Text>

                {active && !isEditing && (
                    <AntDesign 
                        style={styles.itemButton}
                        name="check" 
                        size={18} 
                        color={textPrimary} 
                    />
                )}

                {isEditing && (
                    <TouchableOpacity onPress={() => onDeletePress(id)}>
                        <Feather 
                            style={styles.itemButton} 
                            name="trash-2" 
                            size={18} 
                            color={red} 
                        />
                    </TouchableOpacity>
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
        flexDirection: 'row' as 'row',
        alignItems: 'center' as 'center',
        justifyContent: 'space-between' as 'space-between',
        width: '100%'
    },
    text: {
        padding: layout.spacing.primary
    },
    itemButton: {
        padding: layout.spacing.primary
    },
    divider: {
        width: Dimensions.get('screen').width - layout.spacing.primary * 4,
        height: 1,
        position: 'absolute' as 'absolute',
        bottom: 0
    }
}