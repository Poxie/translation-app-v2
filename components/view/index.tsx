import { View as DefaultView, ScrollView, SafeAreaView, ScrollViewProps } from 'react-native';
import { StyleProps } from "react-native-reanimated"
import { useColors } from '../../hooks/useColors';

export default function View({
    children, style, scrollView=false, contentContainerStyle,
    safeAreaView=false, contentInsetAdjustmentBehavior
}: {
    children: any;
    scrollView?: boolean;
    contentContainerStyle?: StyleProps;
    safeAreaView?: boolean;
    style?: StyleProps;
    contentInsetAdjustmentBehavior?: ScrollViewProps['contentInsetAdjustmentBehavior']
}) {
    const { background: { primary } } = useColors();

    let ViewComponent;
    if(scrollView) ViewComponent = ScrollView;
    if(safeAreaView) ViewComponent = SafeAreaView;
    if(!ViewComponent) ViewComponent = DefaultView;

    return(
        <ViewComponent
            contentContainerStyle={contentContainerStyle}
            contentInsetAdjustmentBehavior={contentInsetAdjustmentBehavior}
            style={{
                backgroundColor: primary,
                ...styles.container,
                ...style
            }}
        >
            {children}
        </ViewComponent>
    )
}
const styles = {
    container: {
        flex: 1
    }
}