import React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

export const VocIcon = (props: any) => {
    return(
        <Svg viewBox="0 0 24 24" width="41" height="41" {...props}>
            <Path d="M5.495 2H22V0H5a3 3 0 0 0-3 3v18a3 3 0 0 0 3 3h17V4H5.495c-1.375 0-1.375-2 0-2zM6 6h14v16H6V6z" />
        </Svg>
    )
}