import Svg, { Path } from "react-native-svg"

export const AddIcon = (props: any) => {
    return(
        <Svg viewBox="0 0 24 24" {...props}>
            <Path d="M24 10H14V0h-4v10H0v4h10v10h4V14h10z" />
        </Svg>
    )
}