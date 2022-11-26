import { TouchableOpacity, Text, View } from 'react-native';
import { useColors } from '../../hooks/useColors';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { toggleTest } from '../../redux/voc/actions';
import { selectVocTest } from '../../redux/voc/selectors';

export default function Home() {
    const { text: { secondary }, background: { primary } } = useColors();
    const test = useAppSelector(selectVocTest);
    const dispatch = useAppDispatch();

    return(
        <View style={{backgroundColor: primary, ...styles.container}}>
            <Text>
                Hello test is: {test ? 'true' : 'false'}
            </Text>
            <TouchableOpacity 
                onPress={() => dispatch(toggleTest())}
            >
                <Text style={{ color: secondary }}>
                    Click to toggle test
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = {
    container: {
        flex: 1,
        alignItems: 'center' as 'center',
        justifyContent: 'center' as 'center'
    }
}