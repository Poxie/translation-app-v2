import { useNavigation } from '@react-navigation/native';
import layout from "../../constants/layout"
import { View as DefaultView } from 'react-native';
import { SelectItemScreenProps } from "../../types"
import View from "../view"
import { SelectItem } from "./SelectItem"
import { useState } from "react";

export const SelectItems: React.FC<SelectItemScreenProps> = ({ route: { params: { items, active: _active, onChange, closeOnChange } } }) => {
    const navigation = useNavigation();
    const [active, setActive] = useState(_active.id);

    const onPress = (id: string) => {
        onChange(id);
        if(closeOnChange) {
            navigation.goBack();
            return;
        }

        setActive(id);
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
    }
}