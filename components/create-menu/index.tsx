import { useRef } from "react"
import { useState } from "react"
import { Pressable, View } from "react-native"
import Animated, { EasingNode } from "react-native-reanimated"
import { AddIcon } from "../../assets/icons/AddIcon";
import { useColors } from "../../hooks/useColors";
import { CreateMenuOptions } from "./CreateMenuOptions";

export default function CreateMenu() {
    const { background: { primary, tertiary }, text: { primary: textPrimary } } = useColors();
    const [active, setActive] = useState(false);
    const rotation = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    const toggleActive = () => {
        Animated.timing(rotation, {
            toValue: active ? 0 : 1,
            duration: 100,
            easing: EasingNode.linear
        }).start();
        Animated.timing(opacity, {
            toValue: active ? 0 : 1,
            duration: 100,
            easing: EasingNode.linear
        }).start();

        setActive(!active);
    }

    const currentRotation = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '45deg']
    })

    return(
        <>
            <Pressable onPress={toggleActive} style={styles.backdrop} pointerEvents={active ? 'auto' : 'none'}>
                <Animated.View style={[styles.backdropActive, { opacity }]} />
            </Pressable>

            <CreateMenuOptions 
                active={active} 
                toggleActive={toggleActive} 
            />

            <View style={{ zIndex: 2 }}>
                <Pressable 
                    onPress={toggleActive} 
                    style={{
                        backgroundColor: tertiary,
                        ...styles.addContainer
                    }}>
                    <Animated.View style={{ transform: [{ rotate: currentRotation }] as any }}>
                        <AddIcon 
                            style={{ 
                                width: 25, 
                                height: 25, 
                                fill: textPrimary 
                            }} 
                        />
                    </Animated.View>
                </Pressable>
            </View>
        </>
    )
}

const styles = {
    backdrop: {
        position: 'absolute' as 'absolute',
        left: 0,
        top: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: .5
    },
    backdropActive: {
        backgroundColor: 'black',
        width: '100%',
        height: '100%'
    },
    addContainer: {
        position: 'absolute' as 'absolute',
        zIndex: 2,
        right: 18,
        bottom: 18,
        width: 58,
        height: 58,
        alignItems: 'center' as 'center',
        justifyContent: 'center' as 'center',
        borderRadius: 120,
        elevation: 3,
        shadowOpacity: 0.3,
        shadowRadius: 6,
        shadowOffset: {
            height: 2,
            width: 0,
        },
    }
}