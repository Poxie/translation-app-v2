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
    onChange, closeOnChange, allowAdd, onItemAdd
}: {
    selectableItems: SelectItem[];
    defaultActive?: string;
    header?: string;
    onChange?: (id: string) => void;
    closeOnChange?: boolean;
    allowAdd?: boolean;
    onItemAdd?: (item: SelectItem) => void;
}) {
    const navigation = useNavigation();
    const { background: { secondary, tertiary } } = useColors();
    const [active, setActive] = useState(defaultActive || selectableItems[0].id);
    const activeItem = selectableItems.find(item => item.id === active);

    const onItemChange = (id: string) => {
        setActive(id);
        if(onChange) {
            onChange(id);
        }
    }
    const openModal = () => {
        if(!activeItem) return;

        navigation.navigate('Modal', {
            screen: 'Select Items',
            params: { 
                header: header,
                active: activeItem,
                items: selectableItems,
                onChange: onItemChange,
                closeOnChange,
                allowAdd,
                onItemAdd
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
                {activeItem?.text}
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