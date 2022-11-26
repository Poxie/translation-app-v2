import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { useState } from "react";
import Text from '../text';
import layout from '../../constants/layout';
import { useColors } from '../../hooks/useColors';
import { StyleProps } from 'react-native-reanimated';

export type SelectItem = {
    text: string;
    id: string;
}

export default function Select({
    selectableItems, defaultActive, header,
    onChange, closeOnChange, allowEdit, onItemAdd,
    multiSelect, addHeader, onItemDelete, label,
    containerStyle, placeholder, onAddClick
}: {
    selectableItems: SelectItem[];
    defaultActive?: string | string[];
    header?: string;
    onChange?: (items: string[]) => void;
    closeOnChange?: boolean;
    allowEdit?: boolean;
    onItemAdd?: (item: SelectItem) => void;
    onItemDelete?: (id: string) => void;
    addHeader?: string;
    multiSelect?: boolean;
    label?: string;
    containerStyle?: StyleProps;
    placeholder?: string;
    onAddClick?: () => void;
}) {
    const navigation = useNavigation();
    const { background: { secondary, tertiary }, text: { secondary: textSecondary } } = useColors();
    const [active, setActive] = useState(
        defaultActive ? (
            Array.isArray(defaultActive) ? defaultActive : [defaultActive]
        ) : []
    );
    const activeItems = selectableItems.filter(item => active.includes(item.id));
    const activeItemText = activeItems.map(item => item.text);

    const handleChange = (ids: string[]) => {
        setActive(ids);
        if(onChange) {
            onChange(ids);
        }
    }

    const openModal = () => {
        navigation.navigate('Modal', {
            screen: 'Select Items',
            params: { 
                header: header,
                active: active,
                items: selectableItems,
                onChange: handleChange,
                closeOnChange,
                allowEdit,
                onItemAdd,
                onItemDelete,
                addHeader,
                multiSelect,
                onAddClick
            }
        });
    }

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
            
            <TouchableOpacity
                onPress={openModal}
                style={{
                    backgroundColor: secondary,
                    borderColor: tertiary,
                    ...styles.button
                }}
            >
                <Text>
                    {activeItemText.join(', ') || placeholder || 'Select an item...'}
                </Text>
                <MaterialIcons name="arrow-forward-ios" size={16} color="black" />
            </TouchableOpacity>
        </View>
    )
}
const styles = {
    button: {
        padding: layout.spacing.primary,
        borderWidth: layout.borderWidth.primary,
        borderRadius: layout.borderRadius.secondary,
        flexDirection: 'row' as 'row',
        justifyContent: 'space-between' as 'space-between',
        alignItems: 'center' as 'center',
        width: '100%'
    },
    label: {
        marginBottom: layout.spacing.secondary,
        fontWeight: '600' as '600'
    }
}