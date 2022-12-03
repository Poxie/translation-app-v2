import { useEffect, useRef, useState } from "react";
import { Dimensions, View } from "react-native"
import Animated, { EasingNode } from "react-native-reanimated";
import layout from "../../constants/layout";
import { useColors } from "../../hooks/useColors";
import Text from "../text";

export const QuizProgressBar: React.FC<{
    index: number;
    count: number;
}> = ({ index, count }) => {
    const { color: { primary }, background: { tertiary }, text: { secondary } } = useColors();
    const percentage = Math.floor((index / count) * 100);
    const progress = useRef(new Animated.Value(0)).current;

    const progressInterpolator = progress.interpolate({
        inputRange: [0, count],
        outputRange: [0, Dimensions.get('window').width - layout.spacing.primary * 2]
    })

    useEffect(() => {
        Animated.timing(progress, {
            toValue: index,
            duration: 400,
            easing: EasingNode.ease
        }).start();
    }, [index]);

    return(
        <View style={{
            borderColor: tertiary,
            ...styles.container
        }}>
            <View style={{
                backgroundColor: tertiary,
                ...styles.progress
            }}>
                <Animated.View style={{
                    ...styles.bar,
                    backgroundColor: primary,
                    width: progressInterpolator,
                }} />
            </View>
            <View style={styles.labels}>
                <Text style={{
                    color: secondary,
                    ...styles.label
                }}>
                    {`${percentage}%`}
                </Text>
                <Text style={{
                    color: secondary,
                    ...styles.label
                }}>
                    {index.toString()}/{count.toString()} terms
                </Text>
            </View>
        </View>
    )
}
const styles = {
    container: {
        padding: layout.spacing.primary,
        marginBottom: layout.spacing.primary,
        borderBottomWidth: layout.borderWidth.secondary,
    },
    progress: {
        position: 'relative' as 'relative',
        marginBottom: layout.spacing.secondary,
        borderRadius: 120,
    },
    bar: {
        height: 6,
        width: '100%',
        borderRadius: 120,
    },
    labels: {
        flexDirection: 'row' as 'row',
        justifyContent: 'space-between' as 'space-between'
    },
    label:{
        fontSize: 12,
        fontWeight: '600' as '600',
    }
}