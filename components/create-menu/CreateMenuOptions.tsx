import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef } from "react";
import { TouchableOpacity } from 'react-native';
import Animated, { EasingNode } from "react-native-reanimated"
import layout from "../../constants/layout";
import { useColors } from "../../hooks/useColors";
import Text from "../text";

export const CreateMenuOptions: React.FC<{ active: boolean, toggleActive: () => void }> = ({ active, toggleActive }) => {
    const { background: { primary, tertiary } } = useColors();
    const navigation = useNavigation();
    const scale = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(opacity, {
            toValue: active ? 1 : 0,
            duration: 100,
            easing: EasingNode.linear
        }).start();
        Animated.timing(scale, {
            toValue: active ? 1 : .7,
            duration: 100,
            easing: EasingNode.linear
        }).start();
    }, [active]);

    const handlePress = (type: 'term' | 'category') => {
        navigation.navigate('Modal', {
            screen: 'Edit Voc Item',
            params: { type }
        })
        toggleActive();
    }

    const items = [
        { text: 'Create Term', onPress: () => handlePress('term') },
        { text: 'Create Category', onPress: () => handlePress('category') }
    ];
    return(
        <Animated.View
            style={{
                backgroundColor: primary,
                opacity,
                transform: [{ scale }],
                ...styles.options
            }}
            pointerEvents={active ? 'auto' : 'none'}
        >
            {items.map((item, key) => {
                const isLast = key === items.length - 1;
                return(
                    <TouchableOpacity
                        style={{
                            borderColor: !isLast ? tertiary : 'transparent',
                            ...styles.option
                        }}
                        onPress={item.onPress}
                        key={item.text}
                    >
                        <Text style={styles.optionText}>
                            {item.text}
                        </Text>
                    </TouchableOpacity>
                )
            })}
        </Animated.View>
    )
}

const styles = {
    options: {
        borderRadius: layout.borderRadius.primary,
        position: 'absolute' as 'absolute',
        zIndex: 2,
        bottom: 90,
        right: 18,
        minWidth: 170,
    },
    option: {
        padding: layout.spacing.primary,
        borderBottomWidth: layout.borderWidth.secondary
    },
    optionText: {
        fontWeight: '600' as '600'
    }
}