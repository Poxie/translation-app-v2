import { Text as DefaultText } from 'react-native';
import { StyleProps } from 'react-native-reanimated';
import { useColors } from '../../hooks/useColors';

export default function Text({
    children, style, type='primary'
}: {
    children?: string | string[];
    style?: StyleProps;
    type?: 'primary' | 'secondary'
}) {
    const { text: { primary, secondary } } = useColors();
    
    return(
        <DefaultText
            style={{
                color: type === 'primary' ? primary : secondary,
                ...styles.container,
                ...style
            }}
        >
            {children}
        </DefaultText>
    )
}
const styles = {
    container: {

    }
}