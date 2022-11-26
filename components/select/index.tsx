import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { useState } from "react";
import Text from '../text';
import layout from '../../constants/layout';
import { useColors } from '../../hooks/useColors';

export type SelectItem = {
    text: string;
    id: string;
}

export default function Select({
    selectableItems, defaultActive, header,
    onChange, closeOnChange, allowEdit, onItemAdd,
    multiSelect, addHeader, onItemDelete
}: {
    selectableItems: SelectItem[];
    defaultActive?: string | string[];
    header?: string;
    onChange?: (items: string[]) => void;
    closeOnChange?: boolean;
    allowEdit?: boolean;
    onItemAdd?: (item: SelectItem) => void;
    onItemDelete: (id: string) => void;
    addHeader?: string;
    multiSelect?: boolean;
}) {
    const navigation = useNavigation();
    const { background: { secondary, tertiary } } = useColors();
    const [active, setActive] = useState(
        defaultActive ? (
            Array.isArray(defaultActive) ? defaultActive : [defaultActive]
        ) : [selectableItems[0].id]
    );
    const activeItems = selectableItems.filter(item => active.includes(item.id));
    const activeItemText = activeItems.map(item => item.text);

    const openModal = () => {
        navigation.navigate('Modal', {
            screen: 'Select Items',
            params: { 
                header: header,
                active: active,
                items: selectableItems,
                onChange: setActive,
                closeOnChange,
                allowEdit,
                onItemAdd,
                onItemDelete,
                addHeader,
                multiSelect
            }
        });
    }

    return(
        <TouchableOpacity
            onPress={openModal}
            style={{
                backgroundColor: secondary,
                borderColor: tertiary,
                ...styles.container
            }}
        >
            <Text>
                {activeItemText.join(', ') || 'Select an item...'}
            </Text>
            <MaterialIcons name="arrow-forward-ios" size={16} color="black" />
        </TouchableOpacity>
    )
}
const styles = {
    container: {
        padding: layout.spacing.primary,
        borderWidth: layout.borderWidth.primary,
        borderRadius: layout.borderRadius.secondary,
        flexDirection: 'row' as 'row',
        justifyContent: 'space-between' as 'space-between',
        alignItems: 'center' as 'center',
        width: '100%'
    }
}