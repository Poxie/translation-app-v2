import { useRef, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { View, TouchableOpacity, Pressable } from 'react-native';
import Animated, { EasingNode } from 'react-native-reanimated';
import { useColors } from '../../hooks/useColors';
import { useAppSelector } from "../../redux/store"
import { selectCategoryById, selectCategoryChildren } from "../../redux/voc/selectors"
import Text from "../text"
import { Term } from './Term';
import layout from '../../constants/layout';

export const Category: React.FC<{
    id: string;
    isChild?: boolean;
}> = ({ id, isChild }) => {
    const category = useAppSelector(state => selectCategoryById(state, id));
    const children = useAppSelector(state => selectCategoryChildren(state, id))
    const { background: { tertiary }, text: { secondary } } = useColors();
    const hasItems = children.length > 0;
    const [open, setOpen] = useState(false);
    const rotation = useRef(new Animated.Value(0)).current;
    const height = useRef(new Animated.Value(0)).current;

    // Updating visible height
    const toggleChildren = (shouldUpdateActive=false) => {
        Animated.timing(rotation, {
            toValue: open ? 0 : 1,
            duration: 100,
            easing: EasingNode.linear
        }).start();
        Animated.timing(height, {
            toValue: open ? 0 : 1,
            duration: 150,
            easing: EasingNode.linear,
        }).start();

        setOpen(!open);
    }

    // Changing rotation of arrow
    const currentRotation = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg']
    })
    const currentHeight = height.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 550]
    })

    return(
        <>
            <TouchableOpacity 
                onPress={hasItems ? () => toggleChildren(false) : () => toggleChildren(true)} 
                style={[styles.header, isChild && styles.childHeader]}
            >
                <View style={styles.headerLeft}>
                    <Pressable 
                        style={[
                            styles.checkbox,
                            // { 
                            //     borderColor: !active ? textSecondary : 'transparent', 
                            //     backgroundColor: active ? textSecondary : 'transparent' 
                            // },
                            isChild && styles.childCheckbox
                        ]} 
                        // onPress={() => toggleActive([...[id], ...childIds])}
                    />
                    <Text style={[styles.headerText, isChild && styles.childText]}>
                        {category?.title}
                    </Text>
                </View>
                <Animated.View style={{ transform: [{ rotate: currentRotation }] as any }}>
                    <MaterialIcons name="arrow-forward-ios" size={15} color={secondary} />
                </Animated.View>
            </TouchableOpacity>
            <Animated.View style={{ maxHeight: currentHeight as any, overflow: 'hidden' }}>
                <View 
                    style={{ 
                        borderTopWidth: hasItems ? 1 : 0, 
                        borderColor: tertiary,
                        paddingVertical: 10
                    }}
                >
                    <View style={styles.childContainer}>
                        {!hasItems && (
                            <Text>
                                This category has no items.
                            </Text>
                        )}

                        {children.map(child => {
                            const Component = child.type === 'term' ? Term : Category;

                            return(
                                <Component 
                                    {...child}
                                    isChild={true}
                                    key={child.id}
                                />
                            )
                        })}
                    </View>
                </View>
            </Animated.View>
        </>
    )
}
const styles = {
    headerLeft: {
        flexDirection: 'row' as 'row',
        alignItems: 'center' as 'center',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: layout.borderWidth.secondary,
        borderRadius: layout.borderRadius.secondary,
        marginRight: layout.spacing.primary
    },
    childCheckbox: {
        width: 20,
        height: 20,
        borderRadius: 4
    },
    header: {
        padding: layout.spacing.secondary,
        flexDirection: 'row' as 'row',
        justifyContent: 'space-between' as 'space-between',
        alignItems: 'center' as 'center'
    },
    headerText: {
        fontWeight: '600' as '600',
        fontSize: 16
    },
    childHeader: {
        paddingHorizontal: 0,
    },
    childText: {
        fontSize: 14
    },
    childContainer: {
        paddingHorizontal: 25
    }
}