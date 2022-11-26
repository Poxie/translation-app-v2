import { ReactElement } from 'react';
import { View as DefaultView, ScrollView, SafeAreaView } from 'react-native';
import { StyleProps } from "react-native-reanimated"
import { useColors } from '../../hooks/useColors';

export default function View({
    children, style, scrollView=false, contentContainerStyle,
    safeAreaView=false
}: {
    children: ReactElement[];
    scrollView?: boolean;
    contentContainerStyle?: StyleProps;
    safeAreaView?: boolean;
    style?: StyleProps;
}) {
    const { background: { primary } } = useColors();

    let ViewComponent;
    if(scrollView) ViewComponent = ScrollView;
    if(safeAreaView) ViewComponent = SafeAreaView;
    if(!ViewComponent) ViewComponent = DefaultView;

    return(
        <ViewComponent
            contentContainerStyle={contentContainerStyle}
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