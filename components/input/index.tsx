import { TextInput, View } from 'react-native';
import { StyleProps } from 'react-native-reanimated';
import layout from '../../constants/layout';
import { useColors } from '../../hooks/useColors';
import Text from '../text';

export default function Input({
    onTextChange, placeholder, defaultValue,
    label, containerStyle
}: {
    onTextChange: (text: string) => void;
    placeholder?: string;
    defaultValue?: string;
    label?: string;
    containerStyle?: StyleProps; 
}) {
    const { background: { secondary, tertiary }, text: { secondary: textSecondary } } = useColors();

    return(
        <View style={containerStyle}>
            {label && (
                <Text style={{
                    color: textSecondary,
                    ...styles.label
                }}>
                    {label}
                </Text>
            )}
            <TextInput 
                defaultValue={defaultValue || ''}
                placeholder={placeholder}
                onChangeText={onTextChange}
                style={{ 
                    backgroundColor: secondary, 
                    borderColor: tertiary, 
                    ...styles.input
                }}
            />
        </View>
    )
}

const styles = {
    input: {
        width: '100%',
        padding: layout.spacing.primary,
        borderWidth: layout.borderWidth.primary,
        borderRadius: layout.borderRadius.secondary
    },
    label: {
        marginBottom: layout.spacing.secondary,
        fontWeight: '600' as '600'
    }
}