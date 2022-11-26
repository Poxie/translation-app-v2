import { useNavigation } from '@react-navigation/native';
import layout from "../../constants/layout"
import { View as DefaultView, TouchableOpacity } from 'react-native';
import { SelectItemScreenProps } from "../../types"
import View from "../view"
import { SelectItem } from "./SelectItem"
import { useState } from "react";
import Text from '../text';

export const SelectItems: React.FC<SelectItemScreenProps> = ({ route: { params: { 
    items: _items, active: _active, onChange, 
    closeOnChange, allowAdd, onItemAdd
} } }) => {
    const navigation = useNavigation();
    const [active, setActive] = useState(_active.id);
    const [items, setItems] = useState(_items);

    const onPress = (id: string) => {
        onChange(id);
        if(closeOnChange) {
            navigation.goBack();
            return;
        }

        setActive(id);
    }
    const openAddModal = () => {
        if(!onItemAdd) return;

        const onSubmit = (text: string) => {
            const newItem = {
                id: Math.random().toString(),
                text
            }
            setItems(prev => [...prev, ...[newItem]]);
            onItemAdd(newItem);
            navigation.goBack();
        }

        navigation.navigate('Modal', {
            screen: 'Add Select Item',
            params: {
                onSubmit
            }
        })
    }

    return(
        <View style={styles.container}>
            <DefaultView style={styles.content}>
                {items.map((item, key) => (
                    <SelectItem 
                        {...item}
                        onPress={onPress}
                        isLast={key === items.length - 1}
                        active={item.id === active}
                        key={item.id}
                    />
                ))}
            </DefaultView>

            {allowAdd && (
                <TouchableOpacity 
                    onPress={openAddModal}
                    style={styles.addButton}
                >
                    <Text>
                        Add Item
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    )
}
const styles = {
    container: {
        padding: layout.spacing.primary
    },
    content: {
        borderRadius: layout.borderRadius.primary,
        overflow: 'hidden' as 'hidden'
    },
    addButton: {
        alignItems: 'center' as 'center',
        paddingVertical: layout.spacing.primary,
        marginTop: layout.spacing.primary
    }
}