import { useNavigation } from '@react-navigation/native';
import layout from "../../constants/layout"
import { View as DefaultView, TouchableOpacity } from 'react-native';
import { SelectItemScreenProps } from "../../types"
import View from "../view"
import { SelectItem } from "./SelectItem"
import { useEffect, useRef, useState } from "react";
import Text from '../text';
import { useColors } from '../../hooks/useColors';

export const SelectItems: React.FC<SelectItemScreenProps> = ({ route: { params: { 
    items: _items, active: _active, onChange, 
    closeOnChange, allowEdit, onItemAdd, multiSelect,
    addHeader, onItemDelete, onAddClick
} } }) => {
    const navigation = useNavigation();
    const { background: { secondary, tertiary } } = useColors();
    const [active, setActive] = useState(_active);
    const [items, setItems] = useState(_items);
    const [isEditing, setIsEditing] = useState(false);
    const initial = useRef(true);

    // Updating header if items are editable
    useEffect(() => {
        if(!allowEdit || !items.length) {
            navigation.setOptions({
                headerRight: null
            })
            setIsEditing(false);
            return;
        }

        const toggleEdit = () => setIsEditing(!isEditing);

        navigation.setOptions({ 
            headerRight: () => (
                <TouchableOpacity onPress={toggleEdit}>
                    <Text>
                        {isEditing ? 'Done' : 'Edit'}
                    </Text>
                </TouchableOpacity>
            )
        })
    }, [allowEdit, isEditing, items.length]);

    // Updating parent on active items change
    useEffect(() => {
        onChange(active);

        if(closeOnChange && !initial.current) {
            navigation.goBack();
            return;
        }
        initial.current = false;
    }, [active]);

    const onDeletePress = (id: string) => {
        if(!onItemDelete) return;
        setItems(prev => prev.filter(item => item.id !== id));
        onItemDelete(id);
    }
    const onPress = (id: string) => {
        setActive(prev => {
            // If not multi select, set item id as active
            if(!multiSelect) {
                // If same id is pressed twice
                if(prev.includes(id)) return [];
                return [id];
            }

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
            <DefaultView style={{
                borderColor: tertiary,
                ...styles.content
            }}>
                {items.length === 0 && (
                    <Text 
                        style={{
                            backgroundColor: secondary,
                            borderColor: tertiary,
                            ...styles.empty
                        }}
                    >
                        There are no items here yet.
                    </Text>
                )}

                {items.map((item, key) => (
                    <SelectItem 
                        {...item}
                        onPress={onPress}
                        isLast={key === items.length - 1}
                        active={active.includes(item.id)}
                        onDeletePress={onDeletePress}
                        isEditing={isEditing}
                        key={item.id}
                    />
                ))}
            </DefaultView>

            {(isEditing || items.length === 0) && allowEdit && (
                <TouchableOpacity 
                    onPress={onAddClick || openAddModal}
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
        borderWidth: layout.borderWidth.secondary,
        overflow: 'hidden' as 'hidden'
    },
    addButton: {
        alignItems: 'center' as 'center',
        paddingVertical: layout.spacing.primary,
        marginTop: layout.spacing.primary
    },
    empty: {
        borderRadius: layout.borderRadius.primary,
        borderWidth: layout.borderWidth.primary,
        padding: layout.spacing.primary,
        textAlign: 'center' as 'center'
    }
}