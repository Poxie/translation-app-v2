import { ReactElement } from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleProps } from 'react-native-reanimated';
import layout from '../../constants/layout';
import { useColors } from '../../hooks/useColors';
import Text from '../text';

export default function Button({
    children, onPress, onLongPress, style, textStyle,
    type='primary'
}: {
    children: ReactElement | string;
    onPress?: () => void;
    onLongPress?: () => void;
    style?: StyleProps;
    textStyle?: StyleProps;
    type?: 'primary' | 'secondary';
}) {
    const { 
        background: { tertiary },
        color: { primary },  
        text: { light, secondary: secondaryText },
    } = useColors();

    const element = typeof children === 'string' ? (
        <Text style={{ 
            color: type === 'primary' ? light : secondaryText, 
            fontWeight: '600',
            ...textStyle
        }}>
            {children}
        </Text>
    ) : children;

    return(
        <TouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ 
                backgroundColor: type === 'primary' ? primary : tertiary,
                ...styles.container,
                ...style
            }}
        >
            {element}
        </TouchableOpacity>
    )
}
const styles = {
    container: {
        paddingHorizontal: layout.spacing.primary,
        paddingVertical: layout.spacing.secondary,
        borderRadius: layout.borderRadius.secondary
    }
}