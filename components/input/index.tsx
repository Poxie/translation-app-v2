import { TextInput } from 'react-native';
import layout from '../../constants/layout';
import { useColors } from '../../hooks/useColors';

export default function Input({
    onTextChange, placeholder, defaultValue
}: {
    onTextChange: (text: string) => void;
    placeholder?: string;
    defaultValue?: string;
}) {
    const { background: { secondary, tertiary } } = useColors();

    return(
        <TextInput 
            defaultValue={defaultValue || ''}
            placeholder={placeholder}
            onChangeText={onTextChange}
            style={{ 
                backgroundColor: secondary, 
                borderColor: tertiary, 
                ...styles.container
            }}
        />
    )
}

const styles = {
    container: {
        width: '100%',
        padding: layout.spacing.primary,
        borderWidth: 2,
        borderRadius: layout.borderRadius.secondary
    }
}