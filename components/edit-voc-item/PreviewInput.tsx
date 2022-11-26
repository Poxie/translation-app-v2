import React from "react";
import layout from "../../constants/layout"
import { View } from 'react-native';
import { useColors } from "../../hooks/useColors"
import Text from "../text";

export const PreviewInput: React.FC<{
    text: string;
    label: string;
}> = ({ text, label }) => {
    const { background: { secondary, tertiary }, text: { secondary: textSecondary } } = useColors();

    return(
        <View style={styles.container}>
            <Text style={{
                color: textSecondary,
                ...styles.label
            }}>
                {label}
            </Text>
            <View style={{
                backgroundColor: secondary,
                borderColor: tertiary,
                ...styles.previewText
            }}>
                <Text style={{ 
                    fontStyle: !text ? 'italic' : 'normal',
                }}>
                    {text || 'Not provided.'}
                </Text>
            </View>
        </View>
    )
}
const styles = {
    container: {
        marginBottom: layout.spacing.primary
    },
    label: {
        marginBottom: layout.spacing.secondary,
        fontWeight: '600' as '600'
    },
    previewText: {
        padding: layout.spacing.primary,
        borderWidth: layout.borderWidth.primary,
        borderRadius: layout.borderRadius.secondary
    }
}