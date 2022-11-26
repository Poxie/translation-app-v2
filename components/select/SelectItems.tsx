import { useNavigation } from '@react-navigation/native';
import layout from "../../constants/layout"
import { View as DefaultView, TouchableOpacity } from 'react-native';
import { SelectItemScreenProps } from "../../types"
import View from "../view"
import { SelectItem } from "./SelectItem"
import { useEffect, useState } from "react";
import Text from '../text';

export const SelectItems: React.FC<SelectItemScreenProps> = ({ route: { params: { 
    items: _items, active: _active, onChange, 
    closeOnChange, allowAdd, onItemAdd, multiSelect,
    addHeader
} } }) => {
    const navigation = useNavigation();
    const [active, setActive] = useState(_active);
    const [items, setItems] = useState(_items);

    // Updating parent on active items change
    useEffect(() => {
        onChange(active);
    }, [active]);

    const onPress = (id: string) => {
        setActive(prev => {
            // If not multi select, set item id as active
            if(!multiSelect) return [id];

            let newItems = [...prev];

            // If item already exists
            if(prev.includes(id)) {
                newItems = newItems.filter(item => item !== id);
            } 
            // Else add id to active array
            else {
                newItems = [...newItems, ...[id]]
            }

            return newItems;
        });

        if(closeOnChange) {
            navigation.goBack();
            return;
        }
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
                onSubmit,
                header: addHeader
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
                        active={active.includes(item.id)}
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