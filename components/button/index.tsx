import { ReactElement } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { StyleProps } from 'react-native-reanimated';
import layout from '../../constants/layout';
import { useColors } from '../../hooks/useColors';
import Text from '../text';

export default function Button({
    children, onPress, onLongPress, style, textStyle,
    type='primary', disabled=false, loading=false
}: {
    children: ReactElement | string;
    onPress?: () => void;
    onLongPress?: () => void;
    style?: StyleProps;
    textStyle?: StyleProps;
    type?: 'primary' | 'secondary' | 'danger' | 'transparent';
    disabled?: boolean;
    loading?: boolean;
}) {
    const { 
        background: { tertiary },
        color: { primary, red },  
        text: { light, secondary: secondaryText },
    } = useColors();

    // Determining button colors
    let color = secondaryText;
    if(type === 'primary') color = light;
    if(type === 'danger') color = red;

    let backgroundColor = primary;
    if(type === 'secondary') backgroundColor = tertiary;
    if(['transparent', 'danger'].includes(type)) backgroundColor = 'transparent';

    // Creating button children
    const element = typeof children === 'string' ? (
        <Text style={{ 
            color: color, 
            fontWeight: '700',
            ...textStyle
        }}>
            {children}
        </Text>
    ) : children;

    return(
        <TouchableOpacity
            disabled={disabled || loading}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ 
                backgroundColor: backgroundColor,
                opacity: disabled ? .5 : 1,
                ...styles.container,
                ...style
            }}
        >
            {!loading ? element : (
                <ActivityIndicator 
                    color={type === 'primary' ? '#fff' : undefined} 
                />
            )}
        </TouchableOpacity>
    )
}
const styles = {
    container: {
        paddingHorizontal: layout.spacing.primary,
        paddingVertical: layout.spacing.primary,
        borderRadius: layout.borderRadius.secondary,
        alignItems: 'center' as 'center'
    }
}